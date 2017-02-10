

$(function () { // Main Function
    startListening();

    var mainContainer = $('#main-container');
    // Top Section Variables
    var sectionTop = $('#section-top');
    var widgetTime = sectionTop.children().eq(0); // Check the 0th child of sectionTop Div
    var widgetWeather = sectionTop.children().eq(1);
    var widgetMap = sectionTop.children().eq(2);
    var widgetNews = sectionTop.children().eq(3);
    // Bottom Section Variables
    var sectionBottom = $('#section-bottom');
    var hub = $('#hub');

    annyang.trigger('show me the news of cnn');

    // Focuses or Unfocuses on a widget depending on number
    function focusWidget(number) {
        clearFocus();
        removeHubContents();
        switch (number) {
            case 1:
                var widgetImg = widgetTime.children().first();
                if (widgetImg.hasClass('bump-down')){
                    widgetImg.removeClass('bump-down');
                }else {
                    widgetImg.addClass('bump-down');
                }
                break;
            case 2:
                var widgetImg = widgetWeather.children().first();
                if (widgetImg.hasClass('bump-down')){
                    widgetImg.removeClass('bump-down');
                }else {
                    widgetImg.addClass('bump-down');
                }
                break;
            case 3:
                var widgetImg = widgetMap.children().first();
                if (widgetImg.hasClass('bump-down')){
                    widgetImg.removeClass('bump-down');
                }else {
                    widgetImg.addClass('bump-down');
                }
                break;
            case 4:
                var widgetImg = widgetNews.children().first();
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
        widgetTime.children().first().removeClass('bump-down');
        widgetWeather.children().first().removeClass('bump-down');
        widgetMap.children().first().removeClass('bump-down');
        widgetNews.children().first().removeClass('bump-down');
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

    function getNews(sortedBy, dataSource) {
        var newsSource = "";
        if(dataSource != undefined){
            switch (dataSource.toLowerCase()) {
                case "cnn":
                    newsSource = "cnn";
                    break;
                case "buzzfeed":
                    newsSource = "buzzfeed";
                    break;
                case "cnbc":
                    newsSource = "cnbc";
                    break;
                case "bloomberg":
                    newsSource = "bloomberg";
                    break;
                default:
                    newsSource = "cnn";
            }
        } else {
            newsSource = "cnn"
        }
        if (sortedBy === undefined || sortedBy === "") {
            sortedBy = 'top';
        }
        console.log(newsSource);
        // AJAX call to get the news from newsSource sorted by sortedBy
        $.ajax({
            url: "https://newsapi.org/v1/articles?source=" + newsSource + "&sortBy=" + sortedBy + "&apiKey=0944a3e49a044c82b4f6c9473a25f0cf",
            type: 'GET',
            success: function(data){
                console.log(data);
            },
            error: function(data) { // Something went wrong, probably source itsn't filterable by value of sortedBy
                console.log(data.responseJSON.message + "\n-------------------\nGetting top news instead");
                $.ajax({
                    url: "https://newsapi.org/v1/articles?source=" + newsSource + "&sortBy=top&apiKey=0944a3e49a044c82b4f6c9473a25f0cf",
                    type: 'GET',
                    success: function(data){
                        console.log(data);
                    },
                    error: function(data) {
                        console.log(data);
                    }
                });
            }
        });
    }
    // Starts the Speech to text
    function startListening() {
        if (annyang) {
            // Let's define a command.
            var commands = {
                'hi': function () { alert('Hello'); },
                'show me the weather': function() {
                    focusWidget(2);
                    $("#weather").css('visibility', 'visible');
                },
                'show me the time': function() {
                    focusWidget(1);
                },
                'show me the map': function() {
                    focusWidget(3);
                    $("#map").css('visibility', 'visible');
                },
                /**
                Say, "Show me the most popular news of today from bloomberg"
                Say, "What is the latest news from cnbc"
                Say, "What is today's news (from buzzfeed)"
                **/
                '(what is) (what\'s) (show me) (the) (most) (:filter) (today\'s) (news) (story) (of) (today) (from) (:dataSource)': function(filter, dataSource) {
                    focusWidget(4);
                    var sortedBy = "";
                    switch (filter.toLowerCase()) {
                        case 'recent':
                            console.log("Most recent news of: " + dataSource);
                            sortedBy = 'latest';
                            break;
                        case 'today\'s':
                            console.log("Todays news of: " + dataSource);
                            sortedBy = 'latest';
                            break;
                        case 'latest':
                            console.log("Latest news of: " + dataSource);
                            sortedBy = 'latest';
                            break;
                        case 'top':
                            console.log("Top news of: " + dataSource);
                            sortedBy = 'top';
                            break;
                        case 'popular':
                            console.log("Popular news of: " + dataSource);
                            sortedBy = 'popular';
                            break;
                        default:

                    }
                    getNews(sortedBy, dataSource);
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
