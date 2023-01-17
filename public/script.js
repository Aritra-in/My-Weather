//client IP Address fetch function call
clientIP();

//live Location function call
liveLoc();



//date & time
var dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var dt = new Date();
var year = dt.getFullYear();
var month = dt.getMonth() + 1;
var date = dt.getDate();
var day = dt.getDay();
var hours = dt.getHours().toString().padStart(2, 0);
var minutes = dt.getMinutes().toString().padStart(2, 0);
//console.log(`${location} ${dayList[day]} ${date}/${month}/${year} ${hours}:${minutes}`);

//button selection
const btn = document.getElementById("search");
btn.addEventListener("click", weather);


//subMenu
const kolkata = document.getElementById("kolkata");
kolkata.addEventListener('click', () => { subMenuItem(kolkata) });
const mumbai = document.getElementById("mumbai");
mumbai.addEventListener('click', () => { subMenuItem(mumbai) });
const delhi = document.getElementById("delhi");
delhi.addEventListener('click', () => { subMenuItem(delhi) });
const chennai = document.getElementById("chennai");
chennai.addEventListener('click', () => { subMenuItem(chennai) });

function subMenuItem(e) {
  const loc_name = e.innerHTML;
  weather(loc_name);
  console.log(loc_name);
}


//user ip address fetch function
async function userIPFetch() {
  const IPFetchApi = `https://api.ipify.org?format=json`;
  const IPResponse = await fetch(IPFetchApi);
  const IPdata = await IPResponse.json();
  // console.log(IPdata);
  return IPdata.ip;
}



async function clientIP(){
  const deviceDescription = platform.description;
  const userIP =await userIPFetch();
  // console.log(userIP);

  const clientIP= `/clientIP/${userIP}/${deviceDescription}/${dayList[day]}/${date}/${month}/${year}/${hours}/${minutes}`;
  const clientIPRes=await fetch(clientIP);
  // const clientIPData=await clientIPRes.json();
  
}



//weather function with Location parameter passed
async function weather(loc) {

  //variable declared...
  const currLocName = loc;
  let location = document.getElementById("locName").value;
  if (location == '') {
    location = currLocName;
  }
  var temperature = document.getElementById("h1");
  var maxMin = document.getElementById("maxMin");
  var icon = document.getElementById("icon");
  var days = document.getElementById("days");
  var icon2 = document.getElementById("icon2");
  var foreMaxMin = document.getElementById("foreMaxMin");



  const api_url = `/weather/${location}`;
  // console.log(`${location} ${dayList[day]} ${date}/${month}/${year} ${hours}:${minutes}`);
  try {
    //fetching...
    const api_fetch = await fetch(api_url);
    const response = await api_fetch.json();
    // console.log(response);

    //innerHTML
    temperature.innerHTML = `${response.current.temp_c}°C <br> ${response.location.name}`;
    //console.log(response.forecast.forecastday[0]);
    maxMin.innerHTML = `${response.forecast.forecastday[0].day.maxtemp_c}°C / ${response.forecast.forecastday[0].day.mintemp_c}°C 
								&nbsp; Feels like ${response.current.feelslike_c}°C<br>
								${dayList[day]}, ${hours}:${minutes}<br>${response.location.region},${response.location.country}`;
    icon.innerHTML = `<img src="${response.current.condition.icon}">`;

    //console.log(epochConvert(response.forecast.forecastday[0].date_epoch));
    days.innerHTML = `
			<th>${dayList[epochConvert(response.forecast.forecastday[0].date_epoch)]}</th>
			<th>${dayList[epochConvert(response.forecast.forecastday[1].date_epoch)]}</th>
			<th>${dayList[epochConvert(response.forecast.forecastday[2].date_epoch)]}</th>`;

    icon2.innerHTML = `
			<td><img src="${response.forecast.forecastday[0].day.condition.icon}"></td>
			<td><img src="${response.forecast.forecastday[1].day.condition.icon}"></td>
			<td><img src="${response.forecast.forecastday[2].day.condition.icon}"></td>`;

    foreMaxMin.innerHTML = `
			<td>${response.forecast.forecastday[0].day.maxtemp_c}°C / ${response.forecast.forecastday[0].day.mintemp_c}°C</td>
			<td>${response.forecast.forecastday[1].day.maxtemp_c}°C / ${response.forecast.forecastday[1].day.mintemp_c}°C</td>
			<td>${response.forecast.forecastday[2].day.maxtemp_c}°C / ${response.forecast.forecastday[2].day.mintemp_c}°C</td>`;

    windSpeedDays.innerHTML = `
			<th></th>
			<th>${dayList[epochConvert(response.forecast.forecastday[0].date_epoch)]}</th>
			<th>${dayList[epochConvert(response.forecast.forecastday[1].date_epoch)]}</th>
			<th>${dayList[epochConvert(response.forecast.forecastday[2].date_epoch)]}</th>`;

    foreWindSpeed.innerHTML = `
			<td>Wind Speed</td>
			<td>${response.forecast.forecastday[0].day.maxwind_kph} k/h</td>
			<td>${response.forecast.forecastday[1].day.maxwind_kph} k/h</td>
			<td>${response.forecast.forecastday[2].day.maxwind_kph} k/h</td>`;

    humidity.innerHTML = `
			<td>Humidity</td>
			<td>${response.forecast.forecastday[0].day.avghumidity} %</td>
			<td>${response.forecast.forecastday[1].day.avghumidity} %</td>
			<td>${response.forecast.forecastday[2].day.avghumidity} %</td>`;

    rain.innerHTML = `
			<td>Rain</td>
			<td>${response.forecast.forecastday[0].day.daily_chance_of_rain} %</td>
			<td>${response.forecast.forecastday[1].day.daily_chance_of_rain} %</td>
			<td>${response.forecast.forecastday[2].day.daily_chance_of_rain} %</td>`;

    visibility.innerHTML = `
			<td>Visibility</td>
			<td>${response.forecast.forecastday[0].day.avgvis_km}</td>
			<td>${response.forecast.forecastday[1].day.avgvis_km}</td>
			<td>${response.forecast.forecastday[2].day.avgvis_km}</td>`;

    uvIndex.innerHTML = `
			<td>UV Index</td>
			<td>${response.forecast.forecastday[0].day.uv}</td>
			<td>${response.forecast.forecastday[1].day.uv}</td>
			<td>${response.forecast.forecastday[2].day.uv}</td>`;

  } catch (err) {
    alert("No matching location found.");
    console.error(err);
  }
}


