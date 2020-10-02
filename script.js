//date
function formatDate() {
  let now = new Date();
  let currentDate = document.querySelector("#currentDate");
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[now.getDay()];
  let months = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`,
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let year = now.getFullYear();
  let todayDate = `${day} ${date} ${month}, ${hours}:${minutes}, ${year}`;
  currentDate.innerHTML = todayDate;
}
formatDate();
//search city 2

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  //document.querySelector("#sun-set").innerHTML = response.data;
  //document.querySelector("#sun-rise").innerHTML = response.data;
  //document.querySelector("#temp-min").innerHTML = Math.round(response.data);
  //document.querySelector("#temp-max").innerHTML = Math.round(response.data.);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
}

function searchCity(city) {
  let apiKey = "8ee8eeb7848dce2b70fe9c7824e18f43";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "8ee8eeb7848dce2b70fe9c7824e18f43";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
//convert Temperature

//function convertToFahrenheit(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector("#temperature");
//temperatureElement.innerHTML = 77;
//}
//function convertToCelsius(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector("#temperature");
//temperatureElement.innerHTML = 25;
//}

//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", convertToFahrenheit);

//let celsiusLink = document.querySelector("#celsius-link");
//celsiusLink.addEventListener("click", convertToCelsius);

//search engine

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let description = document.querySelector("#temperature-description");
  temperatureElement.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather.description;
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("Rio de Janeiro");
