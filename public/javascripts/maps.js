function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 14
  });

  var marker = new google.maps.Marker({
    position: {lat: 0, lng: 0},
    map: map,
    draggable: true,
    icon: 'http://maps.google.com/mapfiles/kml/shapes/toilets.png'
  });

  var infoWindow = new google.maps.InfoWindow({
      content: "Hi"
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      marker.setPosition(pos);

      document.getElementById('inputLat').value = position.coords.latitude;
      document.getElementById('inputLong').value = position.coords.longitude;

      map.setCenter(pos);
    }, function() {
      handleLocationError(true, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
  }
  infoWindow.open(map, marker);

  google.maps.event.addListener(marker, 'dragend', function (event) {
    document.getElementById("inputLat").value = this.getPosition().lat();
    document.getElementById("inputLong").value = this.getPosition().lng();
  });

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
