let lat;
let lon;
let max = [];
let min = [];
const currentWeather = document.querySelector('.current-conditions');
const weeklyForecast = document.querySelector('.forecast');


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
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    getWeatherLocation(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=45db684b0d24f95132a33d44dbd10e15`).then((weatherData) => {
      currentWeather.insertAdjacentHTML('afterbegin', `
      <h2>Current Conditions</h2>
      <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" />
      <div class="current">
        <div class="temp">${weatherData.main.temp.toFixed(0)}℃</div>
        <div class="condition">${weatherData.weather[0].description}</div>
      </div>
      `)
    })

    getWeeklyForecast(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=45db684b0d24f95132a33d44dbd10e15`).then((forecast) => {
  
      const sixPm = forecast.list.filter (f => f.dt_txt.split(" ")[1] === "18:00:00");
      while(forecast.list.length){

        const dailyForecast = forecast.list.reverse().splice(0,8);
        console.log(dailyForecast)
        let maxTemp = [
          dailyForecast[7].main.temp_max,
          dailyForecast[6].main.temp_max,
          dailyForecast[5].main.temp_max,
          dailyForecast[4].main.temp_max,
          dailyForecast[3].main.temp_max,
          dailyForecast[2].main.temp_max,
          dailyForecast[1].main.temp_max,
          dailyForecast[0].main.temp_max
        ];

         max.push(Math.max(...maxTemp));
        let minTemp = [
          dailyForecast[7].main.temp_min,
          dailyForecast[6].main.temp_min,
          dailyForecast[5].main.temp_min,
          dailyForecast[4].main.temp_min,
          dailyForecast[3].main.temp_min,
          dailyForecast[2].main.temp_min,
          dailyForecast[1].main.temp_min,
          dailyForecast[0].main.temp_min
        ];

         min.push(Math.min(...minTemp)); 
      };
      sixPm.forEach(day => {
        let date = new Date(day.dt_txt)
        let days = date.toLocaleString("en", { weekday: "long" });
        weeklyForecast.insertAdjacentHTML('beforeend', `
        <div class="day">
        <h3>${days}</h3>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" />
        <div class="description">${day.weather[0].description}</div>
        <div class="temp">
          <span class="high">${max.pop().toFixed(0)}℃</span>/<span class="low">${min.pop().toFixed(0)}℃</span>
        </div>
      </div>
        `)
      })
    })
  })
}
