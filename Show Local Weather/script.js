var lon2, lat2;


//get location information
$.getJSON("http://ipinfo.io", function(localData) {
  document.getElementById("location").innerHTML = localData.city + ", " + localData.country;
  var city = localData.city;
  var location = localData.loc;
  var arr = [];
  arr = location.split(',');
  lat2 = arr[0];
  lon2 = arr[1];
});

//hide all of the icons
$(".icon").hide ();


var APPID2 = '65983658765ee18d7111b9e263e5c48b'
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(locationSuccess)//, locationError);
} else {
  document.getElementById('temp').innerHTML = 'Your browser does not support Geolocation!';
}

function locationSuccess(position) {
  console.log(position);
  var lat = position.coords.latitude || lat2;
  var lon = position.coords.longitude || lon2;
  var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&' + 'lon=' + lon + '&APPID=' + APPID2;
  // Get and post the weather
  $.getJSON(weatherAPI, function(w) {
    var temp = w.main.temp - 273;
    document.getElementById('temp').innerHTML = temp.toFixed(2) + ' °C';
    var currentWeather = w.weather[0].main;
    document.getElementById('weather').innerHTML = currentWeather;
    if(currentWeather == 'Clouds'){
      $('.cloudy').show();
    }else if(currentWeather == 'Drizzle') {
      $('.sun-shower').show();
    }else if(currentWeather == 'Rain') {
      $('.rainy').show();
    }else if(currentWeather == 'Snow') {
      $('.flurries').show();
    }else if(currentWeather == 'Clear') {
      $('.sunny').show();
    }else if(currentWeather == 'Thunderstom') {
      $('.thunder-storm').show();
    }
  });
}

// function locationError(error) {
//   switch (error.code) {
//     case error.TIMEOUT:
//       document.getElementById('temp').innerHTML = "A timeout occured! Please try again!";
//       break;
//     case error.POSITION_UNAVAILABLE:
//       document.getElementById('temp').innerHTML = 'We can\'t detect your location. Sorry!';
//       break;
//     case error.PERMISSION_DENIED:
//       document.getElementById('temp').innerHTML = 'Please allow geolocation access for this to work.';
//       break;
//     case error.UNKNOWN_ERROR:
//       document.getElementById('temp').innerHTML = 'An unknown error occured!';
//       break;
//   }
// }