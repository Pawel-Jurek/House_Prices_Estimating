
import './App.css';
import logo from '../src/logo.jpg';
import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCity, setSelectedCity] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedModel, setSelectedModel] = useState(''); 

  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [square, setSquare] = useState('');
  const [rooms, setRooms] = useState('');
  const [floor, setFloor] = useState('');
  const [year, setYear] = useState('');

  const [price, setPrice] = useState('');

  
  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const handleCityChange = (e) => {
     
    setSelectedCity(e.target.value);
    setCity(e.target.value);
    fetchDistricts(e.target.value);
  };

  const fetchDistricts = (city) => {
  
    axios.get('http://localhost:8000/valuation/addresses/'+city+'/')
      .then(response => {      
        setDistricts(response.data.addresses);   
      
      })
      .catch(error => {
        console.error('Error fetching districts:', error);
      });

  };

  const predictPrice = () => {

    axios({
      method: 'post',
      url: 'http://localhost:8000/valuation/',
      data: {
        city: city,
        district: district,
        sq: square,
        rooms: rooms,
        floor: floor,
        year: year,
        model: selectedModel
      }
    })
      .then(response => {
        setPrice(parseInt(response.data.price).toLocaleString('pl-PL'));      
        setShowPopup(true);
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          
        }, 3000); 
      })
      .catch(error => {
        console.error('Error predicting price:', error);
      });

  };

  return (
    <div className="App">
      <div className='left'><br/><br/>
        <h1>House Prices Estimating</h1>
        <p>Estimate the price of a place based on its characteristics</p>
        
        <div class="login-box">
            <div class="radio-inputs">
              <label className="radio">
                <input type="radio" name="radio" value="tf" onChange={handleModelChange} />
                <span className="name">Tensorflow</span>
              </label>
              <label className="radio">
                <input type="radio" name="radio" value="lr" onChange={handleModelChange} />
                <span className="name">Linear Regression</span>
              </label>
            </div>
        
            <form>
              <div className="radio-inputs">
                <label className="radio">
                  <input type="radio" name="radio" value="Kraków" onChange={handleCityChange} />
                  <span className="name">Cracow</span>
                </label>
                <label className="radio">
                  <input type="radio" name="radio" value="Warszawa" onChange={handleCityChange} />
                  <span className="name">Warsaw</span>
                </label>
                <label className="radio">
                  <input type="radio" name="radio" value="Poznań" onChange={handleCityChange} />
                  <span className="name">Poznan</span>
                </label>
              </div>
              <div class="select">
                <select name="format" id="format" onChange={(e) => setDistrict(e.target.value)}>
                    <option selected disabled>Choose neighbourhood</option>
                    {districts.map((district, index) => (
                      <option key={index}  value={district}>{district}</option>
                    ))}
                </select>
              </div>
             
              <div className="user-box">
                <input type="number" id="square" required="" onChange={(e) => setSquare(e.target.value)} />
                <label htmlFor="square">Square</label>
              </div>
              <div className="user-box">
                <input type="number" id="rooms" required="" onChange={(e) => setRooms(e.target.value)} />
                <label htmlFor="rooms">Rooms</label>
              </div>
              <div className="user-box">
                <input type="number" id="floor" required="" onChange={(e) => setFloor(e.target.value)} />
                <label htmlFor="floor">Floor</label>
              </div>
              <div className="user-box">
                <input type="number" id="year" required="" onChange={(e) => setYear(e.target.value)} />
                <label htmlFor="year">Year</label>
              </div>
              <a onClick={predictPrice}>
                Predict price
              </a>
            </form>
         </div>
      </div>
      <div className='right'>
        {showPopup && (
          <>
            <div className="overlay" onClick={() => setShowPopup(false)}></div>
              <div className="popUp">
                {isLoading ? (
                  <>
                    <h1> We are calculating ... </h1>
                    <div className="loading">Loading&#8230;</div> 
                  </>
                ) : (
                  <>
                    <p>Price for a <b>{rooms} </b> room <b>{square} m&#178;</b> apartment located in <b>{city}</b> <b>{district}</b> on the <b>{floor}</b> floor build in <b>{year}</b></p>
                    <h1> {price} zł</h1>
                  </>
                )}

              </div>
          </>
        )}
        <img src={logo}/>
        <a onClick={predictPrice}>
          Predict price
        </a>
      </div>
    </div>
  );
}

export default App;
