
import './App.css';
import logo from '../src/logo.jpg';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [districts, setDistricts] = useState([]); // Stan przechowujący listę dzielnic

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    fetchDistricts(e.target.value); // Wywołaj funkcję pobierającą listę dzielnic po zmianie miasta
  };

  const fetchDistricts = (city) => {
    const response = axios.get('http://localhost:8000/addresses/Warszawa');
    console.log('http://localhost:8000/addresses/'+city);
    
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
                <select name="format" id="format">
                    <option selected disabled>Choose neighbourhood</option>
                    <option value="pdf">PDF</option>
                    <option value="txt">txt</option>
                    <option value="epub">ePub</option>
                    <option value="fb2">fb2</option>
                    <option value="mobi">mobi</option>
                </select>
              </div>
             
              <div class="user-box">
                <input type="text" id="square" required=""/>
                <label for="square">Square</label>
              </div>
              <div class="user-box">
                <input type="text" id="rooms" required=""/>
                <label for="rooms">Rooms</label>
              </div>
              <div class="user-box">
                <input type="text" id="floor" required=""/>
                <label for="floor">Floor</label>
              </div>
              <div class="user-box">
                <input type="text" id="year" required=""/>
                <label for="year">Year</label>
              </div>
              <a href="#">
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