//LiveLocation-fetch
function liveLoc() {
  const success = async (e) => {
    //console.log(e);

    const lat = e.coords.latitude;
    const lon = e.coords.longitude;

    geoAPIUrl = `/geoAPI/${lat}/${lon}/${deviceDescription}/${dayList[day]}/${date}/${month}/${year}/${hours}/${minutes}`;
    // console.log(` ${dayList[day]} ${date}/${month}/${year} ${hours}:${minutes}`);
    //fetching...
    const geo_fetch = await fetch(geoAPIUrl);
    const data = await geo_fetch.json();
    var city = data.city;
    console.log(data.city);
    weather(city);
  }

  //for error in geoAPI
  const error = () => {
    alert("Geo Location Error ☹ \n\nPlease turn on your GPS \nOr allow GPS location access ");
    console.error(error);
  };


  // const deviceBrowserName=platform.name;
  // const deviceVersion=platform.version;
  // const deviceLayout=platform.layout;
  // const deviceOS=platform.os;
  const deviceDescription = platform.description;

  // console.log(deviceBrowserName);
  // console.log(deviceVersion);
  // console.log(deviceLayout);
  // console.log(deviceOS);
  // console.log(deviceDescription);

  navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true }); //calling the geoLocation function

}


//converting UNIX time
function epochConvert(p) {
  var dt = new Date(p * 1000);

  var dy = dt.getUTCDay(p);
  return dy;
}

















// var temperature = document.getElementById("h1");
//         var maxMin = document.getElementById("maxMin");
//         var icon = document.getElementById("icon");
//         var days = document.getElementById("days");
//         var icon2 = document.getElementById("icon2");
//         var foreMaxMin = document.getElementById("foreMaxMin");
//         var windSpeedDays = document.getElementById("windSpeedDays");
//         var foreWindSpeed = document.getElementById("foreWindSpeed");
//         var foreWindSpeed = document.getElementById("foreWindSpeed");
//         var humidity = document.getElementById("humidity");
//         var rain = document.getElementById("rain");
//         var visibility = document.getElementById("visibility");
//         var uvIndex = document.getElementById("uvIndex");

