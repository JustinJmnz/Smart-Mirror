/*
File Description
----------------
About: Maps file, this file contains everything about the maps
*/

var directions = false; // This is set in speechRecognition.js as a flag to show directions or not
var getCurrentLocation = false; // This is set in speechRecognition.js as a flag to get current location or not
var coordinates = [0, 0, 0, 0]; // Lat and Long of: First two [0, 0] = first location -> Second two [0, 0] = second location
var zoomDestination = ""; // Used to set the zoom is desired location is a specific address or generic city
// main function that starts the map feature
function showMap(destination, source) {
    zoomDestination = destination;
    toggleOverlay();
    removeHubContents();
    if(directions === true && getCurrentLocation === false) { // Show directions only from Point A to Point B
        createMapDiv();
        getTwoLatLong(destination, source);
    } else if(directions === true && getCurrentLocation === true) { // Show me directions only from current location to Point B
        createMapDiv();
        getCurrentLatLong(destination);
    } else { // Show me a generic map
        getOneLatLong(destination); // Stored as [lat, long]
    }
}

// Event fired once we are done getting the geocode coordinates
$(window).off('done-getting-coordinates').on('done-getting-coordinates', function() {
    if(directions === true) { // Show me directions only
        createDirectionsMap();
    } else { // Show me a generic map
        createGenericMap();
    }
    toggleOverlay();
});

// Creates a map wth directions between two points
function createDirectionsMap() {
    var mapOptions = { // Options for the controls of the map, zoom, pan, etc...
        // Need these
        center: new google.maps.LatLng(coordinates[0], coordinates[1]), // Center of map
        mapTypeId: google.maps.MapTypeId.ROADMAP, // Type of Map
        zoom: 100,
        // Extra features
        zoomControl: false,
        panControl: false,
        scaleControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
        overviewMapControl: false,
        // Style map
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'poi.business',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}, {visibility: 'off'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
    };
    var pointB = new google.maps.LatLng(coordinates[0], coordinates[1]),
    pointA = new google.maps.LatLng(coordinates[2], coordinates[3]),
    map = new google.maps.Map(document.getElementById('map-left-side'), mapOptions),
    // Instantiate a directions service.
    directionsService = new google.maps.DirectionsService,
    directionsDisplay = new google.maps.DirectionsRenderer({
      map: map
    }),
    markerA = new google.maps.Marker({
      position: pointA,
      title: "point A",
      label: "A",
      map: map
    }),
    markerB = new google.maps.Marker({
      position: pointB,
      title: "point B",
      label: "B",
      map: map
    });
    directionsService.route({
        origin: pointA,
        destination: pointB,
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          var duration = response.routes[0].legs[0].duration.text;
          var distance = response.routes[0].legs[0].distance.text;
          var steps = response.routes[0].legs[0].steps;
          $(".map-duration").children().first().text("Duration: " + duration);
          $(".map-distance").children().first().text("Distance: " + distance);
          // Creaate the steps to the destination
          constructSteps(steps);
          console.log(response);
        //   console.log(steps);
          var trafficLayer = new google.maps.TrafficLayer();
          trafficLayer.setMap(map);
        } else {
          spitToSpitter("Directions failed!");
          removeOverlay();
          removeHubContents();
          focusWidget(0);
        }
    });
  $('#hub').removeClass('hub-border-fade');
}
// Create the steps for directions and place them into .map-steps
function constructSteps(steps) {
    var stepsDiv = $("<ol class='map-step-container'></ol>");
    steps.forEach(function(step) {
        var step = $("<li>" + (step.instructions.replace(/<b>/g, "").replace(/<\/b>/g, "")) + "</li>");
        stepsDiv.append(step);
    });
    $(".map-steps").append(stepsDiv);
}
// Creates a generic map inside mapDiv with one point of interest
function createGenericMap() {
    var zoomLevel = (zoomDestination.length > 10) ? 15 : 10;
    console.log("Zoom is: " + zoomLevel);
    var mapOptions = { // Options for the controls of the map, zoom, pan, etc...
        // Need these
        center: new google.maps.LatLng(coordinates[0], coordinates[1]), // Center of map
        mapTypeId: google.maps.MapTypeId.ROADMAP, // Type of Map
        zoom: zoomLevel,
        // Extra features
        zoomControl: false,
        panControl: false,
        scaleControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
        overviewMapControl: false,
        // Style map
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'poi.business',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}, {visibility: 'off'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
    };
    var venueMap = new google.maps.Map(document.getElementById('hub'), mapOptions);
    var pinLocation = new google.maps.LatLng(coordinates[0], coordinates[1]);
    var position = new google.maps.Marker({
        position: pinLocation,
        animation: google.maps.Animation.DROP,
        map: venueMap
    });
    $('#hub').addClass('hub-border-fade');
}
// Creates the div that the map is in
function createMapDiv() {
    var hub = $('#hub');
    var mapContainerDiv = $("<div id='map-container'></div>");
    var leftSideDiv = $("<div id='map-left-side'></div>");
    var rightSideDiv = $("<div class='map-right-side'></div>");
    var mapInfo = $("<div class='map-info'></div>");
    var durationDiv = $("<div class='map-duration'><p></p></div>");
    var distanceDiv = $("<div class='map-distance'><p></p></div>");
    var stepsDiv = $("<div class='map-steps'></div>");
    mapInfo.append(durationDiv);
    mapInfo.append(distanceDiv);
    rightSideDiv.append(mapInfo);
    rightSideDiv.append(stepsDiv);
    mapContainerDiv.append(leftSideDiv);
    mapContainerDiv.append(rightSideDiv);
    // removeHubContents();
    hub.append(mapContainerDiv);
}

