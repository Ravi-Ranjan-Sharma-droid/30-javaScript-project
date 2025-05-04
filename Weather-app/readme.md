# Weather App

This is a simple, responsive web application that allows users to check real-time weather data for any city. By entering a city name, users can view the current temperature, humidity, wind speed, and an icon representing the weather conditions. The app utilizes the OpenWeatherMap API to fetch weather data and display it in a user-friendly interface.

## Features
- **City Search**: Users can search for the weather of any city.
- **Weather Information**: Displays temperature, humidity, and wind speed in metric units (°C, % humidity, km/h).
- **Weather Icons**: Dynamic icons representing the weather conditions (Clear, Clouds, Rain, Drizzle, Mist).
- **Error Handling**: Gracefully handles invalid city names and network errors.

## API Key
This app uses the OpenWeatherMap API to fetch weather data. The current API key is for demonstration purposes only. To use the app with your own key, sign up at [OpenWeatherMap](https://openweathermap.org/api) and replace the API key in `script.js`.

## 🖼 Preview 

<div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center; align-items: center;">
  <img src="look/blank.png" style="width: 220px;" />
  <img src="look/working.png" style="width: 220px;" />
  <img src="look/incorrect.png" style="width: 250px;" />
  <img src="look/network-err.png" style="width: 250px;" />
</div>

---
## License
This project is open source and available under the MIT License.
