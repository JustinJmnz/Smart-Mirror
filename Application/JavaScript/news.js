/*
File Description
----------------
About: Takes care of the news capabilities
*/

// Gets the news based on a sort condidtion and location of the data source
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
            handleResponse(data);
        },
        error: function(data) { // Something went wrong, probably source itsn't filterable by value of sortedBy
            console.log(data.responseJSON.message + "\n-------------------\nGetting top news instead");
            $.ajax({
                url: "https://newsapi.org/v1/articles?source=" + newsSource + "&sortBy=top&apiKey=0944a3e49a044c82b4f6c9473a25f0cf",
                type: 'GET',
                success: function(data){
                    console.log(data);
                    handleResponse(data);
                },
                error: function(data) {
                    console.log(data);
                }
            });
        }
    });

    // Handles Response from getting the data
    function handleResponse(data){
        var sliderDiv = constructSliderHTML(data);
    }

    // Constructs HTML based on articles given
    function constructSliderHTML(data) {
        // If the source is CNN or CNBC then make the letters upper case, else make first character uppercase only
        var source = ((data.source).length <= 4) ? (data.source).toUpperCase(): (data.source).charAt(0).toUpperCase() + (data.source).slice(1).toLowerCase();
        console.log("Source: " + source);
        var articles = data.articles;
        var sliderViewer = $('<div class="slide-viewer"></div>');
        var sliderGroup = $('<div class="slide-group"></div>');
        var sliderButtons = $('<div class="slide-buttons"></div>');

        for(var i = 0; i < articles.length; i++){
            var slide = $('<div class="slide slide-' + (i + 1) + '"></div>');
            var author = articles[i].author;
            var description = articles[i].description;
            var publishedDate = articles[i].publishedAt;
            var title = articles[i].title;
            var url = articles[i].url;
            var urlToImage = articles[i].urlToImage;
        }
    }

}
