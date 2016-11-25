if (annyang) {
    // Let's define a command.
    var commands = {
        'hello': function () { alert('Hello world!'); },
        'show me a map': function() { alert('showing map'); }
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening.
    annyang.start();
}