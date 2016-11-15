$(document).ready(function () {
  $('button').click(function(event) {
    event.preventDefault();
    $.get('http://galvanize-cors-proxy.herokuapp.com/https://api.brewerydb.com/v2/beer/random?key=c2c91700d2822349080b91377047e76d&format=json', displayBeer);
  });
});
function displayBeer(result) {
  console.log(result);
}
