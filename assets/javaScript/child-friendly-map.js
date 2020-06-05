let pos;
    let map;
     let bounds;
    let infoWindow;
    let currentInfoWindow;
    let service;
    let infoPane;
    
    function initMap() {
       bounds = new google.maps.LatLngBounds();
      infoWindow = new google.maps.InfoWindow;
      currentInfoWindow = infoWindow;

      infoPane = document.getElementById('panel');

       if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map = new google.maps.Map(document.getElementById('map'), {
            center: pos,
            zoom: 15
          });
          bounds.extend(pos);

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          infoWindow.open(map);
          map.setCenter(pos);
          
         }, () => {
             handleLocationError(true, infoWindow);
        });
      } else {
          handleLocationError(false, infoWindow);
      }
}

         function handleLocationError(browserHasGeolocation, infoWindow) {
              pos = {lat: -33.856, lng: 151.215};
      map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15
      });

      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Geolocation permissions denied. Using default location.' :
        'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
      currentInfoWindow = infoWindow;
    
    }