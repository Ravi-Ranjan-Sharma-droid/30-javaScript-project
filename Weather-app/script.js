const apiKey = "66a59b78e7600456b6c73e2cccf0945c";
const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
     try {
       const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
       var data = await response.json();
       console.log(data);

       // ✅ Handle invalid city name (e.g., 404 error)
       if (data.cod === "404") {
         document.querySelector(".city").innerHTML = "City not found";
         document.querySelector(".temp").innerHTML = "-- °C";
         document.querySelector(".humidity").innerHTML = "-- %";
         document.querySelector(".wind").innerHTML = "-- Km/h";
         return;
       }

       document.querySelector(".city").innerHTML = data.name;
       document.querySelector(".temp").innerHTML =
         Math.round(data.main.temp) + "°C";
       document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
       document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

       if (data.weather[0].main == "Clouds") {
         weatherIcon.src = "images/clouds.png";
       } else if (data.weather[0].main == "Clear") {
         weatherIcon.src = "images/clear.png";
       } else if (data.weather[0].main == "Rain") {
         weatherIcon.src = "images/rain.png";
       } else if (data.weather[0].main == "Drizzle") {
         weatherIcon.src = "images/drizzle.png";
       } else if (data.weather[0].main == "Mist") {
         weatherIcon.src = "images/mist.png";
       } else {
         weatherIcon.src = "images/clear.png";
       }
     } catch (error) {
       console.error("Fetch error:", error);
       document.querySelector(".city").innerHTML = "Network error";
       document.querySelector(".temp").innerHTML = "-- °C";
       document.querySelector(".humidity").innerHTML = "-- %";
       document.querySelector(".wind").innerHTML = "-- Km/h";
     }
 }

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value.trim());
    }
});
