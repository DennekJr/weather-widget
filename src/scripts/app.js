let lat;
let lon;
const currentWeather = document.querySelector('.current-conditions');
// const currentWeather1 = document.getElementById('current');
// console.log(theWeather);
// console.log(currentWeather1);


const getWeatherLocation = (url) => {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      Promise.reject();
    }
  })
}

const getWeeklyForecast = (url) => {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      Promise.reject();
    }
  })
}

if(!navigator.geolocation){
  console.log('Error, location not allowed');
} else {
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude
    lon = position.coords.longitude
    console.log(lat, lon);
    getWeatherLocation(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=45db684b0d24f95132a33d44dbd10e15`).then((weatherData) => {
      // let deg = `${(weatherData.main.temp - 32) * 5/9}`;
      currentWeather.insertAdjacentHTML('afterbegin', `
      <h2>Current Conditions</h2>
      <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" />
      <div class="current">
        <div class="temp">${weatherData.main.temp}℃</div>
        <div class="condition">${weatherData.weather[0].description}</div>
      </div>
      `)
      console.log(weatherData);
    })
  })
}
