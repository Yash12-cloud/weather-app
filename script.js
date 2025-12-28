async function fetchWeather() {
    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value;
    
    // UI Elements
    const weatherContent = document.getElementById("weatherContent");
    const errorMessage = document.getElementById("errorMessage");

    // Clear previous error
    errorMessage.style.display = "none";

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    try {
        const response = await fetch(`https://weather-app-6xqp.onrender.com/weather?city=${city}`);


        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        
        document.getElementById("cityName").textContent = data.city;
        document.getElementById("temp").textContent = Math.round(data.temp) + "°c";
        document.getElementById("humidity").textContent = data.humidity + "%";
        document.getElementById("description").textContent = data.weather;
        
        weatherContent.style.display = "block";
        errorMessage.style.display = "none";

    } catch (error) {
        console.error("Error:", error);
        weatherContent.style.display = "none";
        errorMessage.style.display = "block";
    }
}

// Allow pressing "Enter" key to search
document.getElementById("cityInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        fetchWeather();
    }
});