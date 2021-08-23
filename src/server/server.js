// Express to run server and routes
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

// Start up an instance of app
const app = express();

/* Dependencies */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('dist'))
// app.use(express.static('website'));
module.exports = app

let allApiData = {}

app.get("/", function (req, res) {
    res.sendFile("dist/index.html")
})

app.get('/test', function (req, res) {
    res.json({message: 'pass!'})
})
  
app.post('/geonamesData', (req, res) => {
    console.log('GET geonamesData')
    const username = process.env.GEO_API_KEY;
    const city = req.body.cityName;
    const daysUntilTrip = req.body.daysUntilTrip;
    allApiData['daysUntilTrip'] = daysUntilTrip;
    const geoNamesUrl = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`;
    console.log(geoNamesUrl);
    fetch(geoNamesUrl)
        .then(res => res.json())
        .then(response => {
            try {
                console.log(response.geonames[0]);
                allApiData['city'] = city;
                allApiData['lng'] = response.geonames[0].lng;
                allApiData['lat'] = response.geonames[0].lat;
                allApiData['code'] = response.geonames[0].countryCode;
                allApiData['name'] = response.geonames[0].name;
                allApiData['countryName'] = response.geonames[0].countryName;
                res.send(true);
            } catch (error) {
                console.log("Error: ", error);
            }
        })
        .catch(error => {
            res.send(JSON.stringify({ error: error }));
        })
})

app.get('/countryInfo', (req, res) => {
    const countryCode = allApiData.code;
    const url = `https://restcountries.eu/rest/v2/alpha/${countryCode}`;
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            allApiData['capital'] = response.capital;
            allApiData['currency'] = response.currencies[0].name;
            allApiData['language'] = response.languages[0].name;
            allApiData['flag'] = response.flag
            res.send(true);
        })
        .catch(error => {
            res.send(JSON.stringify({ error: "An error has occured" }));
        })
})


app.get('/image', (req, res) => {
    const cityName = allApiData.name;
    const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${cityName}`
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(response => {
            const imageUrl = response.hits[0].webformatURL;
            allApiData['imageUrl'] = imageUrl;
            res.send(true);
        })
        .catch(error => {
            res.send(JSON.stringify({ error: "An error has occured" }));
        })
})


app.get('/weatherbitData', (req, res) => {
    let weatherbitUrl;
    const daysUntilTrip = allApiData.daysUntilTrip;
    const lat = allApiData.lat;
    const lng = allApiData.lng;

    if (daysUntilTrip < 7) {
        weatherbitUrl = `https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lng}&key=${process.env.WEATHER_BIT_API_KEY}`;
    } else {
        weatherbitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lng}&key=${process.env.WEATHER_BIT_API_KEY}`;
    }

    fetch(weatherbitUrl)
        .then(response => response.json())
        .then(response => {
            console.log(response.data[0]);
            allApiData['temp'] = response.data[0].temp;
            allApiData['maxTemp'] = response.data[0].max_temp;
            allApiData['mintemp'] = response.data[0].min_temp;
            allApiData['humidity'] = response.data[0].rh;
            allApiData['description'] = response.data[0].weather.description;
            allApiData['icon'] = response.data[0].weather.icon;
            res.send(true);
        })
        .catch(error => {
            res.send(JSON.stringify({ error}));
        })
})

app.get('/allApiData', (req, res) => {
    console.log(allApiData);
    res.send(allApiData);
})
