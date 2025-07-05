const apiKey = "060f988e690e3dcde2e98d8962e9da80";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  // Fetch current weather
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if (data.cod === "404") {
        document.getElementById("weatherResult").innerHTML = `<p class="text-red-600">City not found!</p>`;
        document.getElementById("forecastResult").innerHTML = "";
        return;
      }

      const weatherHTML = `
        <div class="bg-white shadow-md p-6 rounded-md max-w-md mx-auto">
          <h2 class="text-xl font-bold mb-2">${data.name}</h2>
          <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
          <p><strong>Condition:</strong> ${data.weather[0].description}</p>
          <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        </div>
      `;
      document.getElementById("weatherResult").innerHTML = weatherHTML;
    });

  // Fetch 5-day forecast
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== "200") {
        document.getElementById("forecastResult").innerHTML = `<p class="text-red-600">Forecast not available.</p>`;
        return;
      }

      const forecastList = data.list.filter(item => item.dt_txt.includes("12:00:00"));
      let forecastHTML = "";
      forecastList.forEach(item => {
        const date = new Date(item.dt_txt);
        forecastHTML += `
          <div class="bg-white p-4 rounded-md shadow-md w-48 text-center">
            <h3 class="font-semibold">${date.toDateString()}</h3>
            <p><strong>${item.main.temp}°C</strong></p>
            <p>${item.weather[0].description}</p>
          </div>
        `;
      });

      document.getElementById("forecastResult").innerHTML = forecastHTML;
    });
}
