let searchinput = document.getElementById("searchinput");
let myBtn = document.getElementById("mybtn");
let WeatherData = [];
getWeatherData();
async function getWeatherData(location = "Cairo") {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=5b73ee2763224def88975848250601&q=${location}&days=3`
    );

    if (response.ok) {
      WeatherData = await response.json();
      displayData();
    } else {
      console.error("Failed to fetch weather data.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

searchinput.addEventListener("input", function () {
  getWeatherData(searchinput.value);
});

function displayData() {
  let cartona = `
    <div class="day-card">
      <h3>${WeatherData.location.name}</h3>
      <p>${WeatherData.location.localtime}</p>
      <h2>${WeatherData.current.temp_c}°C</h2>
      <i class="fa-solid fa-cloud fs-1"></i>
      <p class="text-primary">${WeatherData.current.condition.text}</p>
      <div class="details">
        <p class="h5"><i class="fa-solid fa-umbrella"></i>  ${WeatherData.current.humidity}%</p>
        <p class="h5"><i class="fa-solid fa-wind"></i> ${WeatherData.current.wind_kph} km/h</p>
        <p class="h5"><i class="fa-regular fa-compass"></i>  ${WeatherData.current.wind_dir}</p>
      </div>
    </div>

    <!-- Forecast for the next days -->
    <div class="day-card">
      <h3>${WeatherData.forecast.forecastday[1].date}</h3>
      <h2>${WeatherData.forecast.forecastday[1].day.avgtemp_c}°C</h2>
      <p class="h5 text-primary"> ${WeatherData.forecast.forecastday[1].day.condition.text}</p>
      <i class="fa-solid fa-cloud-sun fs-1"></i>
    </div>

    <div class="day-card">
      <h3>${WeatherData.forecast.forecastday[2].date}</h3>
      <h2>${WeatherData.forecast.forecastday[2].day.avgtemp_c}°C</h2>
      <p class="h5 text-primary"> ${WeatherData.forecast.forecastday[2].day.condition.text}</p>
      <i class="fa-regular fa-sun fs-1"></i>
    </div>
  `;

  document.getElementById("rowdata").innerHTML = cartona;
}
