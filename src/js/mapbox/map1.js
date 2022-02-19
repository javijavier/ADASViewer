
var lat = 43.30723;
var lon = -2.012827;

//mapboxgl.accessToken = "pk.eyJ1IjoiamF2aWphdmllciIsImEiOiJja3g5YXU5dG0wajh2Mm9vMWV2cGUwMjRyIn0.xVWm5yHpp8E-MyZpd300DQ";

var map = new mapboxgl.Map({
  container: 'map1', // container id
  style: 'https://demotiles.maplibre.org/style.json', // style URL
  center: [0, 0], // starting position [lng, lat]
  zoom: 1 // starting zoom
  });