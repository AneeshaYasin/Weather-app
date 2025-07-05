
        async function getWeather() {
            const city = document.getElementById("cityInput").value;
            const apiKey = "060f988e690e3dcde2e98d8962e9da80";
            const url = https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric;

            const resultDiv = document.getElementById("weatherResult"); 
            resultDiv.innerHTML = "Loading...";

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.cod === "404") {
                    resultDiv.innerText = "City not found!";
                } else {
                    const temperature = data.main.temp;
                    const description = data.weather[0].description;
                    const cityName = data.name;

                    resultDiv.innerHTML = `
                    <h2 class="font-bold text-xl">${cityName}</h2>
                    <p>🌡 Temperature: ${temperature}°C</p>
                    <p>☁ Weather: ${description}</p>
                `;
                }
            } catch (error) {
                resultDiv.innerText = "Error fetching data.";
                console.log("Fetch error:", error);
            }
        }








