import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [data, setData] = useState({
      name: '',
      degree: 0,
      humidity: 0,
      weather: '',
      feels_like: '',
      wind: 0
    })
    const [location, setLocation] = useState("Bishkek");

    const url = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=19461cd6769ae4ada7c8536c23fa728a`;

    useEffect(() => {
      axios.get(url).then((response) => {
        setData({
          name: response.data.name,
          degree: response.data.main.temp.toFixed(),
          humidity: response.data.main.humidity.toFixed(),
          weather: response.data.weather[0].description,
          feels_like: response.data.main.feels_like,
          wind: response.data.wind.speed.toFixed()
        });
        console.log(response.data);
      });
    }, [url])

    useEffect(() => {
      console.log(data);
    }, [data])

    const seacrhLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
              setData({
                name: response.data.name,
                degree: response.data.main.temp.toFixed(),
                humidity: response.data.main.humidity.toFixed(),
                weather: response.data.weather[0].description,
                feels_like: response.data.main.feels_like,
                wind: response.data.wind.speed.toFixed()
              });

            });
            setLocation("")
          console.log(data);
        }
    };



    return (
      <div className="app">
        <div className="search">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={seacrhLocation}
            placeholder="Введите название..."
            type="text"
          />
        </div>
          <div className="container">
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                <h1>{data.degree}</h1>
              </div>
              <div className="description">
                <p>{data.weather}</p>
              </div>
            </div>
            <div className="bottom">
                <div className="feels ">
                  <p className="bold">{`${data.feels_like}C`}</p>
                  <p>Чувствуется как</p>
                </div>
                <div className="humidity">
                  <p className="bold">{`${data.humidity}%`}</p>
                  <p>Влажность</p>
                </div>
                <div className="wind">
                  <p className="bold">{`${data.wind}м/с`}</p>
                  <p>Скорость ветра</p>
                </div>
              </div>
          </div>
      </div>
    );
}

export default App

