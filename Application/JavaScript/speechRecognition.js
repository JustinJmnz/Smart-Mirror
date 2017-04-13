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
            // -------------------- Weather Speech Recognition --------------------
            'show me the weather': function() {
                focusWidget(2);
                $("#weather").css('visibility', 'visible');
            },
            // -------------------- Sports Speech Recognition --------------------
            'show me the time': function(city) {
                console.log("City: " + city + "\nCountry: " + country);
                focusWidget(1);
            },
            // -------------------- Map Speech Recognition --------------------
            'show me the map': function() {
                focusWidget(3);
                $("#map").css('visibility', 'visible');
            },
            // -------------------- News Speech Recognition --------------------
            // Scroll down on the article for the news
            'scroll down': function() {
                scrollOnNews(1);
            },
            // Scroll up on the article for the news
            'scroll up': function() {
                scrollOnNews(0);
            },
            // Get next article for the news
            '(go to)(next)(article)': function() {
                nextArticle();
            },
            // Get previous article for the news
            '(go to)(previous)(article)': function () {
                previousArticle();
            },
            // Get the news
            '(what is) (what\'s) (show me) (the) (most) (:filter) (today\'s) news (story) (of) (today) (from) (:dataSource)': function(filter, dataSource) {
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
            }
        };
        // Update the speech-spitter widget with command said
        annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
            var spitter = $('#speech-spitter > p');
            spitter.text(userSaid);
        });

        annyang.addCallback('resultNoMatch', function(phrases) {
            var spitter = $('#speech-spitter > p');
            spitter.text('Not a command!');
        });

        // Add our commands to annyang
        annyang.addCommands(commands);
        //https://www.talater.com/annyang/ for more examples
        // Start listening.
        annyang.start();
    }
}
