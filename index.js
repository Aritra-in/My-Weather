
const express = require('express');
const { request } = require('http');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
// const { json } = require('express');
const port = 3000;
require('dotenv').config();


const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.API_KEY,
    "X-RapidAPI-Host": process.env.API_HOST,
  },
};

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('/geoAPI/:lat:lon', async (req, res) => {
  const lat = req.params.lat;
  const lon = req.params.lon;
  geoAPIUrl = process.env.GEO_API_URL;

  //fetching...
  const geo_fetch = await fetch(geoAPIUrl);
  const data = await geo_fetch.json();
  res.json(data);
})

app.get('/weather/:location', async (req, res) => {
  const loc = req.params.location;
  const api_url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${loc}&days=3`;
  try {
    //fetching...
    const api_fetch = await fetch(api_url, options);
    const data = await api_fetch.json();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});




app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
  console.log(process.env.API_KEY);
});
