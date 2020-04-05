import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState('')
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
      })
  }, [capital, api_key])

  if (weather) {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p>temperature: {weather.main.temp} Celcius</p>
        <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="weather_icon" height="100" />
        <p>wind: {weather.wind.speed}</p>
      </div>
    )
  }
  return (
    <div>
      <p>Weather info retrieval failed</p>
    </div>
  )
}

export default Weather