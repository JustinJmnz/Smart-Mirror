function codeAddress() {
    geocoder = new google.maps.Geocoder();
    var address = $('#maps').text();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      var lat = "Lat: " + results[0].geometry.location.lat();
      var long = "Long: " + results[0].geometry.location.lng();
      console.log(lat);
      console.log(long);
      } else {
        console.error("Geocode was not successful for the following reason: " + status);
      }
    });
  }
