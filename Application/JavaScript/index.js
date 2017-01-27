

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
    // Removes focus from all widgets
    function clearFocus() {
        widgetOne.children().first().removeClass('bump-down');
        widgetTwo.children().first().removeClass('bump-down');
        widgetThree.children().first().removeClass('bump-down');
        widgetFour.children().first().removeClass('bump-down');
    }
    // Removes everything from #hub
    function removeHubContents() {
        hub.children().each(function() {
            $(this).css('visibility', 'collapse');
        });
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
                'hi': function () { alert('Hello'); },
                'show me the weather': function() {
                    clearFocus();
                    focusWidget(2);
                    removeHubContents();
                    $("#weather").css('visibility', 'visible');
                },
                'show me the time': function() {
                    clearFocus();
                    focusWidget(1);
                    removeHubContents();
                },
                'show me the map': function() {
                    clearFocus();
                    focusWidget(3);
                    removeHubContents();
                    $("#map").css('visibility', 'visible');
                },
                'show me the news': function() {
                    clearFocus();
                    focusWidget(4);
                    removeHubContents();
                }
            };
            // Add our commands to annyang
            annyang.addCommands(commands);
            //https://www.talater.com/annyang/ for more examples
            // Start listening.
            annyang.start();
        }
    }
});
