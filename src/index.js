function getTemperature(response) {
  let temperature = document.querySelector("#weather-value");
  let roundedTemperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#weatherDescription");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let date = new Date(response.data.time * 1000);
  let dateElement = document.querySelector("#weekday-time");
  let icon = document.querySelector("#weather-icon");

  icon.innerHTML = ` <img src="${response.data.condition.icon_url}" class="weather-icon" />`;
  dateElement.innerHTML = formatDate(date);
  temperature.innerHTML = Math.round(roundedTemperature);
  cityElement.innerHTML = response.data.city;
  description.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  getForecast(response.data.city);
}
function formatDate(date) {
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
  let minutes = date.getMinutes();
  let hours = date.getHours();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "45b470b3047ca23td5c33ff33062ofb5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(getTemperature);
}

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  searchCity(input.value);
}
function getForecast(city) {
  let apiKey = "45b470b3047ca23td5c33ff33062ofb5";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
    <div class="weather-forecast-date">${formatForecastDay(day.time)} </div>
    <img class="weather-forecast-icon" src="${
      day.condition.icon_url
    }" alt="weather icon"  />
    <div class="weather-forecast-temperature">
      <span class="weather-forecast-temperature-max">
        <strong>${Math.round(day.temperature.maximum)}°</strong>
      </span>
      <span class="weather-forecast-temperature-min">${Math.round(
        day.temperature.minimum
      )}°</span>
    </div>
  </div>
`;
    }
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let submit = document.querySelector("#search-form");
submit.addEventListener("submit", search);

searchCity("Melbourne");
