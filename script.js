function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = document.querySelector("#name");
  city.innerHTML = `${searchInput.value}`;
}
let forme = document.querySelector("#city-name");
forme.addEventListener("submit", searchCity);

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  celciusTemperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = `${celciusTemperature}`;
  let descriptionElement = document.querySelector("#main-description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity-percentage");
  let windElement = document.querySelector("#wind");
  humidityElement.innerHTML = `${response.data.temperature.humidity} %`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed * 3.6)} Km/h`;
  let dateElement = document.querySelector("#time");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.icon);
}

function searchTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  let apiKey = "6d3703b72o71t1f333cdff4cea0c9774";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#city-name");
searchForm.addEventListener("submit", searchTemp);

let currentTemp = document.querySelector("#current");
currentTemp.addEventListener("click", showCurrentTemp);
function showCurrentTemp() {
  function showWeather(response) {
    let h1 = document.querySelector("#name");
    let temperature = Math.round(response.data.main.temp);
    h1.innerHTML = `Currently ${temperature}° in ${response.data.name}`;
  }

  function retrievePosition(position) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  }

  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = Math.round((celciusTemperature * 9) / 5 + 32);

  temperatureElement.innerHTML = fahrenheitTemperature;
}
function displayCelciusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celciusTemperature;
}
let celciusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);
