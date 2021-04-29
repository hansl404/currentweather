const apikey = config.API_KEY;

const icon = document.getElementById('icon');
const city = document.getElementById('cityname');
const cityposition = document.getElementById('cityposition');
const desc = document.getElementById('desc');
const temp = document.getElementById('temp');
const tempperception = document.getElementById('tempfeelslike');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const humidity = document.getElementById('humidity');
const windspeed = document.getElementById('windspeed');
const winddirection = document.getElementById('winddirection');
const cloudiness = document.getElementById('cloudiness');
const pressure = document.getElementById('pressure');
const datatime = document.getElementById('datatime');
const windarrow = document.getElementById('windarrow');

const displaycard = document.getElementById('front');
const bottomcard = document.getElementById('bottomcard');
const grid = document.getElementById('grid');

let tempnum = 0;
let tempfeelslike = 0;
let lat = 0;
let lon = 0;

const successLocation = position => {
    // console.log(position);
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    // Display coordinates
    const displayLat = Math.round((lat + Number.EPSILON)* 100) / 100;
    const displayLon = Math.round((lon + Number.EPSILON) * 100) / 100;
    cityposition.innerHTML = `Lat: ${displayLat}\u00B0, Lon: ${displayLon}\u00B0`;

    getWeather()
    .then(data => {
        console.log(data)
        
        // Weather Code
        // const code = data.weather[0].id;
        // console.log(code)

        // Icon
        const weathericon = data.weather[0].icon;
        
        const iconsrc = `http://openweathermap.org/img/wn/${weathericon}@2x.png`;
        icon.src = iconsrc;

        // City name
        city.innerHTML = data.name;

        // Description
        const status = data.weather[0].description;
        desc.innerHTML = status;

        // Temp
        tempnum = data.main.temp;
        tempfeelslike = data.main.feels_like;
        const displayTempCelsius = tempnum - 273.15;
        const displayTempFahrenheit = (displayTempCelsius * (9/5)) + 32;
        temp.innerHTML = parseInt(displayTempFahrenheit) + "\u00B0" + "F" + " / " + parseInt(displayTempCelsius) + "\u00B0" + "C";
        
        const displayTempPerceptionCelsius = tempfeelslike - 273.15;
        const displayTempPerceptionFahrenheit = (displayTempPerceptionCelsius * (9/5)) + 32;
        tempperception.innerHTML = "Feels like: " + parseInt(displayTempPerceptionFahrenheit) + "\u00B0" + "F" + " / " + parseInt(displayTempPerceptionCelsius) + "\u00B0" + "C";

        // Sunrise and sunset
        const sunrises = data.sys.sunrise;
        const sunsets = data.sys.sunset;

        const sunrisetime = new Date(sunrises * 1000);
        const sunsettime = new Date(sunsets * 1000);

        const sunrisehours = sunrisetime.getHours();
        let sunrisemin = sunrisetime.getMinutes();
        if (sunrisemin < 10) {sunrisemin = "0"+sunrisemin;}
        const sunsethours = sunsettime.getHours();
        let sunsetmin = sunsettime.getMinutes();
        if (sunsetmin < 10) {sunsetmin = "0"+sunsetmin;}

        sunrise.innerHTML = "Sunrise: " + sunrisehours + ":" + sunrisemin
        sunset.innerHTML = "Sunset: " + sunsethours + ":" + sunsetmin

        // Humidity
        const getHumidity = data.main.humidity;
        const displayHumidity = getHumidity;
        humidity.innerHTML = "Humidity: " + displayHumidity + "%";

        // Wind speed and direction
        const windSpeed = data.wind.speed;
        const windDirection = data.wind.deg;
        windspeed.innerHTML = windSpeed + " m/s";
        winddirection.innerHTML = windDirection + "\u00B0";
        windarrow.style.transform = 'rotate(' + (windDirection - 90) + 'deg)'
        windarrow.style.transform += 'scale(3, 3)'

        // Cloudy
        const cloudpercent = data.clouds.all;
        cloudiness.innerHTML = cloudpercent + "% cloudy";

        // Pressure
        const getPressure = data.main.pressure;
        pressure.innerHTML = "Pressure: " + getPressure + " hPa";

        // Time of data
        const dt = data.dt;
        let tod = new Date(dt * 1000);
        let hrtime = tod.getHours();
        let mintime = tod.getMinutes();
        if (hrtime < 10) {hrtime = "0"+hrtime;}
        if (mintime < 10) {mintime = "0"+mintime;}
        datatime.innerHTML = "as of: " + hrtime + ":" + mintime;
        datatime.addEventListener("click", () => location.reload())

        // Determine display color
        const currenttime = new Date();
        const currenthours = currenttime.getHours();
        const currentmin = currenttime.getMinutes();

        if ( (currenthours >= sunsethours && currentmin >= sunsetmin) || (currenthours <= sunrisehours && currentmin <= sunrisemin) ) {
            grid.classList.add("night"); 
        } else {
            // more conditions here
            if (cloudpercent >= 60) {
                grid.classList.add("cloudy");
            } else {
                grid.classList.add("sunny");
            } 
        }
    })
    .catch(err => console.log('error'))
    
    // console.log("latitude: " + lat);
    // console.log("longitude: " + lon);
}

const errorLocation = error => {
    console.error(error);
}

const watchID = navigator.geolocation.getCurrentPosition(successLocation, errorLocation);

const getWeather = async () => {
    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + "" + apikey);
    const data = await response.json();
    return data;
}