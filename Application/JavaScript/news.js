/*
File Description
----------------
About: Takes care of the news capabilities
*/

// Gets the news based on a sort condidtion and location of the data source
function getNews(sortedBy, dataSource) {
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
            case "fortune":
                newsSource = "fortune";
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
            // console.log(data);
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
                },
                error: function(data) {
                    // console.log(data);
                }
            });
        }
    });

    // Handles Response from getting the data
    function handleResponse(data){
        var sliderDiv = constructSliderHTML(data);
        slideIntoHub(sliderDiv);
    }

    // Constructs HTML based on articles given
    function constructSliderHTML(data) {
        // Diffbot is a library that will get the article text from the webpage given a url
        var client = new Diffbot('3fb1ae443ad095199938afcd79f55138');
        // If the source is CNN or CNBC then make the letters upper case, else make first character uppercase only
        var source = ((data.source).length <= 4) ? (data.source).toUpperCase(): (data.source).charAt(0).toUpperCase() + (data.source).slice(1).toLowerCase();
        // console.log("Source: " + source);
        var articles = data.articles;
        // Divs for slider
        var sliderViewer = $('<div class="slide-viewer"></div>');
        var sliderGroup = $('<div class="slide-group"></div>');
        var sliderButtons = $('<div class="slide-buttons"></div>');
        var articleUrls = [];
        // Get all the article urls
        for(var i = 0; i < articles.length; i++) {
            articleUrls[i] = articles[i].url;
        }
        // THIS IS IN A SEPERATE LOOP BECAUSE AJAX CALLS ARE TOO SLOW
        // Getting the article information (the text) from url using DiffBot library
        var slideNumber = 1;
        for(var i = 0; i < articleUrls.length; i++){
            var url = articleUrls[i];
            client.article.get({
               url: url,
               }, function onSuccess(response) {
                   console.log(response);
                   var object = response.objects[0];
                   var slide = $('<div class="slide slide-' + (slideNumber++) + '"></div>');
                   var newsContainerDiv = $('<div id="news-container"></div>');
                   var newsFirstRowDiv = $('<div class="news-firstRow"></div>');
                   var newsIconDiv = $('<div class="news-icon"></div>');
                   var image = $('<img src="' + object.images[0].url + '" height="50px width="50px"/>'); // Maybe not icon?
                   var newsTitleDiv = $('<div class="news-title"></div>');
                   var titleHeader = $('<h3>' + object.title + '</h3>');
                   var newsSecondRowDiv = $('<div class="news-secondRow"></div>');
                   var newsDescriptionDiv = $('<div class="news-description">' + object.text + '</div>');
                   // Appending image and title
                   newsIconDiv.append(image);
                   newsTitleDiv.append(titleHeader);
                   // Appending info to inner divs
                   newsFirstRowDiv.append(newsIconDiv);
                   newsFirstRowDiv.append(newsTitleDiv);
                   newsSecondRowDiv.append(newsDescriptionDiv);
                   // Appending inner divs to news container
                   newsContainerDiv.append(newsFirstRowDiv);
                   newsContainerDiv.append(newsSecondRowDiv);
                   // Append news div to the current slide
                   slide.append(newsContainerDiv);
                   // Append slide to the sliderGroup
                   sliderGroup.append(slide);
               }, function onError(response) {
                     console.log("ERROR: Error with Diffbot");
               });
        }
        sliderViewer.append(sliderGroup);
        sliderViewer.append(sliderButtons);
        return sliderViewer;
    }

}
var slideIndex = 1;
function nextArticle() {
    var hub = $('#hub');
    var slideGroup = $('.slide-group');
    var firstSlide = slideGroup.children().first();
    // Animate the articles to shrink
    var oldDimensions = shrinkArticles();
    // Remove it from first index
    var detachedSlide = firstSlide.detach();
    console.log(firstSlide);
    // Append it to the last
    slideGroup.append(detachedSlide);
    expandArticles(oldDimensions);
}

function shrinkArticles() {
    var slideGroup = $('.slide-group');
    var height = slideGroup.height(); // Save pervious dimensions of div before animating it
    var width = slideGroup.width();
    slideGroup.animate({height: 0, width: 0,}, 500);
    return [height, width]; // Return it in an array, cant return 2 values
}
function expandArticles(dimensions) {
    var slideGroup = $('.slide-group');
    // Animate it back to its original dimensions
    slideGroup.animate({height: dimensions[0], width: dimensions[1], 'margin-left':'0','margin-top':'0'});
}
