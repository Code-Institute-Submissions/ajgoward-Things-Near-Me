/*----these are the variables that will be used to call the map and get the user location and also show a info window 
i recievd this code from https://codelabs.developers.google.com/codelabs/google-maps-nearby-search-js/#0  which is a 
tutorial on business search---*/

let pos;
let map;
let bounds;
let infoWindow;
let currentInfoWindow;
let service;
let infoPane;
/*----function to call the map from the api ---*/
function initMap() {
    bounds = new google.maps.LatLngBounds();
    infoWindow = new google.maps.InfoWindow;
    currentInfoWindow = infoWindow;
    /*----this adds a sidebar---*/
    infoPane = document.getElementById('panel');
    /*----this will get the users location and zoom in---*/
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map = new google.maps.Map(document.getElementById('map'), {
                center: pos,
                zoom: 10
            });
            bounds.extend(pos);

            infoWindow.setPosition(pos);
            /*---this tells the user where they are on the map--*/
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
            /*----these are listeners for my place search functions---*/
            cafes(pos);
            restaurants(pos);
            parks(pos);
            
            bar(pos);

        }, () => {
            handleLocationError(true, infoWindow);
        });
    } else {
        handleLocationError(false, infoWindow);
    }
}

function handleLocationError(browserHasGeolocation, infoWindow) {
    /*---this sets the default location to manchetser if the user doesnt allow location--*/
    pos = { lat: 53.4808, lng: 2.2426 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15
    });
    /*---if the user doesnt allow location this message will be displayed on the map--*/
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Geolocation permissions denied. Using default location.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
    currentInfoWindow = infoWindow;
    /*----this is my listener for my autocomplete search function---*/

    autocomplete();
}

// this is the autocomplete function for the search bar i recieved this code from https://developers.google.com/maps/documentation/javascript/examples/places-searchbox//
function autocomplete() {
    var input = document.getElementById('pac-input');

    var autocomplete = new google.maps.places.Autocomplete(input);


    // Specify just the place data fields that you need.
    autocomplete.setFields(
        ['place_id', 'geometry', 'name', 'formatted_address']);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);

    var marker = new google.maps.Marker({ map: map });

    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

    autocomplete.addListener('place_changed', function () {
        infowindow.close();

        var place = autocomplete.getPlace();

        if (!place.geometry) {
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        // Set the position of the marker using the place ID and location.
        marker.setPlace({
            placeId: place.place_id,
            location: place.geometry.location
        });

        marker.setVisible(true);

        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent =
            place.formatted_address;
        infowindow.open(map, marker);
        cafes(place.geometry.location);
        restaurants(place.geometry.location);
        parks(place.geometry.location);
       
        bar(place.geometry.location);
    });
}
/*-- my place search functions, google only allows one type of place to be searched at one time , and will
       only search the last type ie 'cafe,pub,park' only park will be searched , so i got around this by creating mutiple 
       functions that search different type of places---*/
function cafes(position) {
    let request = {
        location: position,
        radius: 1000,
        type: 'cafe',
        keyword: 'dog-friendly'
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}

function restaurants(position) {
    let request = {
        location: position,
        radius: 1000,
        type: 'restaurant',
        keyword: 'dog-friendly'
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}
function bar(position) {
    let request = {
        location: position,
        radius: 1000,
        type: 'bar',
        keyword: 'dog-friendly'
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}


 
function parks(position) {
    let request = {
        location: position,
        radius: 1000,
        type: 'park',
        keyword: 'dog-friendly'
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}

/*--- this means if the place service is ok then create a marker for the results---*/
function nearbyCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMarkers(results);
    }
}

/*--- this is the function to create a marker which i have added a animation to drop which makes the marker drop
    onto the map when the page is loaded, i have also added my own custom marker (see README.md)--*/

function createMarkers(places) {
    places.forEach(place => {
        let marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name,
            animation: google.maps.Animation.DROP,
            icon: 'assets/images/icons8-doge-80 (3).png'
        });

        /*---this is listener for when the user clicks on the marker it will show the relevant info---*/
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

    map.fitBounds(bounds);
}

/*--this is the function that will create  the information ---*/
function showDetails(placeResult, marker, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        let placeInfowindow = new google.maps.InfoWindow();
        let rating = "None";
        if (placeResult.rating) rating = placeResult.rating;
        placeInfowindow.setContent('<div><strong>' + placeResult.name +
            '</strong><br>' + 'Rating: ' + rating + '</div>');
        placeInfowindow.open(marker.map, marker);
        currentInfoWindow.close();
        currentInfoWindow = placeInfowindow;
        showPanel(placeResult);
    } else {
        console.log('showDetails failed: ' + status);
    }
}

/*-this creates the elements for the information to be pushed into--*/
function showPanel(placeResult) {
    if (infoPane.classList.contains("open")) {
        infoPane.classList.remove("open");
    }
    while (infoPane.lastChild) {
        infoPane.removeChild(infoPane.lastChild);
    }
    if (placeResult.photos) {
        let firstPhoto = placeResult.photos[0];
        let photo = document.createElement('img');
        photo.classList.add('hero');
        photo.src = firstPhoto.getUrl();
        infoPane.appendChild(photo);
    }
    let name = document.createElement('h1');
    name.classList.add('place');
    name.textContent = placeResult.name;
    infoPane.appendChild(name);
    if (placeResult.rating) {
        let rating = document.createElement('p');
        rating.classList.add('details');
        rating.textContent = `Rating: ${placeResult.rating} \u272e`;
        infoPane.appendChild(rating);
    }
    let address = document.createElement('p');
    address.classList.add('details');
    address.textContent = placeResult.formatted_address;
    infoPane.appendChild(address);
    if (placeResult.website) {
        let websitePara = document.createElement('p');
        let websiteLink = document.createElement('a');
        let websiteUrl = document.createTextNode(placeResult.website);
        websiteLink.appendChild(websiteUrl);
        websiteLink.title = placeResult.website;
        websiteLink.href = placeResult.website;
        websitePara.appendChild(websiteLink);
        infoPane.appendChild(websitePara);
    }
    infoPane.classList.add("open");
}   