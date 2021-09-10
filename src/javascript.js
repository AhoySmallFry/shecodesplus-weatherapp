//time

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentTime = document.querySelector(".time");
currentTime.innerHTML = `${day} ${hour}:${minutes}`;

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];
let date = now.getDate();
let currentDate = document.querySelector(".date");
currentDate.innerHTML = `${date}th ${month}`;

//

// degrees

function convertCelsius(event) {
  event.preventDefault();
  let tempCelsius = document.querySelector(".degrees");
  tempCelsius.innerHTML = "20°C";
}

let celsiusUnits = document.querySelector("#celsius");
celsiusUnits.addEventListener("click", convertCelsius);

function convertFarenheit(event) {
  event.preventDefault();
  let tempFarenheit = document.querySelector(".degrees");
  tempFarenheit.innerHTML = "68.2°F";
}

let farenheitUnits = document.querySelector("#farenheit");
farenheitUnits.addEventListener("click", convertFarenheit);

// search box
function getWeather(event) {
  event.preventDefault();
  let inputCity = document.querySelector(".search-city");
  let apiKey2 = "7cd341f73bed1fbf392c5c5cd61542e9";
  let url2 = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=metric&appid=${apiKey2}`;
  axios.get(url2).then(showWeather);
}

let btnWeather = document.querySelector(".btn-weather");
btnWeather.addEventListener("click", getWeather);

//

function showWeather(response) {
  let h1 = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `${response.data.name}`;

  let h3 = document.querySelector(".degrees");
  h3.innerHTML = `${temperature}°C`;

  let descriptionElement = document.querySelector(".weather-description");
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;

  let windElement = document.querySelector("#windSpeed");
  let windDirection = document.querySelector("windDirection");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} kmh | ${
    response.data.wind.deg
  }°`;
}

function retrievePosition(position) {
  let apiKey = "7cd341f73bed1fbf392c5c5cd61542e9";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function displayCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocButton = document.querySelector(".btn-location");
currentLocButton.addEventListener("click", displayCurrentLocation);
