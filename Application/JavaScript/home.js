$(function () {
    startListening();
    setInterval(function () {
        $('#time').html(new Date().toLocaleTimeString());
    }, 1000);
});

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
function getTime() {
    var $timeDiv = $('<div></div>');
    $timeDiv.append('<p id="time"></p>');
    return $timeDiv;
}