// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config()
// }

// const apikey = process.env.API_KEY
// const express = require('express')
// const app = express()

// app.use(express.json())
// app.use(express.static('public'))

// app.post('/weather', (req,res) => {
//     const errorLocation = error => {
//         console.error(error);
//     }



    
//     const watchID = navigator.geolocation.getCurrentPosition(successLocation, errorLocation);

//     const getWeather = async () => {
//         const response = await fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + "" + apikey);
//         const data = await response.json();
//         return data;
//     }

// })

// app.listen(3000, () => {
//     console.log('Server started')
// })