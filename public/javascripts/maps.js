function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 14
  });

  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var geolocationDiv = document.getElementById('LocateMe');
  var geolocationControl = new GeolocationControl(geolocationDiv, map);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(geolocationDiv);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = new google.maps.Marker({
    position: {lat: 0, lng: 0},
    map: map,
    draggable: true,
    icon: 'http://maps.google.com/mapfiles/kml/shapes/toilets.png'
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      markers.setPosition(pos);

      document.getElementById('inputLat').value = position.coords.latitude;
      document.getElementById('inputLong').value = position.coords.longitude;

      map.setCenter(pos);
    }, function() {
      handleLocationError(true, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
  }

  google.maps.event.addListener(markers, 'dragend', function (event) {
    document.getElementById("inputLat").value = this.getPosition().lat();
    document.getElementById("inputLong").value = this.getPosition().lng();
  });

  google.maps.event.addListener(map, 'click', function(event) {

      markers.setPosition(event.latLng);
      document.getElementById("inputLat").value = event.latLng.lat();
      document.getElementById("inputLong").value = event.latLng.lng();
  });


  searchBox.addListener('places_changed', function() {
  var places = searchBox.getPlaces();

  if (places.length == 0) {
    return;
  }

  // For each place, get the icon, name and location.
  var bounds = new google.maps.LatLngBounds();
  places.forEach(function(place) {
    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
    var latitude = place.geometry.location.lat();
    var longitude = place.geometry.location.lng();
    // Create a marker for each place.
    pos = {lat: latitude,
            lng: longitude}

    markers.setPosition(pos);
    document.getElementById("inputLat").value = latitude;
    document.getElementById("inputLong").value = longitude;
    map.setCenter(pos);
    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  });
  map.fitBounds(bounds);
});

function GeolocationControl(controlDiv, map) {
    // Set CSS for the control button
    var controlUI = document.getElementById('LocateMe')
    // Setup the click event listeners to geolocate user
    google.maps.event.addDomListener(controlUI, 'click', geolocate);
}

function geolocate() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            // Create a marker and center map on user location
            markers.setPosition(pos);
            document.getElementById("inputLat").value = position.coords.latitude;
            document.getElementById("inputLong").value = position.coords.longitude;
            map.setCenter(pos);
        });
    }
}

}


function editMap() {
  var lat = parseFloat(document.getElementById("inputLat").value)
  var long = parseFloat(document.getElementById("inputLong").value)

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: lat, lng: long},
    zoom: 14
  });

  var marker = new google.maps.Marker({
    position: {lat: lat, lng: long},
    map: map,
    draggable: true,
    icon: 'http://maps.google.com/mapfiles/kml/shapes/toilets.png'
  });

  var infoWindow = new google.maps.InfoWindow({
      content: "Hi"
  });
  infoWindow.open(map, marker);

  google.maps.event.addListener(marker, 'dragend', function (event) {
    document.getElementById("inputLat").value = this.getPosition().lat();
    document.getElementById("inputLong").value = this.getPosition().lng();
  });

}


function showMap() {
  var lat = parseFloat(document.getElementById("inputLat").value)
  var long = parseFloat(document.getElementById("inputLong").value)

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: lat, lng: long},
    zoom: 14
  });

  var marker = new google.maps.Marker({
    position: {lat: lat, lng: long},
    map: map,
    draggable: false,
    icon: 'http://maps.google.com/mapfiles/kml/shapes/toilets.png'
  });

  var infoWindow = new google.maps.InfoWindow({
      content: "Hi"
  });
  infoWindow.open(map, marker);
}
