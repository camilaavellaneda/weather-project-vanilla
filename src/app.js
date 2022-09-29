let now = new Date();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let hour = `${now.getHours()}`.padStart(2, 0);
let minutes = `${now.getMinutes()}`.padStart(2, 0);
let weekday = weekdays[now.getDay()];

let time = `${hour}:${minutes} ${weekday}`;
document.getElementById("hourday").innerHTML = time;

let date = now.getDate();
let monthnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let month = `${monthnumbers[now.getMonth()]}`.padStart(2, 0);
let year = now.getFullYear();

let numberdate = `${date}/${month}/${year}`;
document.getElementById("numberdate").innerHTML = numberdate;

let apiKey = "97c2f6a3b34509ac62090edc5d18d949";

function handlePosition(position) {
  let geolocationLatitude = position.coords.latitude;
  let geolocationLongitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${geolocationLatitude}&lon=${geolocationLongitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function displayTemp(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#element-temperature");
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°`;
  celsiusTemperature = response.data.main.temp;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = response.data.sys.country;
  let descriptionElement = document.querySelector("#state");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/hr`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )} %`;
  let weatherIconElement = document.querySelector("#weather-icon");
  let weatherIconData = response.data.weather[0].icon;
  let weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconData}@2x.png`;
  weatherIconElement.innerHTML = `<img src="${weatherIconUrl}" />`;
}

function handlePositionForecast(position) {
  let geolocationLatitude = position.coords.latitude;
  let geolocationLongitude = position.coords.longitude;
  let apiUrl3 = `https://api.openweathermap.org/data/2.5/onecall?lat=${geolocationLatitude}&lon=${geolocationLongitude}&exclude=currently,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  axios.get(apiUrl3).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6)
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <div class="weather-forecast-date" id="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="40"
              id="forecast-weather-icon"
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max" id="weather-forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="weather-forecast-temperature-min" id="weather-forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}° </span>
            </div>
          </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  console.log(response.data);
}

navigator.geolocation.getCurrentPosition(handlePosition);

navigator.geolocation.getCurrentPosition(handlePositionForecast);

function handleSearchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let definedCity1 = document.querySelector("#city");
  definedCity1.innerHTML = `${searchInput.value}`;
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl2).then(displaySearchCity);
}

function displaySearchCity(response) {
  let temperatureElement = document.querySelector("#element-temperature");
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°`;
  celsiusTemperature = response.data.main.temp;
  let definedCity2 = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = response.data.sys.country;
  definedCity2.innerHTML = `${response.data.name}`;
  let descriptionElement = document.querySelector("#state");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/hr`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )} %`;
  let weatherIconElement = document.querySelector("#weather-icon");
  let weatherIconData = response.data.weather[0].icon;
  let weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconData}@2x.png`;
  weatherIconElement.innerHTML = `<img src="${weatherIconUrl}" />`;

  obtainForecast(response.data.coord);

}

let searchCityButton = document.querySelector("#button-addon2");
searchCityButton.addEventListener("click", handleSearchCity);

function obtainForecast(coordinates) {
  let apiUrl3 = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=currently,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  axios.get(apiUrl3).then(displayForecast)
}


function displayFarenheitTemperature(event) {
  event.preventDefault();
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let definedTemperature = document.querySelector("#element-temperature");
  definedTemperature.innerHTML = Math.round(farenheitTemperature);
}

let unitConversionButtonFarenheit =
  document.querySelector("#element-farenheit");
unitConversionButtonFarenheit.addEventListener(
  "click",
  displayFarenheitTemperature
);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let definedTemperature = document.querySelector("#element-temperature");
  definedTemperature.innerHTML = Math.round(celsiusTemperature);
}

let unitConversionButtonCelsius = document.querySelector("#element-celsius");
unitConversionButtonCelsius.addEventListener(
  "click",
  displayCelsiusTemperature
);

let celsiusTemperature = null;
