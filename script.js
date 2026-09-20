const apiKey = "ccb27c2b507772d048f7742cf46be517"; // <--- Paste your API Key here

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");
const errorMessage = document.getElementById("error-message");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeather(city);
    }
});

// Also trigger search when pressing 'Enter' key
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Update the UI with data from the API
        document.getElementById("city-name").innerText = data.name;
        document.getElementById("temp").innerText = `${Math.round(data.main.temp)}°C`;
        document.getElementById("description").innerText = data.weather[0].description;
        document.getElementById("humidity").innerText = data.main.humidity;
        document.getElementById("wind").innerText = data.wind.speed;

        // Show weather info, hide errors
        weatherInfo.style.display = "block";
        errorMessage.innerText = "";
    } catch (error) {
        weatherInfo.style.display = "none";
        errorMessage.innerText = "City not found. Please try again.";
    }
}