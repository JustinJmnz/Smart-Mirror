/*
File Description
----------------
About: Everything about animations on the main page go here
*/

// Slides any HTML object into the hub by animations
function slideIntoHub(object) {
    removeHubContents();
    var hubWidth = $('#hub').width();
    var hubHeight = $('#hub').height();
    object.css({'height' : '0', 'width' : '0', 'margin-left':'250px','margin-top':'100px'});
    object.appendTo('#hub');
    object.animate({width: hubWidth, height: hubHeight, 'margin-left':'0','margin-top':'0'}, 500);

}
// Removes everything from #hub
function removeHubContents() {
    var hub = $('#hub');
    hub.children().each(function() {
        $(this).animate({width: 0, height: 0}, 500, function() {
            $(this).detach();
        });
    });
}
