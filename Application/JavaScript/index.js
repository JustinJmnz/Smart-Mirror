

$(function () { // Main Function
    startListening();

    var mainContainer = $('#main-container');
    // Top Section Variables
    var sectionTop = $('#section-top');
    var widgetOne = sectionTop.children().eq(0); // Check the 0th child of sectionTop Div
    var widgetTwo = sectionTop.children().eq(1);
    var widgetThree = sectionTop.children().eq(2);
    var widgetFour = sectionTop.children().eq(3);
    // Bottom Section Variables
    var sectionBottom = $('#section-bottom');
    var hub = $('#hub');

    setInterval(function() {
        focusWidget(1);
    }, 1000);
    setInterval(function() {
        focusWidget(2);
    }, 1100);
    setInterval(function() {
        focusWidget(3);
    }, 1200);
    setInterval(function() {
        focusWidget(4);
    }, 1300);

    hub.append(getTimeDiv());


    // Focuses or Unfocuses on a widget depending on number
    function focusWidget(number) {
        switch (number) {
            case 1:
                var widgetImg = widgetOne.children().first();
                if (widgetImg.hasClass('bump-down')){
                    widgetImg.removeClass('bump-down');
                }else {
                    widgetImg.addClass('bump-down');
                }
                break;
            case 2:
                var widgetImg = widgetTwo.children().first();
                if (widgetImg.hasClass('bump-down')){
                    widgetImg.removeClass('bump-down');
                }else {
                    widgetImg.addClass('bump-down');
                }
                break;
            case 3:
                var widgetImg = widgetThree.children().first();
                if (widgetImg.hasClass('bump-down')){
                    widgetImg.removeClass('bump-down');
                }else {
                    widgetImg.addClass('bump-down');
                }
                break;
            case 4:
                var widgetImg = widgetFour.children().first();
                if (widgetImg.hasClass('bump-down')){
                    widgetImg.removeClass('bump-down');
                }else {
                    widgetImg.addClass('bump-down');
                }
                break;
            default:
                console.log("focusWidget() -> default case");
        }
    }
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
