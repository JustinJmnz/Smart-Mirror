/*
File Description
----------------
About: Everything about animations on the main page go here
*/

// Removes everything from #hub
function removeHubContents() {
    var hub = $('#hub');
    hub.children().each(function() {
        $(this).css('visibility', 'collapse');
    });
}
