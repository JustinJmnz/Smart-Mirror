/*
File Description
----------------
About: Main file, this file starts the program
*/

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
        codeAddress();
        // annyang.trigger('Show me the top news from BBC');
        // showOverlay();
    });
});
