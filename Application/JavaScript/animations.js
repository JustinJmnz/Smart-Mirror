/*
File Description
----------------
About: Everything about animations on the main page go here
*/

// Slides any HTML object into the hub by animations
function slideIntoHub(object) {
    var hubWidth = $('#hub').width();
    var hubHeight = $('#hub').height();
    removeHubContents();
    object.css({'height' : '0', 'margin-left':'250px','margin-top':'100px'});
    object.appendTo('#hub');
    object.animate({width: hubWidth, height: hubHeight, 'margin-left':'0','margin-top':'0'}, 500);

}
// Removes everything from #hub
function removeHubContents() {
    var hub = $('#hub');
    hub.removeClass('hub-border-fade');
    hub.children().each(function() {
        $(this).animate({height: 0}, 500).promise().done(function() {
            $(this).remove();
        });
    });
}
var micPaused = true;
function toggleOverlay() {
    // console.log("overlay");
    // event.preventDefault();
    if(micPaused === false) { // If the mic is un-paused, pause listening
        annyang.pause();
        micPaused = true;
    } else { // Else resume listening
        annyang.resume();
        micPaused = false;
    }
    $('.overlay').fadeToggle("fast");
}
// Resets Smart Mirror to original state
function removeOverlay() {
    if($('.overlay').css('display') !== 'none') { // If the overlay is visible, remove it
        $('.overlay').css({'display' : 'none'});
    }
}
