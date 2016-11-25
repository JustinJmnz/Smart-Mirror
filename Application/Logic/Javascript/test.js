$(function () { // This method fires when the DOM (Document Object Model) is loaded
    startClock();
    startListening();
});

// Will start the STT (Speech to Text)
function startListening() {
    if (annyang) {
        // Add more Commands here
        var commands = {
            'hello': function () { alert('Hello world!'); },
            'show me a map': function () { alert('showing map'); }
        };
        // For more complex commands visit https://www.talater.com/annyang/

        // Add our commands to annyang
        annyang.addCommands(commands);

        // Start listening.
        annyang.start();
    }
}
// Will start the clock, refreshing every second
function startClock() {
    setInterval(function () {
        $('#time').html(new Date().toLocaleTimeString());
    }, 1000);
}



