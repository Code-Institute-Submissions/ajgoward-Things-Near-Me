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
            cafes(pos);
        restaurants(pos);
        parks(pos);
        museums(pos);
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
    
       cafes(pos);
        restaurants(pos);
        parks(pos);
        museums(pos);
    }

     function cafes(position) {
      let request = {
        location: position,
        rankBy: google.maps.places.RankBy.DISTANCE,
        type: 'cafe',
        keyword: ''
      };

      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, nearbyCallback);
    }

    function restaurants(position) {
      let request = {
        location: position,
        rankBy: google.maps.places.RankBy.DISTANCE,
        type: 'restaurants',
        keyword: 'dog-friendly'
      };

      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, nearbyCallback);
    }

        function museums(position) {
      let request = {
        location: position,
        rankBy: google.maps.places.RankBy.DISTANCE,
        type: 'museum',
        keyword: ''
      };

      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, nearbyCallback);
    }
     function parks(position) {
      let request = {
        location: position,
        rankBy: google.maps.places.RankBy.DISTANCE,
        type: 'park',
        keyword: 'dog-friendly'
      };

      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, nearbyCallback);
    }

    function nearbyCallback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMarkers(results);
      }
    }
    

    function createMarkers(places) {
      places.forEach(place => {
        let marker = new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: place.name,
        
        });
        google.maps.event.addListener(marker, 'click', () => {
          let request = {
            placeId: place.place_id,
            fields: ['name', 'formatted_address', 'geometry', 'rating',
              'website', 'photos']
          };

          service.getDetails(request, (placeResult, status) => {
            showDetails(placeResult, marker, status)
          });
        });

         bounds.extend(place.geometry.location);
      });

       map.fitBounds(srictbounds);
    }