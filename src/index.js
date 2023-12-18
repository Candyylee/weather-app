function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  city.innerHTML = input.value;
}
let submit = document.querySelector("#search-form");
submit.addEventListener("submit", searchCity);
