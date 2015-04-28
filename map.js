var geocoder;
var map;
var infowindow;
var Lat=47.6097;
var Lng=-122.3331;
var zm=11;
var rad=10000;

function initialize() {
  geocoder = new google.maps.Geocoder();
  var citylocale = new google.maps.LatLng(Lat, Lng);
  var myOptions = {
    zoom: zm,
    center: citylocale,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);

  var request = {
    location: citylocale,
    radius: rad,
    types: ['electronics_store']
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

// function codeAddress() {
//   var address = document.getElementById("address").value;
//   geocoder.geocode( { 'address': address}, function(results,status){
//     if (status == google.maps.GeocoderStatus.OK) {
//       // Lat = results[0].geometry.location.lat();
//       // Lng = results[0].geometry.location.lng();
//       map.setCenter(results[0].geometry.location);
//       var marker = new google.maps.Marker({
//         map: map,
//         position: results[0].geometry.location
//       });
//     } else {
//       alert("Geocode was not successful for the following reason: " + status);
//     }
//   });

// }

function codeAddress() {
            var geocoder = new google.maps.Geocoder();
            var address = document.getElementById("address").value;
            var city = document.getElementById("city").value;
            var state = document.getElementById("state").value;
            var zip = document.getElementById("zipcode").value;
            var address_complete = address + " " + city + ", " + state + " " + zip; 
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    Lat = results[0].geometry.location.lat();
                    Lng = results[0].geometry.location.lng();
                    zm=12;
                    rad=10000;
                    initialize();
                } else {
                    alert("Request failed.")
                }
            });

          }

google.maps.event.addDomListener(window, 'load', initialize);