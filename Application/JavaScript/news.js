/*
File Description
----------------
About: Takes care of the news capabilities
*/
// For nextArticle() and previousArticle()
var currentArticle = 0;

// Gets the news based on a sort condidtion and location of the data source
function getNews(sortedBy, dataSource) {
    toggleOverlay();
    var newsSource = "";
    if(dataSource != undefined){
        switch (dataSource.toLowerCase()) { // Add new news outlits here. Look here for available news sources with their api name https://newsapi.org/sources
            case "cnn":
                newsSource = "cnn";
                break;
            case "cnbc":
                newsSource = "cnbc";
                break;
            case "bloomberg":
                newsSource = "bloomberg";
                break;
            case "bbc":
                newsSource = "bbc-news";
                break;
            case "espn":
                newsSource = "espn";
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
            handleResponse(data);
        },
        error: function(data) { // Something went wrong, probably source itsn't filterable by value of sortedBy
            console.log(data.responseJSON.message + "\n-------------------\nGetting top news instead");
            $.ajax({
                url: "https://newsapi.org/v1/articles?source=" + newsSource + "&sortBy=top&apiKey=0944a3e49a044c82b4f6c9473a25f0cf",
                type: 'GET',
                success: function(data){
                    // console.log(data);
                     handleResponse(data);
                    // articles = constructArticlesHTML(data);
                },
                error: function(data) {
                    console.log(data);
                }
            });
        }
    });
    var sliderDiv = $('<div></div>');
    var articles = [];
    $(window).off('done-fetching-news-data').on('done-fetching-news-data', function() {
        currentArticle = 0;
        console.log('Done fetching data');
        slideIntoHub(sliderDiv);
        prepareArticles();
        toggleOverlay();
    });
    // Handles Response from getting the data
    function handleResponse(data){
        sliderDiv = sliderDiv.empty();
        sliderDiv = constructArticlesHTML(data);

        // console.log(articles);
    }
    function prepareArticles() {
        var articles = $('.news-articles');
        var child = 0;
        articles.children().each(function () {
            if(child === 0) {
                $(this).css({'display' : 'block'});
            } else {
                $(this).css({'display' : 'none'});
            }
            child++;
        });
        child = 0;
    }
    var articleNumber = 0;
    // Constructs HTML based on articles given, places them in an []
    function constructArticlesHTML(data) {
        // Diffbot is a library that will get the article text from the webpage given a url
        var client = new Diffbot('3fb1ae443ad095199938afcd79f55138');
        // If the source is CNN or CNBC then make the letters upper case, else make first character uppercase only
        var source = ((data.source).length <= 4) ? (data.source).toUpperCase(): (data.source).charAt(0).toUpperCase() + (data.source).slice(1).toLowerCase();
        // console.log("Source: " + source);
        var articles = data.articles;
        // Divs for slider
        var articleUrls = [];
        // Get all the article urls
        for(var i = 0; i < articles.length; i++) {
            articleUrls[i] = articles[i].url;
        }
        var articleDiv = $('<div class="news-articles"></div>');
        // THIS IS IN A SEPERATE LOOP BECAUSE AJAX CALLS ARE TOO SLOW
        // Getting the article information (the text) from url using DiffBot library
        for(var i = 0; i < articleUrls.length; i++){
            var url = articleUrls[i];
            client.article.get({
               url: url,
               }, function onSuccess(response) {
                   var object = response.objects[0];
                   var newsContainerDiv = $('<div class="news-container"></div>');
                   var newsLeftSideDiv = $('<div class="news-leftSide"></div>');
                   var newsTitleDiv = $('<div class="news-title"></div>');
                   var newsPictureDiv = $('<div class="news-picture"></div');
                   var newsRightSideDiv = $('<div class="news-rightSide"></div>');
                   var newsTextDiv = $('<div class="news-article">' + object.text + '</div>');
                   // Check if object has an image
                   if (object.hasOwnProperty('images')){
                       if (object.images[0].hasOwnProperty('url')){
                           var image = $('<img src="' + object.images[0].url + '" height="100px" width="100px"/>');
                       }
                   } else {
                       var image = $('<img src="../../Resources/Pictures/news-icon.png" height="100px" width="100px"/>');
                   }

                   var titleHeader = $('<h3>' + object.title + '</h3>');
                   // Appending image and title
                   newsPictureDiv.append(image);
                   newsTitleDiv.append(titleHeader);
                   // Appending info to inner divs
                   newsLeftSideDiv.append(newsTitleDiv);
                   newsLeftSideDiv.append(newsPictureDiv);
                   newsRightSideDiv.append(newsTextDiv);
                   // Appending inner divs to news container
                   newsContainerDiv.append(newsLeftSideDiv);
                   newsContainerDiv.append(newsRightSideDiv);
                   // Appending each article to newsArticleDiv
                   articleDiv.append(newsContainerDiv);
                   articles.push(newsContainerDiv);
                   console.log('Article: ' + articleNumber);
                   console.log('-----------------------------------------');
                   console.log(response);
                   if(articleNumber === 9){
                       articleNumber = 0;
                       $(window).trigger('done-fetching-news-data');
                   }
                   articleNumber++;
               }, function onError(response) {
                     console.log("ERROR: Error with Diffbot");
                     console.log(response);
               });
        }
        return articleDiv;
    }

}

