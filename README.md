# CurrentWeather

Gets the current weather at current location. Information displayed includes coordinates, location name, humidity, air pressure, sunrise and sunset time, percent cloudiness, wind speed, and wind direction. 

## How to use
To use, allow locations access. To refresh the page, either refresh from browser or click on the very bottom text that reads: "as of: TIME" (the text will be colored blue when hovered over).

This is currently a frontend application. For now, line 1 on weather.js (const apikey = config.API_KEY) will need config.API_KEY to be replaced with an API key obtained from [OpenWeatherMap](https://openweathermap.org/api). I am currently working on putting the API key on the server side as I learn more about the backend.