const apiKey = "2925033b90711e959ca6beefc7463c81";
const cityInput = document.getElementById("city");
const weatherInfo = document.getElementById("weatherInfo");
const getWeatherBtn = document.getElementById("getWeather");

getWeatherBtn.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value.trim();

  if (city === "") {
    weatherInfo.innerHTML = "<p>⚠️ Please enter a city name.</p>";
    return;
  }

  weatherInfo.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("⚠️ Please enter a valid city name.");
      } else {
        throw new Error("❌ Unable to fetch data. Please try again.");
      }
    }

    const data = await response.json();

    weatherInfo.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${
        data.weather[0].icon
      }@2x.png" alt="Weather Icon">
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>${data.weather[0].description.toUpperCase()}</p>
      <p>🌡️ Temperature: ${data.main.temp}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    weatherInfo.innerHTML = `<p>❌ ${error.message}</p>`;
  }
}