//         const api_url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&days=3`;
//         //fetching...
//         fetch(api_url, options)
//           .then((response) => response.json())
//           .then((response) => {
//             console.log(response);
//             temperature.innerHTML = `${response.current.temp_c}°C <br> ${response.location.name}`;
//             //console.log(response.forecast.forecastday[0]);
//             maxMin.innerHTML = `${response.forecast.forecastday[0].day.maxtemp_c}°C / ${response.forecast.forecastday[0].day.mintemp_c}°C
// 									&nbsp Feels like ${response.current.feelslike_c}°C<br>
// 									${dayList[day]}, ${hours}:${minutes}`;
//             icon.innerHTML = `<img src="${response.current.condition.icon}">`;

//             //console.log(epochConvert(response.forecast.forecastday[0].date_epoch));
//             days.innerHTML = `
// 					<th>${dayList[epochConvert(response.forecast.forecastday[0].date_epoch)]}</th>
// 					<th>${dayList[epochConvert(response.forecast.forecastday[1].date_epoch)]}</th>
// 					<th>${dayList[epochConvert(response.forecast.forecastday[2].date_epoch)]}</th>`;

//             icon2.innerHTML = `
// 					<td><img src="${response.forecast.forecastday[0].day.condition.icon}"></td>
// 					<td><img src="${response.forecast.forecastday[1].day.condition.icon}"></td>
// 					<td><img src="${response.forecast.forecastday[2].day.condition.icon}"></td>`;

//             foreMaxMin.innerHTML = `
// 					<td>${response.forecast.forecastday[0].day.maxtemp_c}°C / ${response.forecast.forecastday[0].day.mintemp_c}°C</td>
// 					<td>${response.forecast.forecastday[1].day.maxtemp_c}°C / ${response.forecast.forecastday[1].day.mintemp_c}°C</td>
// 					<td>${response.forecast.forecastday[2].day.maxtemp_c}°C / ${response.forecast.forecastday[2].day.mintemp_c}°C</td>`;

//             windSpeedDays.innerHTML = `
// 					<th></th>
// 					<th>${dayList[epochConvert(response.forecast.forecastday[0].date_epoch)]}</th>
// 					<th>${dayList[epochConvert(response.forecast.forecastday[1].date_epoch)]}</th>
// 					<th>${dayList[epochConvert(response.forecast.forecastday[2].date_epoch)]}</th>`;

//             foreWindSpeed.innerHTML = `
// 					<td>Wind Speed</td>
// 					<td>${response.forecast.forecastday[0].day.maxwind_kph} k/h</td>
// 					<td>${response.forecast.forecastday[1].day.maxwind_kph} k/h</td>
// 					<td>${response.forecast.forecastday[2].day.maxwind_kph} k/h</td>`;

//             humidity.innerHTML = `
// 					<td>Humidity</td>
// 					<td>${response.forecast.forecastday[0].day.avghumidity} %</td>
// 					<td>${response.forecast.forecastday[1].day.avghumidity} %</td>
// 					<td>${response.forecast.forecastday[2].day.avghumidity} %</td>`;

//             rain.innerHTML = `
// 					<td>Rain</td>
// 					<td>${response.forecast.forecastday[0].day.daily_chance_of_rain} %</td>
// 					<td>${response.forecast.forecastday[1].day.daily_chance_of_rain} %</td>
// 					<td>${response.forecast.forecastday[2].day.daily_chance_of_rain} %</td>`;

//             visibility.innerHTML = `
// 					<td>Visibility</td>
// 					<td>${response.forecast.forecastday[0].day.avgvis_km}</td>
// 					<td>${response.forecast.forecastday[1].day.avgvis_km}</td>
// 					<td>${response.forecast.forecastday[2].day.avgvis_km}</td>`;

//             uvIndex.innerHTML = `
// 					<td>UV Index</td>
// 					<td>${response.forecast.forecastday[0].day.uv}</td>
// 					<td>${response.forecast.forecastday[1].day.uv}</td>
// 					<td>${response.forecast.forecastday[2].day.uv}</td>`;
//           })

//           .catch((err) => console.error(err)); // for error in weatherAPI