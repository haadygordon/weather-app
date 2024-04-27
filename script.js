const apiKey = '7f8a68398c4cf7e4bf292b9794b06500'; // Replace with your OpenWeatherMap API key
const locationInput = document.getElementById('location-input');
const searchButton = document.getElementById('search-button');
const weatherInfo = document.getElementById('weather-info');

function getWeatherData(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(error => console.error(error));
}

function displayWeather(data) {
  if (data.cod === '404') {
    weatherInfo.innerHTML = 'Location not found.';
    return;
  }

  const city = data.name;
  const temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
  const weatherDescription = data.weather[0].description;
  const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  weatherInfo.innerHTML = `<h2>${city}</h2> <img src="${weatherIcon}" alt="${weatherDescription}"> <p>Temperature: ${temperature}°C</p> <p>Conditions: ${weatherDescription}</p>`;
}

searchButton.addEventListener('click', () => {
  const location = locationInput.value;
  if (location) {
    getWeatherData(location);
  }
});
