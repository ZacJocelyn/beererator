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
        $.get('https://galvanize-cors-proxy.herokuapp.com/https://api.brewerydb.com/v2/beer/random?key=c2c91700d2822349080b91377047e76d&format=json', displayBeer);
        $.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ address +'key=AIzaSyB6Krk9RvBv_qAPxlab5VzP0Ybae5Skjqw', initMap)
    });
        $.get('https://galvanize-cors-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/js?key=AIzaSyDc7bvpogNBwNN6YHrCnPgiJKoUVJC7R1g&libraries=places')
        autocomplete = new google.maps.places.Autocomplete(input, options);
});

// to display the beer info
function displayBeer(result) {
    append(result);
    remove();
}

function displayName(result) {
    var name = result.data.nameDisplay;
    var $h1 = $('<h1>' + name + '</h1>');
    return $h1;
}

function description(result) {
    var desc = result.data.style.description;
    var $p = $('<p>' + desc + '</p>');
    return $p;
}

function displayImg() {
    var $img = $('<img class="result-pic" src ="https://beerhold.it/' + randomNum() + '/' + randomNum() + '"/>');
    return $img;
}

function append(result) {
    var $section = $('.beer-display');
    $section.append(displayName(result), displayImg(), description(result));
    $('h5').html('');
    $('h5').text('Thanks for getting a beer!!');
}

function remove() {
    $('main').html('');
}

function randomNum() {
    var num = Math.random();
    num = Math.floor(num * 1000);
    return num.toString();
}
// to display the location of a liqor store near you
var geocoder;
var map;
function initMap(obj) {
  var lat = obj.results[0].geometry.location.lat;
  var lng = obj.results[0].geometry.location.lng;
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: lat, lng: lng},
    zoom: 15
  });
  return lat, lng;
}
