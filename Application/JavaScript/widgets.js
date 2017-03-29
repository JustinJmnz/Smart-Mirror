/*
File Description
----------------
About: Widget features/functions go in here
*/

// Focuses or Unfocuses on a widget depending on number
function focusWidget(number) {
    // Top Section Variables
    var sectionTop = $('#section-top');
    var widgetTime = sectionTop.children().eq(0); // Check the 0th child of sectionTop Div
    var widgetWeather = sectionTop.children().eq(1);
    var widgetMap = sectionTop.children().eq(2);
    var widgetNews = sectionTop.children().eq(3);

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
    // Top Section Variables
    var sectionTop = $('#section-top');
    var widgetTime = sectionTop.children().eq(0); // Check the 0th child of sectionTop Div
    var widgetWeather = sectionTop.children().eq(1);
    var widgetMap = sectionTop.children().eq(2);
    var widgetNews = sectionTop.children().eq(3);
    widgetTime.children().first().removeClass('bump-down');
    widgetWeather.children().first().removeClass('bump-down');
    widgetMap.children().first().removeClass('bump-down');
    widgetNews.children().first().removeClass('bump-down');
}
