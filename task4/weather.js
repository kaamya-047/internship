// OpenWeatherMap API Key
const apiKey = "5049c7edff837265029d8a624bbcd464";

// Function to fetch weather based on user input
function fetchWeather() {
    const location = document.getElementById("locationInput").value;
    if (!location) {
        alert("Please enter a location.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Could not fetch weather data. Please try again.");
        });
}

// Function to display weather data
function displayWeather(data) {
    if (data.cod !== 200) {
        alert("Location not found.");
        return;
    }

    const weatherDataDiv = document.getElementById("weatherData");
    const { name, main, weather, wind } = data;

    weatherDataDiv.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${main.temp} °C</p>
        <p>Condition: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
    `;
}

// Optional: fetch weather based on user's location
function fetchWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then(response => response.json())
                .then(data => displayWeather(data))
                .catch(error => {
                    console.error("Error fetching weather data:", error);
                    alert("Could not fetch weather data for your location.");
                });
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Automatically fetch weather based on user's location on page load
document.addEventListener("DOMContentLoaded", fetchWeatherByLocation);
