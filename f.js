async function getForecast() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "060f988e690e3dcde2e98d8962e9da80";
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerText = "Please enter a city name.";
    return;
  }

  resultDiv.innerHTML = "Loading...";

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== "200") {
      resultDiv.innerText = "City not found or API error.";
      return;
    }

    const cityName = data.city.name;
    let html = `<h2 class="font-bold text-xl mb-2">${cityName} - 5 Day Forecast</h2>`;

    for (let i = 0; i < 5; i++) {
      const item = data.list[i];
      const date = new Date(item.dt * 1000).toLocaleString();
      const temp = item.main.temp;
      const desc = item.weather[0].description;

      html += `
        <div class="mb-3 border-b border-gray-200 pb-2">
          <p><strong>${date}</strong></p>
          <p>🌡️ Temp: ${temp}°C</p>
          <p>☁️ Weather: ${desc}</p>
        </div>
      `;
    }

    resultDiv.innerHTML = html;

  } catch (error) {
    console.log("Fetch error:", error);
    resultDiv.innerText = "Error fetching data.";
  }
}