// Get current coordinates from current location
function getCurrentLatLong(destination) {
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            // Save my current location
            coordinates[2] = pos.lat;
            coordinates[3] = pos.lng;
            console.log(pos);
            // Get the location of my destination
            getOneLatLong(destination);
        });
    } else {
      // Browser doesn't support Geolocation
      removeOverlay();
      removeHubContents();
      focusWidget(0);
    }
}
// Get the coordinates from two addresses
function getTwoLatLong(destination, source) {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': destination }, function(results, status) { // First location
      if (status == google.maps.GeocoderStatus.OK) {
          coordinates[0] = results[0].geometry.location.lat();
          coordinates[1] = results[0].geometry.location.lng();
          geocoder.geocode( { 'address': source }, function(results, status) { // Second Location
            if (status == google.maps.GeocoderStatus.OK) {
                coordinates[2] = results[0].geometry.location.lat();
                coordinates[3] = results[0].geometry.location.lng();
                $(window).trigger('done-getting-coordinates');
            } else {
              spitToSpitter("Unrecognized Address");
              removeOverlay();
              removeHubContents();
              focusWidget(0);
            }
          });
      } else {
        spitToSpitter("Unrecognized Address");
        removeOverlay();
        removeHubContents();
        focusWidget(0);
      }
    });

}
// Gets the coordinates from one string address
function getOneLatLong(address) {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          coordinates[0] = results[0].geometry.location.lat();
          coordinates[1] = results[0].geometry.location.lng();
          $(window).trigger('done-getting-coordinates');
      } else {
        spitToSpitter("Unrecognized Address");
        removeOverlay();
        removeHubContents();
        focusWidget(0);
      }
    });
}
// Scroll up or down on .map-steps
function scrollOnMaps(upOrDown) { // If (upOrDown === 0) ? scroll up : scroll down;
    var mapSteps = $("#hub").children().first().children().last().children().last(); // lol
    if($("#hub").find('.map-steps').children().first().children().length > 0) { // Check if there are any articles even available
        if(upOrDown === 0) { // Scroll Up
            var newPos = mapSteps.scrollTop() - 250;
            mapSteps.animate({ scrollTop: newPos }, 1000);
        } else { // Scroll down
            var newPos = mapSteps.scrollTop() + 250;
            mapSteps.animate({ scrollTop: newPos }, 1000);
        }
    }
}
