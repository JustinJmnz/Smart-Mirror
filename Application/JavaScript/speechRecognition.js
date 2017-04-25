/*
File Description
----------------
About: Takes care of the speech to text capabilities
*/


// Starts the Speech to text
function startListening() {
    if (annyang) {
        // Let's define a command.
        var commands = {
            'hi': function () { alert('Hello'); },

            // ------------------------------------------------------------ Clock Speech Recognition ------------------------------------------------------------
            'show me the time': function(city) {
                setCurrentlyViewing("time");
                focusWidget(1);
                createClock();
            },
            'what time is it': function(city) {
                setCurrentlyViewing("time");
                focusWidget(1);
                createClock();
            },
            'what\'s the time': function(city) {
                setCurrentlyViewing("time");
                focusWidget(1);
                createClock();
            },
            // ------------------------------------------------------------ Weather Speech Recognition ------------------------------------------------------------
            'show me the weather': function() {
                setCurrentlyViewing("weather");
                getCurrentLocationForWeather = true; // Flag in weather.js
                focusWidget(2);
                getWeather("");
            },
            'get me the weather': function() {
                setCurrentlyViewing("weather");
                getCurrentLocationForWeather = true; // Flag in weather.js
                focusWidget(2);
                getWeather("");
            },
            'what\'s the weather (like)': function() {
                setCurrentlyViewing("weather");
                getCurrentLocationForWeather = true; // Flag in weather.js
                focusWidget(2);
                getWeather("");
            },
            'show me the weather for *destination': function(destination) {
                setCurrentlyViewing("weather");
                getCurrentLocationForWeather = false; // Flag in weather.js
                focusWidget(2);
                getWeather(destination);
            },
            'show me the weather in *destination': function(destination) {
                setCurrentlyViewing("weather");
                getCurrentLocationForWeather = false; // Flag in weather.js
                focusWidget(2);
                getWeather(destination);
            },
            'get me the weather in *destination': function(destination) {
                setCurrentlyViewing("weather");
                getCurrentLocationForWeather = false; // Flag in weather.js
                focusWidget(2);
                getWeather(destination);
            },
            'get me the weather for *destination': function(destination) {
                setCurrentlyViewing("weather");
                getCurrentLocationForWeather = false; // Flag in weather.js
                focusWidget(2);
                getWeather(destination);
            },
            'what\'s the weather (like) in *destination': function(destination) {
                setCurrentlyViewing("weather");
                getCurrentLocationForWeather = false; // Flag in weather.js
                focusWidget(2);
                getWeather(destination);
            },
            'what\'s the weather (like) for *destination': function(destination) {
                setCurrentlyViewing("weather");
                getCurrentLocationForWeather = false; // Flag in weather.js
                focusWidget(2);
                getWeather(destination);
            },
            // ------------------------------------------------------------ News Speech Recognition ------------------------------------------------------------
            // Get next article for the news
            '(go to)(next)(article)': function() {
                if(currentlyViewing() === "news"){
                    nextArticle();
                }
            },
            // Get previous article for the news
            '(go to)(previous)(article)': function () {
                if(currentlyViewing() === "news"){
                    previousArticle();
                }
            },
            // Get the news
            '(what is) (what\'s) (show me) (the) (most) (:filter) (today\'s) news (story) (of) (today) (from) (:dataSource)': function(filter, dataSource) {
                setCurrentlyViewing("news");
                focusWidget(4);
                var sortedBy = "";
                switch (filter) {
                    case 'recent':
                        sortedBy = 'latest';
                        break;
                    case 'today\'s':
                        sortedBy = 'latest';
                        break;
                    case 'latest':
                        sortedBy = 'latest';
                        break;
                    case 'top':
                        sortedBy = 'top';
                        break;
                    case 'popular':
                        sortedBy = 'popular';
                        break;
                    default:
                        sortedBy = 'top';
                        break;

                }
                getNews(sortedBy, dataSource);
            },
            // ------------------------------------------------------------ News AND Maps Speech Recognition ------------------------------------------------------------
            // Scroll down on the article/steps for the news OR Maps
            'scroll down': function() {
                if(currentlyViewing() === "news"){
                    scrollOnNews(1); // 1 = Scroll down
                } else if(currentlyViewing() === "maps") {
                    scrollOnMaps(1); // 1 = Scroll down
                }
            },
            // Scroll up on the article/steps for the news or Maps
            'scroll up': function() {
                if(currentlyViewing() === "news"){
                    scrollOnNews(0); // 0 = Scroll up
                } else if(currentlyViewing() === "maps") {
                    scrollOnMaps(0); // 0 = Scroll up
                }
            },
            // ------------------------------------------------------------ Map Speech Recognition ------------------------------------------------------------
            'how do I get to :destination from :source': function(destination, source) {
                setCurrentlyViewing("maps");
                directions = true; // Flag in maps.js
                getCurrentLocation = false; // Flag in maps.js
                focusWidget(3);
                showMap(destination, source);
            },
            'how do I get from :source to :destination': function(destination, source) {
                setCurrentlyViewing("maps");
                directions = true; // Flag in maps.js
                getCurrentLocation = false; // Flag in maps.js
                focusWidget(3);
                showMap(destination, source);
            },
            'navigate from :source to :destination': function(destination, source) {
                setCurrentlyViewing("maps");
                directions = true; // Flag in maps.js
                getCurrentLocation = false; // Flag in maps.js
                focusWidget(3);
                showMap(destination, source);
            },
            'navigate to :destination from :source': function(destination, source) {
                setCurrentlyViewing("maps");
                directions = true; // Flag in maps.js
                getCurrentLocation = false; // Flag in maps.js
                focusWidget(3);
                showMap(destination, source);
            },
            'show me directions from :source to :destination': function(destination, source) {
                setCurrentlyViewing("maps");
                directions = true; // Flag in maps.js
                getCurrentLocation = false; // Flag in maps.js
                focusWidget(3);
                showMap(destination, source);
            },'show me directions to :destination from :source': function(destination, source) {
                setCurrentlyViewing("maps");
                directions = true; // Flag in maps.js
                getCurrentLocation = false; // Flag in maps.js
                focusWidget(3);
                showMap(destination, source);
            },
            'show me how to get to :destination from :source': function(destination, source) {
                setCurrentlyViewing("maps");
                directions = true; // Flag in maps.js
                getCurrentLocation = false; // Flag in maps.js
                focusWidget(3);
                showMap(destination, source);
            },
            'show me how to get from :source to :destination': function(destination, source) {
                setCurrentlyViewing("maps");
                directions = true; // Flag in maps.js
                getCurrentLocation = false; // Flag in maps.js
                focusWidget(3);
                showMap(destination, source);
            },
            'how (do)(can) I get to *destination': function(destination, source) {
                setCurrentlyViewing("maps");
                directions = true; // Flag in maps.js
                getCurrentLocation = true; // Flag in maps.js
                focusWidget(3);
                showMap(destination, "");
            },
            'take me to *destination': function(destination, source) {
                setCurrentlyViewing("maps");
                directions = true; // Flag in maps.js
                getCurrentLocation = true; // Flag in maps.js
                focusWidget(3);
                showMap(destination, "");
            },
            'navigate to *destination': function(destination, source) {
                setCurrentlyViewing("maps");
                directions = true; // Flag in maps.js
                getCurrentLocation = true; // Flag in maps.js
                focusWidget(3);
                showMap(destination, "");
            },
            'where is *destination': function(destination) {
                setCurrentlyViewing("maps");
                directions = false; // Flag in maps.js
                focusWidget(3);
                showMap(destination, ""); // Pass source as blank, not used
            },
            'show me the map of *destination': function(destination) {
                setCurrentlyViewing("maps");
                directions = false; // Flag in maps.js
                focusWidget(3);
                showMap(destination, ""); // Pass source as blank, not used
            }
        };
        // Update the speech-spitter widget with command said
        annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
            spitToSpitter(userSaid);
        });

        annyang.addCallback('resultNoMatch', function(phrases) {
            spitToSpitter("Not a command!");
        });

        // Add our commands to annyang
        annyang.addCommands(commands);
        //https://www.talater.com/annyang/ for more examples
        // Start listening.
        annyang.start();
    }
}
