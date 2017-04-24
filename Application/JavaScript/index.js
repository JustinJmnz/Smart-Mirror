/*
File Description
----------------
About: Main file, this file starts the program
*/
var viewingNews = false;
var viewingMaps = false;
var viewingWeather = false;
var viewingTime = false;

$(function () { // Main Function
    startListening();
    toggleOverlay(); // Remove overlay, on by default


    // // Creates a div with the time in it
    // function getTimeDiv() {
    //     console.log('Creating time divs');
    //     var timeDiv = $('<div></div>');
    //     timeDiv.append('<p id="time"></p>');
    //     setInterval(function() {
    //         timeDiv.html(new Date().toLocaleTimeString());
    //     }, 1000);
    //     return timeDiv;
    // }
    // $('#section-top:nth-child(1)').click(function() {
    //     prepareArticles();
    // });

    // For testing purposes only
    $('.widget').click(function() {
        // codeAddress();
        annyang.trigger("show me the news from CNBC");
        // showOverlay();
    });
});
// Set what I am currently viewing
function setCurrentlyViewing(widget) {
    if(widget === "maps") {
        viewingMaps = true;
        viewingNews = false;
        viewingWeather = false;
        viewingTime = false;
    } else if(widget === "news") {
        viewingMaps = false;
        viewingNews = true;
        viewingWeather = false;
        viewingTime = false;
    } else if(widget === "weather") {
        viewingMaps = false;
        viewingNews = false;
        viewingWeather = true;
        viewingTime = false;
    } else if(widget === "time") {
        viewingMaps = false;
        viewingNews = false;
        viewingWeather = false;
        viewingTime = true;
    }
}
// Check to see what I am currently viewing
function currentlyViewing() {
    if(viewingMaps) {
        return "maps";
    } else if(viewingNews) {
        return "news";
    } else if(viewingWeather) {
        return "weather";
    } else if(viewingTime){
        return "sports";
    }
}
