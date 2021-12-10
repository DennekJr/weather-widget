let lat;
let lon;

const getWeatherLocation = (url) => {
  fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      Promise.reject();
    }
  }).then((weatherData) => {
    console.log(weatherData);
  })
}

if(!navigator.geolocation){
  console.log('Error, location not allowed');
} else {
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude
    lon = position.coords.longitude
    console.log(lat, lon);
    getWeatherLocation(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=45db684b0d24f95132a33d44dbd10e15`)
  })
}
