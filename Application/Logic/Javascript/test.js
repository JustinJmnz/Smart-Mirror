$(function () { // This method fires when the DOM (Document Object Model) is loaded
    startClock();
    startListening();
    setLoading();
    setInterval(function () {
        setLoading();
    }, 1000);
    setInterval(function () {
        removeLoading();
    }, 1500);
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

function setLoading() { 
    $('body').addClass('loading').fadeIn(1000);
}
function removeLoading() {
    $('body').removeClass('loading').fadeIn(1000);
}