function nextArticle() {
    var newsArticles = $('.news-articles');
    var firstSlide = newsArticles.children().eq(currentArticle);
    currentArticle = (currentArticle === 9) ? currentArticle = 0 : currentArticle = currentArticle + 1;
    var secondSlide = newsArticles.children().eq(currentArticle);
    // Animate the articles to shrink
    var oldDimensions = shrinkArticles();
    firstSlide.css({'display' : 'none'});
    // Remove it from first index
    // var detachedSlide = firstSlide.detach();
    console.log(firstSlide);
    // Append it to the last
    //newsArticles.append(detachedSlide);
    secondSlide.css({'display' : 'block'});
    expandArticles(oldDimensions);
}

function previousArticle() {
    var newsArticles = $('.news-articles');
    var currentSlide = newsArticles.children().eq(currentArticle);
    currentArticle = (currentArticle === 0) ? currentArticle = 9 : currentArticle = currentArticle - 1;
    var nextSlide = newsArticles.children().eq(currentArticle);
    var oldDimensions = shrinkArticles();
    currentSlide.css({'display' : 'none'});
    nextSlide.css({'display' : 'block'});
    expandArticles(oldDimensions);
}

function shrinkArticles() {
    var newsArticles = $('.news-articles');
    var height = newsArticles.height(); // Save pervious dimensions of div before animating it
    var width = newsArticles.width();
    newsArticles.animate({width: 0}, 100);
    return [height, width]; // Return it in an array, cant return 2 values
}
function expandArticles(dimensions) {
    var newsArticles = $('.news-articles');
    // Animate it back to its original dimensions
    newsArticles.animate({height: dimensions[0], width: dimensions[1], 'margin-left':'0','margin-top':'0'}, 250);
}
function scrollOnNews(upOrDown) {
    var hub = $('#hub');
    if(hub.find('.news-articles').length != 0) { // Check if there are any articles even available
        var newsArticles = $('.news-articles');
        var current = newsArticles.children().eq(currentArticle);
        var article = current.children().last();
        console.log("Scrolling on");
        console.log(article);
        if(upOrDown === 0) { // Scroll up
            console.log("scrolling up");
            var newPos = article.scrollTop() - 250;
            article.animate({ scrollTop: newPos }, 1000);
        } else if(upOrDown === 1) { // Scroll down
            console.log("scrolling down");
            var newPos = article.scrollTop() + 250;
            article.animate({ scrollTop: newPos }, 1000);
        }
    } else {
        console.error('No articles available (Did you forget to say, "Show me the news"?)');
    }
}
