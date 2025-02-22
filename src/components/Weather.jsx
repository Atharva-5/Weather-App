import "./Weather.css";
import { useState } from "react"

const Weather = () => {

    const [city, setCity] = useState("");
    const [weather, SetWeather] = useState(null);

    const API_KEY = "Key"; //Enter your API key here.

    const fetchWeather = async () => {
        if (!city) return;

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

            if (!response.ok) {
                throw new Error("City not found");
            }

            const data = await response.json();
            SetWeather(data);
        } catch {
            SetWeather(null);
        }
    };

    const getBackground = () => {
        if (!weather) return "background-default";
        const condition = weather.weather[0].main.toLowerCase();

        if (condition.includes("clear")) return "background-clear";
        if (condition.includes("clouds")) return "background-clouds";
        if (condition.includes("rain")) return "background-rain";
        if (condition.includes("snow")) return "background-snow";
        return "background-default";
    }


    return (
        <div className={`weather-container ${getBackground()}`}>
            <div className="Weather-box">
                <i><h1>Weather App</h1></i>
                <div className="input-container">
                    <input type="text" placeholder="Enter city Name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button onClick={fetchWeather}>Search</button>
                </div>

                {weather && (
                    <div className="weather-info">
                        <h3>
                            Weather in {weather.name}
                        </h3>
                        <p>Condition: {weather.weather[0].description}</p>
                        <h3>Temperature: {weather.main.temp}°C</h3>
                        {/* Display Weather Icon */}
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt="Weather Icon"
                            className="weather-icon"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}


export default Weather;