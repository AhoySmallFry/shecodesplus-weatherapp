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

let mainTemp = null;

//

function showWeather(response) {
  let h1 = document.querySelector("h1");
  mainTemp = response.data.main.temp;
  let temperature = Math.round(mainTemp);
  h1.innerHTML = `${response.data.name}`;

  let h3 = document.querySelector(".mainTempValue");
  h3.innerHTML = `${temperature}°C`;

  let descriptionElement = document.querySelector(".weather-description");
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;

  let windElement = document.querySelector("#windSpeed");
  let windDirection = document.querySelector("windDirection");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} kmh | ${
    response.data.wind.deg
  }°`;

  let humidityElement = document.querySelector("#precipitation");
  humidityElement.innerHTML = `${response.data.main.humidity}%`;

  let sunsetElement = document.querySelector("#sunsetTime");
  let unix_timestamp = response.data.sys.sunset;
  let date = new Date(unix_timestamp * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let formattedTime = hours + ":" + minutes.substr(-2);
  sunsetElement.innerHTML = `${formattedTime}`;

  let highLowElement = document.querySelector("#high-low");
  highLowElement.innerHTML = `${Math.round(
    response.data.main.temp_max
  )}° / ${Math.round(response.data.main.temp_min)}°`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row justify-content-md-center">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
     <div class="col-2">
       <div class="card">
         <div class="card-body">
          <p class="card-text"></p>
          <h6>${day}</h6>
          <img src="assets/icons/002-rain.svg" class="fiveDay" />
          18°c
        </div>
      </div>
    </div>

`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// degrees

function convertCelsius(event) {
  event.preventDefault();
  let tempCelsius = document.querySelector(".mainTempValue");
  tempCelsius.innerHTML = `${Math.round(mainTemp)}°C`;
}

let celsiusUnits = document.querySelector("#celsius");
celsiusUnits.addEventListener("click", convertCelsius);

function convertFarenheit(event) {
  event.preventDefault();
  let mainTempValue = document.querySelector(".mainTempValue");
  let tempFarenheit = (mainTemp * 9) / 5 + 32;
  mainTempValue.innerHTML = `${Math.round(tempFarenheit)}°F`;
}

let farenheitUnits = document.querySelector("#farenheit");
farenheitUnits.addEventListener("click", convertFarenheit);

function retrievePosition(position) {
  let apiKey = "7cd341f73bed1fbf392c5c5cd61542e9";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

displayForecast();

function displayCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocButton = document.querySelector(".btn-location");
currentLocButton.addEventListener("click", displayCurrentLocation);
