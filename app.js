$(document).ready(function() {
    var input = document.getElementById('address');
    var options = {

    };
    $('button').click(function(event) {
        event.preventDefault();
        var $input = $('input');
        var address = $input.val();
        $input.val('');
        $('#map').show();
        $('#locations').show();
        $.get('https://galvanize-cors-proxy.herokuapp.com/https://api.brewerydb.com/v2/beer/random?key=c2c91700d2822349080b91377047e76d&format=json', displayBeer);
        $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyB6Krk9RvBv_qAPxlab5VzP0Ybae5Skjqw', initMap)
        $.get('https://galvanize-cors-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/js?key=AIzaSyDc7bvpogNBwNN6YHrCnPgiJKoUVJC7R1g&libraries=places', initialize);
    });
    $('.brand-logo').click(function(event) {
        window.location.reload();
    })

    autocomplete = new google.maps.places.Autocomplete(input, options);
});

// to display the beer info
function displayBeer(result) {
    append(result);
    remove();
}
//
// function displayName(result) {
//     var name = result.data.nameDisplay;
//     var $h1 = $('<h1>' + name + '</h1>');
//     return $h1;
// }
//
// function description(result) {
//     var desc = result.data.style.description;
//     var $p = $('<div class="z-depth-3 description-box"><p class="desc">' + desc + '</p></div>');
//     return $p;
// }
//
// function displayImg() {
//     var $img = $('<img class="z-depth-3 result-pic" src ="https://beerhold.it/' + randomNum() + '/' + randomNum() + '"/>');
//     return $img;
// }

function append(result) {
    var $section = $('.beer-display');

    var beerCard = `<div class="row">
  <div class="beer-card col s6 offset-s3">
    <div class="card">
      <div class="card-image">
        <img class="img-responsive" src="beer-flight.jpg">
        <span class="card-title">${result.data.nameDisplay}</span>
      </div>
      <div class="card-content">
        <p>${result.data.style.description}</p>
      </div>
      <div class="card-action">
      </div>
    </div>
  </div>
</div>`;

    $section.append(beerCard);
    $('h5').html('');
    $('h5').text('Thanks for getting a beer!!');
}

function remove() {
    $('main').html('');
}

// function randomNum() {
//     var numArr = [
//         200, 300, 400, 500, 600, 700, 200, 600, 500, 300
//     ];
//     var num = Math.random();
//     num = Math.floor(num * 10);
//     return numArr[num];
//
// }
// to display the location of a liqor store near you
var geocoder;
var map;
var lng;
var lat;

function initMap(obj) {
    lat = obj.results[0].geometry.location.lat;
    lng = obj.results[0].geometry.location.lng;
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: lat,
            lng: lng
        },

        zoom: 15
    });
    return lat, lng;

}

var allPlaceName = [];
var placeType = [];
var openClosed = [];

function initialize() {
    var pyrmont = new google.maps.LatLng(lat, lng);
    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 10
    });
    var request = {
        location: pyrmont,
        radius: '1000',
        types: ['bar']
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            allPlaceName.push(place.name)
            placeType.push(place.types[0])
            openClosed.push(place.opening_hours.open_now)


            createMarker(results[i]);
        }
    }
    displayList();
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

// display a list of places and if they are open

function displayList() {
    console.log(allPlaceName, openClosed)
    for (var i = 0; i < allPlaceName.length; i++) {
        if (openClosed[i] === true) {
            $('#locations').append($(`<div id="open" class="z-depth-2">
        <li>
        ${allPlaceName[i]}
        </li>
        <div class="chip open green white-text z-depth-2">
        OPEN
        </div>
        </div>`));
        } else if (openClosed[i] === false) {
            $('#locations').append($(`<div id="closed" class="z-depth-2">
        <li>
        ${allPlaceName[i]}
        </li>
        <div class="chip closed red white-text z-depth-2">
        CLOSED
        </div>
        </div>`));
        }
    }
}
