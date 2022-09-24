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
navigator.geolocation.getCurrentPosition(handlePosition);

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
}

let searchCityButton = document.querySelector("#button-addon2");
searchCityButton.addEventListener("click", handleSearchCity);

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
