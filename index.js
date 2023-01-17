
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

const database_with_geoLocation = new Datastore('databaseWithGeoLoc.db');
const database_with_IP=new Datastore('databaseWithIP.db');
database_with_geoLocation.loadDatabase();
database_with_IP.loadDatabase();


app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('/geoAPI/:lat/:lon/:deviceINFO/:dayList/:date/:month/:year/:hours/:minutes', async (req, res) => {
  const lat = req.params.lat;
  const lon = req.params.lon;
  const deviceINFO = req.params.deviceINFO;
  const dayList=req.params.dayList;
  const date=req.params.date;
  const month=req.params.month;
  const year=req.params.year;
  const hours=req.params.hours;
  const minutes=req.params.minutes;


  database_with_geoLocation.insert({lat, lon, date, month, year, dayList, hours, minutes, deviceINFO});
  console.log(lat, lon, deviceINFO, dayList, date, month, year, hours, minutes);
  
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

app.get('/clientIP/:userIP/:deviceINFO/:dayList/:date/:month/:year/:hours/:minutes', async(req, res)=>{
  const userIP=req.params.userIP;
  // console.log(userIP);
 
  const deviceINFO = req.params.deviceINFO;
  const dayList=req.params.dayList;
  const date=req.params.date;
  const month=req.params.month;
  const year=req.params.year;
  const hours=req.params.hours;
  const minutes=req.params.minutes;


  database_with_IP.insert({userIP, date, month, year, dayList, hours, minutes, deviceINFO});
  // console.log(userIP, deviceINFO, dayList, date, month, year, hours, minutes);
})



app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
  // console.log(process.env.API_KEY);
});
