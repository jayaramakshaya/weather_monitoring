let alertThreshold = 35;  // Default temperature threshold
let cities = [];  // Will store user-inputted cities
let weatherData = {}; // Object to store temperature and conditions for daily rollups

const apiKey = '765204f33d3c7bf5b1fb4f863ff71165';  // Replace with your OpenWeatherMap API key

// Form submission event to get user input (cities and threshold)
document.getElementById('settingsForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent page reload on form submission

    // Get cities and threshold from user input
    cities = document.getElementById('cities').value.split(',').map(city => city.trim());
    alertThreshold = parseFloat(document.getElementById('threshold').value);

    // Initialize weather data object for each city
    cities.forEach(city => {
        weatherData[city] = {
            temps: [],
            conditions: [],
            maxTemp: null,
            minTemp: null,
            avgTemp: null,
            dominantCondition: null
        };
    });

    // Start fetching weather data for the user-inputted cities
    fetchWeather();
    setInterval(fetchWeather, 300000); // Fetch weather every 5 minutes
});

// Function to fetch and display weather data for each city
function fetchWeather() {
    cities.forEach(city => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`City ${city} not found`);
                }
                return response.json();
            })
            .then(data => {
                processWeatherData(city, data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                document.getElementById('city-data').innerHTML += `<p style="color:red;">Error: ${error.message}</p>`;
            });
    });
}

// Function to process weather data and calculate rollups
function processWeatherData(city, data) {
    const temp = data.main.temp;
    const condition = data.weather[0].main;

    // Update temperature and condition arrays
    weatherData[city].temps.push(temp);
    weatherData[city].conditions.push(condition);

    // Calculate max, min, and average temperatures
    weatherData[city].maxTemp = Math.max(...weatherData[city].temps);
    weatherData[city].minTemp = Math.min(...weatherData[city].temps);
    weatherData[city].avgTemp = (weatherData[city].temps.reduce((a, b) => a + b, 0) / weatherData[city].temps.length).toFixed(2);

    // Determine dominant condition
    const conditionFrequency = weatherData[city].conditions.reduce((count, cond) => {
        count[cond] = (count[cond] || 0) + 1;
        return count;
    }, {});
    weatherData[city].dominantCondition = Object.keys(conditionFrequency).reduce((a, b) => conditionFrequency[a] > conditionFrequency[b] ? a : b);

    // Display the weather data for the city
    displayWeather(city, data);

    // Check if the alert conditions are met
    checkAlertConditions(city, temp);
}

// Function to display the weather data on the webpage
function displayWeather(city, data) {
    const cityData = `
        <div class="city">
            <h3>City: ${city}</h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Feels Like: ${data.main.feels_like}°C</p>
            <p>Weather Condition: ${data.weather[0].main}</p>
            <p>Max Temp Today: ${weatherData[city].maxTemp}°C</p>
            <p>Min Temp Today: ${weatherData[city].minTemp}°C</p>
            <p>Avg Temp Today: ${weatherData[city].avgTemp}°C</p>
            <p>Dominant Condition Today: ${weatherData[city].dominantCondition}</p>
            <p>Last Update: ${new Date(data.dt * 1000).toLocaleTimeString()}</p>
        </div>
    `;
    
    // Update the city-data div with new weather data
    document.getElementById('city-data').innerHTML += cityData;
}

// Function to check alert conditions
function checkAlertConditions(city, temp) {
    if (temp > alertThreshold) {
        const alertMessage = `Alert: Temperature in ${city} exceeded ${alertThreshold}°C! Current Temp: ${temp}°C`;
        console.log(alertMessage);

        // Display the alert on the webpage
        const alertList = document.getElementById('alert-list');
        alertList.innerHTML += `<li>${alertMessage}</li>`;
    }
}
