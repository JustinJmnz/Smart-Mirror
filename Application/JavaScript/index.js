/*
File Description
----------------
About: Main file, this file starts the program
*/

$(function () { // Main Function
    startListening();

    // var mainContainer = $('#main-container');
    // // Top Section Variables
    // var sectionTop = $('#section-top');
    // var widgetTime = sectionTop.children().eq(0); // Check the 0th child of sectionTop Div
    // var widgetWeather = sectionTop.children().eq(1);
    // var widgetMap = sectionTop.children().eq(2);
    // var widgetNews = sectionTop.children().eq(3);
    // // Bottom Section Variables
    // var sectionBottom = $('#section-bottom');
    // var hub = $('#hub');

    //annyang.trigger('show me the news of cnn');




    // Creates a div with the time in it
    function getTimeDiv() {
        console.log('Creating time divs');
        var timeDiv = $('<div></div>');
        timeDiv.append('<p id="time"></p>');
        setInterval(function() {
            timeDiv.html(new Date().toLocaleTimeString());
        }, 1000);
        return timeDiv;
    }



});
