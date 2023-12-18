function getTemperature(response) {
  let temperature = document.querySelector("#weather-value");
  let roundedTemperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#weatherDescription");

  temperature.innerHTML = Math.round(roundedTemperature);
  cityElement.innerHTML = response.data.city;
  description.innerHTML = response.data.condition.description;
  console.log(response.data);
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
let submit = document.querySelector("#search-form");
submit.addEventListener("submit", search);
searchCity("Melbourne");
