$(document).ready(function () {
  $('button').click(function(event) {
    event.preventDefault();
    $.get('http://galvanize-cors-proxy.herokuapp.com/https://api.brewerydb.com/v2/beer/random?key=c2c91700d2822349080b91377047e76d&format=json', displayBeer);
  });
});
function displayBeer(result) {
  append(result);
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

function append(result) {
  var $section = $('.beer-display');
  $section.html('');
  $section.append(displayName(result), description(result));
  $('h5').html('');
  $('h5').text('Thanks for getting a beer!!');
}
