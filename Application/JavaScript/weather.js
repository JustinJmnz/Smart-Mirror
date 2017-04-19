/*
File Description
----------------
About: Weather file, this file contains everything about the weather capabilities
*/
var getCurrentLocationForWeather = false; // Flag set in speechRecognition.js
var currentCoordinates = [0, 0];
// Called from speechRecognition.js as main weather method
function getWeather() {
    toggleOverlay();
    if(getCurrentLocationForWeather === true){
        console.log("getWeather();");
        getCurrentWeatherLocation();
    }
}
// Triggered when we are done getting the current coordinates
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
    // Getting current dates for the week ahead
    var currentDate = new Date();
    var currentDatePlusOne = new Date(currentDate.getTime() + 86400000); // Add one day to previous day
    var currentDatePlusTwo = new Date(currentDatePlusOne.getTime() + 86400000); // Add one day to previous day
    var currentDatePlusThree = new Date(currentDatePlusTwo.getTime() + 86400000); // Add one day to previous day
    var currentDatePlusFour = new Date(currentDatePlusThree.getTime() + 86400000); // Add one day to previous day
    var currentDatePlusFive = new Date(currentDatePlusFour.getTime() + 86400000); // Add one day to previous day
    var currentDatePlusSix = new Date(currentDatePlusFive.getTime() + 86400000); // Add one day to previous day
    // Divs
    var weatherContainerDiv = $("<div id='weather-container'></div>");
    // Constructing top part
    var weatherTopDiv = $("<div class='weather-top'></div>");
    var weeklyForecastDiv = $("<div class='weekly-forecast'></div>");
    // Variables for 7-day forecast
    var weekdayTitle = "";
    var weekdayTemperature = "";
    // Creating the 7-day forecast
    for (var i = 0; i < 7; i++) {
        var forecastDiv = $("<div class='weekly-forecast-days-column'></div>");
        // Comparing the dates in data to the current date -> the value of i will not matter in here
        switch (new Date(data.daily.data[i].time*1000).toString().slice(0, 15)) {
            case currentDate.toString().slice(0, 15):
                var currentDayData = data.daily.data[i];
                var currentDay = getWeekday(currentDate.toString().slice(0, 3));
                var titleDiv = $("<div class='weekly-forecast-days-weekday'>" + currentDay + "</div>");
                var infoDiv = $("<div class='weekly-forecast-days-cells'></div>");
                var temperatureDiv = $("<div class='predicted-temp'>" + (currentDayData.temperatureMax + "").slice(0, 2) + "&deg F</div>");
                var iconSource = getIcon(currentDayData.icon);

                var iconDiv = $("<div class='predicted-icon'></div>");
                var icon = $("<img src='" + iconSource + "' height='75px' width='75px' />");
                break;
            case currentDatePlusOne.toString().slice(0, 15):
                var currentDayData = data.daily.data[i];
                var currentDay = getWeekday(currentDatePlusOne.toString().slice(0, 3));
                var titleDiv = $("<div class='weekly-forecast-days-weekday'>" + currentDay + "</div>");
                var infoDiv = $("<div class='weekly-forecast-days-cells'></div>");
                var temperatureDiv = $("<div class='predicted-temp'>" + (currentDayData.temperatureMax + "").slice(0, 2) + "&deg F</div>");
                var iconSource = getIcon(currentDayData.icon);
                var iconDiv = $("<div class='predicted-icon'></div>");
                var icon = $("<img src='" + iconSource + "' height='75px' width='75px' />");
                break;
            case currentDatePlusTwo.toString().slice(0, 15):
                var currentDayData = data.daily.data[i];
                var currentDay = getWeekday(currentDatePlusTwo.toString().slice(0, 3));
                var titleDiv = $("<div class='weekly-forecast-days-weekday'>" + currentDay + "</div>");
                var infoDiv = $("<div class='weekly-forecast-days-cells'></div>");
                var temperatureDiv = $("<div class='predicted-temp'>" + (currentDayData.temperatureMax + "").slice(0, 2) + "&deg F</div>");
                var iconSource = getIcon(currentDayData.icon);
                var iconDiv = $("<div class='predicted-icon'></div>");
                var icon = $("<img src='" + iconSource + "' height='75px' width='75px' />");
                break;
            case currentDatePlusThree.toString().slice(0, 15):
                var currentDayData = data.daily.data[i];
                var currentDay = getWeekday(currentDatePlusThree.toString().slice(0, 3));
                var titleDiv = $("<div class='weekly-forecast-days-weekday'>" + currentDay + "</div>");
                var infoDiv = $("<div class='weekly-forecast-days-cells'></div>");
                var temperatureDiv = $("<div class='predicted-temp'>" + (currentDayData.temperatureMax + "").slice(0, 2) + "&deg F</div>");
                var iconSource = getIcon(currentDayData.icon);
                var iconDiv = $("<div class='predicted-icon'></div>");
                var icon = $("<img src='" + iconSource + "' height='75px' width='75px' />");
                break;
            case currentDatePlusFour.toString().slice(0, 15):
                var currentDayData = data.daily.data[i];
                var currentDay = getWeekday(currentDatePlusFour.toString().slice(0, 3));
                var titleDiv = $("<div class='weekly-forecast-days-weekday'>" + currentDay + "</div>");
                var infoDiv = $("<div class='weekly-forecast-days-cells'></div>");
                var temperatureDiv = $("<div class='predicted-temp'>" + (currentDayData.temperatureMax + "").slice(0, 2) + "&deg F</div>");
                var iconSource = getIcon(currentDayData.icon);
                var iconDiv = $("<div class='predicted-icon'></div>");
                var icon = $("<img src='" + iconSource + "' height='75px' width='75px' />");
                break;
            case currentDatePlusFive.toString().slice(0, 15):
                var currentDayData = data.daily.data[i];
                var currentDay = getWeekday(currentDatePlusFive.toString().slice(0, 3));
                var titleDiv = $("<div class='weekly-forecast-days-weekday'>" + currentDay + "</div>");
                var infoDiv = $("<div class='weekly-forecast-days-cells'></div>");
                var temperatureDiv = $("<div class='predicted-temp'>" + (currentDayData.temperatureMax + "").slice(0, 2) + "&deg F</div>");
                var iconSource = getIcon(currentDayData.icon);
                var iconDiv = $("<div class='predicted-icon'></div>");
                var icon = $("<img src='" + iconSource + "' height='75px' width='75px' />");
                break;
            case currentDatePlusSix.toString().slice(0, 15):
                var currentDayData = data.daily.data[i];
                var currentDay = getWeekday(currentDatePlusSix.toString().slice(0, 3));
                var titleDiv = $("<div class='weekly-forecast-days-weekday'>" + currentDay + "</div>");
                var infoDiv = $("<div class='weekly-forecast-days-cells'></div>");
                var temperatureDiv = $("<div class='predicted-temp'>" + (currentDayData.temperatureMax + "").slice(0, 2)+ "&deg F</div>");
                var iconSource = getIcon(currentDayData.icon);
                var iconDiv = $("<div class='predicted-icon'></div>");
                var icon = $("<img src='" + iconSource + "' height='75px' width='75px' />");
                break;
        }
        // Appending div
        iconDiv.append(icon);
        infoDiv.append(temperatureDiv);
        infoDiv.append(iconDiv);
        forecastDiv.append(titleDiv);
        forecastDiv.append(infoDiv);
        weeklyForecastDiv.append(forecastDiv);
    }
    // Constructing bottom part
    var bottomDiv = $("<div class='weather-bottom'></div>");
    // Bottom Left side
    var currentForecast = $("<div class='weather-current-forecast'></div>");
    var currentTemperature = $("<div class='current-temperature'>Currently: " + (data.currently.apparentTemperature + "").slice(0, 2) + "&deg F</div>");
    var currentIcon = $("<div class='current-icon'></div>");
    var iconSource = getIcon(data.currently.icon);
    var icon = $("<img src='" + iconSource + "' width='75px' height='75px' />");
    var currentInfo = $("<div class='current-info'></div>");
    var currentHumidity = $("<p class='current-humidity'>Humidity: " + ((data.currently.humidity * 100) + "%") + "</p>");
    var chanceOfRain = $("<p class='current-chance-of-rain'>Chance of rain: " + ((data.currently.precipProbability * 100) + "%") + "</p>");
    // Bottom Right side
    var bottomRight = $("<div class='weather-bottom-right'></div>");
    var maxMinTemp = $("<div class='weather-high-low-temperature'></div>");
    var highTemp = $("<p class='weather-high-temp'>High: " + (data.daily.data[0].apparentTemperatureMax + "").slice(0, 2) + "&deg F</p>");
    var lowTemp = $("<p class='weather-low-temp'>Low: " + (data.daily.data[0].apparentTemperatureMin + "").slice(0, 2) + "&deg F</p>");
    var extraInfo = $("<div class='weather-current-info'></div>");
    var extraSummary = $("<p>" + data.daily.data[0].summary + "</p>");
    // Appending Top stuff
    weatherTopDiv.append(weeklyForecastDiv);
    // Appending Bottom left side stuff
    currentInfo.append(currentHumidity);
    currentInfo.append(chanceOfRain);
    currentIcon.append(icon);
    currentForecast.append(currentTemperature);
    currentForecast.append(currentIcon);
    currentForecast.append(currentInfo);
    bottomDiv.append(currentForecast);
    // Appending Bottom right stuff
    extraInfo.append(extraSummary);
    maxMinTemp.append(highTemp);
    maxMinTemp.append(lowTemp);
    bottomRight.append(maxMinTemp);
    bottomRight.append(extraInfo);
    bottomDiv.append(bottomRight);
    // Appending everything to container
    weatherContainerDiv.append(weatherTopDiv);
    weatherContainerDiv.append(bottomDiv);
    toggleOverlay();
    slideIntoHub(weatherContainerDiv);

}
// Gets the Icon given the iconText from the response
function getIcon(iconText) {
    var iconSource = "";
    if(iconText === "partly-cloudy-night" || iconText === "partly-cloudy-day") {
        iconSource = "../../Resources/Pictures/weather-icons/partly-cloudy.png";
    } else if(iconText === "rain") {
        iconSource = "../../Resources/Pictures/weather-icons/rain.png";
    } else if(iconText === "clear-day" || iconText === "clear-night") {
        iconSource = "../../Resources/Pictures/weather-icons/sunny.png";
    } else if(iconText === "snow" || iconText === "sleet") {
        iconSource = "../../Resources/Pictures/weather-icons/snow.png";
    } else if(iconText === "cloudy") {
        iconSource = "../../Resources/Pictures/weather-icons/cloudy.png";
    } else if(iconText === "thunderstorm") {
        iconSource = "../../Resources/Pictures/weather-icons/storm.png";
    } else {
        iconSource = "../../Resources/Pictures/weather-icons/sunny.png";
    }
    return iconSource;
}
// Get the weekday given a shorted version of it -> Tue = Tuesday
function getWeekday(weekdayShortened) {
    var weekday = "";
    switch (weekdayShortened) {
        case "Sun":
            weekday = "Sunday";
            break;
        case "Mon":
            weekday = "Monday";
            break;
        case "Tue":
            weekday = "Tuesday";
            break;
        case "Wed":
            weekday = "Wednesday";
            break;
        case "Thu":
            weekday = "Thursday";
            break;
        case "Fri":
            weekday = "Friday";
            break;
        case "Sat":
            weekday = "Saturday";
            break;
    }
    return weekday;
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
