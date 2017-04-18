/*
File Description
----------------
About: Weather file, this file contains everything about the weather capabilities
*/
var getCurrentLocationForWeather = false; // Flag set in speechRecognition.js
var currentCoordinates = [0, 0];
$(window).off("done-getting-current-coordinates").on("done-getting-current-coordinates", function() {
    console.log("Location Found: " + currentCoordinates[0] + ", " + currentCoordinates[1]);
    getCurrentWeatherForLocation(currentCoordinates[0], currentCoordinates[1]);
});
// Gets the weather for the given latitude and longitude
function getCurrentWeatherForLocation(lat, long) {
    $.ajax({
        url: 'https://api.darksky.net/forecast/ee97f3add6d193a03d64105b90882965/' + lat + ',' + long, // ee97f3add6d193a03d64105b90882965 is the API key
        type: 'GET',
        dataType: 'JSONP' // Need the P here
    }).done(function(data) {
        console.log(data);
        // Create the HTML with the appropriate data
        createWeatherDivs(data);
    }).fail(function(error) {
        console.log("Error with getting the weather");
        console.log(error);
    });
}
// Creates the HTML for the weather: data is the weather object from ajax call
function createWeatherDivs(data) {

}
// Get current coordinates from current location ---- Similar function in maps.js ----
function getCurrentWeatherLocation() {
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
              currentCoordinates[0] = position.coords.latitude;
              currentCoordinates[1] = position.coords.longitude;
              $(window).trigger("done-getting-current-coordinates");
        });
    } else {
      // Browser doesn't support Geolocation
      console.error("Browser can't support geolocation");
    }
}

// Called from speechRecognition.js as main weather method
function getWeather() {
    if(getCurrentLocationForWeather === true){
        console.log("getWeather();");
        getCurrentWeatherLocation();
    }
}
