
import './App.css';
import logo from '../src/logo.jpg';
import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [selectedCity, setSelectedCity] = useState('');
  const [districts, setDistricts] = useState([]); // Stan przechowujący listę dzielnic

  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [square, setSquare] = useState('');
  const [rooms, setRooms] = useState('');
  const [floor, setFloor] = useState('');
  const [year, setYear] = useState('');

  const handleCityChange = (e) => {
    
    setSelectedCity(e.target.value);
    setCity(e.target.value);
    fetchDistricts(e.target.value); // Wywołaj funkcję pobierającą listę dzielnic po zmianie miasta
  };

  const fetchDistricts = (city) => {
  
    axios.get('http://localhost:8000/addresses/'+city+'/')
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
        address: 'xD',
        sq: square,
        rooms: rooms,
        floor: floor,
        year: year
      }
    })
      .then(response => {      
        alert('Predicted price: ' + response.data.price);
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
        <img src={logo}/>
      </div>
    </div>
  );
}

export default App;
