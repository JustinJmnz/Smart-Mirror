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
            'show me the weather': function() {
                focusWidget(2);
                $("#weather").css('visibility', 'visible');
            },
            '(what)(time is it)(is)(what\'s)(show me)(the time)(in)(:city)': function(city) {
                console.log("City: " + city + "\nCountry: " + country);
                focusWidget(1);
            },
            'show me the map': function() {
                focusWidget(3);
                $("#map").css('visibility', 'visible');
            },
            '(go to)(next)(article)': function() {
                nextArticle();
            },
            '(go to)(previous)(article)': function () {
                previousArticle();
            },
            // Get the news
            '(what is) (what\'s) (show me) (the) (most) (:filter) (today\'s) news (story) (of) (today) (from) (:dataSource)': function(filter, dataSource) {
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
