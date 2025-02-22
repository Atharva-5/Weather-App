import { useState, useEffect } from "react";
import "./Weather.css";

const Weather = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [searchTime, setSearchTime] = useState("");
    const [background, setBackground] = useState("background-default");

    const API_KEY = "Key"; // Replace with your valid API key

    const fetchWeather = async () => {
        if (!city) return;

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );

            if (!response.ok) {
                throw new Error("City not found");
            }

            const data = await response.json();
            setWeather(data);

            // Capture search time
            const now = new Date();
            setSearchTime(now.toLocaleTimeString());
        } catch {
            setWeather(null);
            setSearchTime("");
        }
    };

    // Function to get background class
    const getBackground = () => {
        if (!weather || !weather.weather || weather.weather.length === 0) {
            return "background-default";
        }

        const condition = weather.weather[0].main.toLowerCase();

        if (condition.includes("clear")) return "background-clear";
        if (condition.includes("clouds")) return "background-clouds";
        if (condition.includes("rain")) return "background-rain";
        if (condition.includes("snow")) return "background-snow";
        return "background-default";
    };

    // Update background when weather changes
    useEffect(() => {
        const newBackground = getBackground();

        // Add a small delay to apply transition smoothly
        setTimeout(() => {
            setBackground(newBackground);
        }, 100);
    }, [weather]);

    return (
        <div className={`weather-container ${background}`}>
            <div className="Weather-box">
                <h1>Weather App</h1>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button onClick={fetchWeather}>Search</button>
                </div>

                {weather && (
                    <div className="weather-info">
                        <h3>Weather in {weather.name}</h3>
                        <p>Condition: {weather.weather[0].description}</p>
                        <h3>Temperature: {weather.main.temp}°C</h3>
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt="Weather Icon"
                            className="weather-icon"
                        />
                        {searchTime && <p>Last Searched at: {searchTime}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;
