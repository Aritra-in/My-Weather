
const express = require('express');
const { request } = require('http');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
// const { json } = require('express');
const port = process.env.PORT || 3000;
require('dotenv').config();
const Datastore = require('nedb');

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.API_KEY,
    "X-RapidAPI-Host": process.env.API_HOST,
  },
};

const database = new Datastore('database.db');
database.loadDatabase();


app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('/geoAPI/:lat/:lon/:deviceINFO/:dayList/:date/:month/:year/:hour/:minutes', async (req, res) => {
  const lat = req.params.lat;
  const lon = req.params.lon;
  const deviceINFO = req.params.deviceINFO;
  const dayList=req.params.dayList;
  const date=req.params.date;
  const month=req.params.month;
  const year=req.params.year;
  const hour=req.params.hour;
  const minutes=req.params.minutes;


  database.insert({dayList, date, month, year, hour, minutes, deviceINFO, lat, lon});
  console.log(lat, lon, deviceINFO, dayList, date, month, year, hour, minutes);
  
  geoAPIUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
  
  //fetching...
  const geo_fetch = await fetch(geoAPIUrl);
  const data = await geo_fetch.json();
  
  console.log(data.latitude);
  
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
  // console.log(process.env.API_KEY);
});
