import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [weather, setWeather] = useState(false);
  const [location, setLocation] = useState(false);
  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }
  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position)=> {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])
  if (location === false) {
    return (
      <Fragment>
        Você precisa habilitar a localização no browser
      </Fragment>
    )
  } else if (weather === false) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Carregando o clima...
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
          </a>
        </header>
      </div>
    )
  } else {
    return (
      <Fragment>  
      <div class="widget">
        <h3>Clima ({weather['weather'][0]['description']})</h3>
        <hr/>   
        <div class="left-panel panel">
          <ul>
            <li>Temperatura atual: {weather['main']['temp']}°</li>
            <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
            <li>Temperatura minima: {weather['main']['temp_min']}°</li>
            <li>Pressão: {weather['main']['pressure']} hpa</li>
            <li>Umidade: {weather['main']['humidity']}%</li> 
          </ul>
        </div> 
        <div class="Circle1"></div>
        <div class="Circle2"></div>
        <div class="Circle3"></div>  
      </div>
      
      </Fragment>
    );
  }
}

export default App;
