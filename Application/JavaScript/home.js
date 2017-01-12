

$(function () { // Main Function
    var mainContainer = $('#main-container');
    var section1 = $('#section-1');
    var section2 = $('#section-2');
    var section3 = $('#section-3');

    startListening();
    section2.append(getTimeDiv());

    function startListening() {
        if (annyang) {
            // Let's define a command.
            var commands = {
                'hello': function () { alert('Hello world!'); }
            };

            // Add our commands to annyang
            annyang.addCommands(commands);
            //https://www.talater.com/annyang/ for more examples
            // Start listening.
            annyang.start();
        }
    }
    function getTimeDiv() {
        var timeDiv = $('<div></div>');
        timeDiv.append('<p id="time"></p>');
        setInterval(function() {
            timeDiv.html(new Date().toLocaleTimeString());
        }, 1000);
        return timeDiv;
    }
});
