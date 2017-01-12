

$(function () { // Main Function
    startListening();

    var mainContainer = $('#main-container');
    var section1 = $('#section-1');
    var section2 = $('#section-2');
    var section3 = $('#section-3');

    section2.append(getTimeDiv());

    function startListening() {
        console.log('inside function');
        if (annyang) {
            console.log('inside if');
            // Let's define a command.
            var commands = {
                'hi': function () { console.log('you said hi'); }
            };
            console.log('Set up commands');

            // Add our commands to annyang
            annyang.addCommands(commands);
            console.log('added commands');
            //https://www.talater.com/annyang/ for more examples
            // Start listening.
            annyang.start();
            console.log('Started Listening');
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
