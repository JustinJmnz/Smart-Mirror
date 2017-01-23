

$(function () { // Main Function
    startListening();

    var mainContainer = $('#main-container');
    var sectionTop = $('#section-top');
    var sectionMiddle = $('#section-middle');
    var sectionBottom = $('#section-bottom');
    var paneLeft = $('#pane-left');
    var paneMiddle = $('#pane-middle');
    var paneRight = $('#pane-right');

    sectionMiddle.append(getTimeDiv());

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
    // Starts the Speech to text
    function startListening() {
        if (annyang) {
            // Let's define a command.
            var commands = {
                'hi': function () { console.log('you said hi'); }
            };
            // Add our commands to annyang
            annyang.addCommands(commands);
            //https://www.talater.com/annyang/ for more examples
            // Start listening.
            annyang.start();
        }
    }
});
