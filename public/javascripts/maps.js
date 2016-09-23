function loadAll() {
  var lat,
    long,
    stars,
    infowindow,
    toilets,
    content
  var map = new google.maps.Map(document.getElementById('map'), {
  });
  var me = new google.maps.Marker({
    map: map
  });
  var myArray = [];
  var count = document.getElementsByName('lat').length

  for (var i = 0; i < count; i++) {
      lat = document.getElementsByName('lat')[i].innerHTML;
      long = document.getElementsByName('long')[i].innerHTML;
      stars = document.getElementsByName('stars')[i].innerHTML;
      toilets = new google.maps.Marker({
        map: map,
        icon: 'http://maps.google.com/mapfiles/kml/shapes/toilets.png',
        position: {lat: parseFloat(lat), lng: parseFloat(long)},
      })

    content =  stars
    infowindow = new google.maps.InfoWindow()
    google.maps.event.addListener(toilets,'click', (function(toilets,content,infowindow){
        return function() {
            infowindow.setContent(content);
            infowindow.open(map,toilets);
        };
    })(toilets,content,infowindow));
  }
  geoLocateMe(map, me)
}

function geoLocateMe(map, me) {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
          var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          me.setPosition(pos);
          map.setCenter(pos);
          map.setZoom(18)
          if (document.getElementById("inputLat")) {
            setPos(pos, map)
          } else {
          }
      });
  }
}

function setPos(latLng, map) {
  document.getElementById("inputLat").value = latLng.lat();
  document.getElementById("inputLong").value = latLng.lng();
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 18
  });
  var markers = new google.maps.Marker({
    position: {lat: 0, lng: 0},
    map: map,
    draggable: true,
    icon: 'http://maps.google.com/mapfiles/kml/shapes/toilets.png'
  });

  var input = document.getElementById('pac-input');
  var geolocationDiv = document.getElementById('LocateMe');
  var searchBox = new google.maps.places.SearchBox(input);
  var geolocationControl = new GeolocationControl(geolocationDiv, map);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(geolocationDiv);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  geoLocateMe(map, markers);

  google.maps.event.addListener(markers, 'dragend', function (event) {
    setPos(event.latLng, map);
  });

  google.maps.event.addListener(map, 'click', function (event) {
    markers.setPosition(event.latLng);
    setPos(event.latLng, map);
  });

  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }

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
              map.setZoom(18)
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
