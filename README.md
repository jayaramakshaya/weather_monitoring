Weather Monitoring System
  Overview
    The Weather Monitoring System is a web application that allows users to monitor the weather conditions of multiple cities in real-time. Users can input city 
    names, set a temperature threshold, and receive alerts if the temperature exceeds the defined limit. The application fetches weather data from the 
    OpenWeatherMap API, processes the information, and displays it in an easy-to-read format.

  Features
    User Input: Users can enter one or more city names and set a temperature threshold.
    Weather Data Fetching: The application fetches weather data from the OpenWeatherMap API for the specified cities.
    Data Processing: The system calculates and displays daily rollups, including average, maximum, minimum temperatures, and the dominant weather condition.
    Alert System: Users receive alerts when the temperature in any city exceeds the defined threshold.
    Responsive Design: The application is designed to be user-friendly and visually appealing.

  Technologies Used
    HTML
    CSS
    JavaScript
    OpenWeatherMap API
    
  Usage
    Enter city names in the input field (comma-separated).
    Set the temperature threshold (°C).
    Click the Start Monitoring button to begin monitoring the weather.
    The application will fetch and display the current weather conditions for the entered cities.
    If the temperature exceeds the defined threshold, an alert will be displayed.
    
  Examples
    Input
    1. City Names:  
       Enter city names in the input field (comma-separated).  
       Example:  Delhi, Mumbai, New York
    
    2. Temperature Threshold:
    Set the temperature threshold in degrees Celsius.  
    Example:  30
    
    Output
    
    Upon clicking the Start Monitoring button, the application will display the current weather information for the specified cities:
    
    Output Example:
    
    City: Delhi Temperature: 32°C Feels Like: 34°C Weather Condition: Clear Max Temp Today: 35°C Min Temp Today: 28°C Avg Temp Today: 31.5°C Dominant Condition 
    Today: Clear Last Update: 10:30 AM
    
    If the temperature exceeds the defined threshold, an alert will be generated:
    
    Alert: Temperature in Delhi exceeded 30°C! Current Temp: 32°C
