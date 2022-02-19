

var lat = 43.30723;
var lon = -2.012827;

mapboxgl.accessToken = 'pk.eyJ1IjoiamF2aWphdmllciIsImEiOiJja3g5YXU5dG0wajh2Mm9vMWV2cGUwMjRyIn0.xVWm5yHpp8E-MyZpd300DQ';
export  const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/javijavier/ckzok4qdm00kk14l8kepcsv6l', // stylesheet location
  center: [lon, lat], // starting position [lng, lat]
  zoom: 9 // starting zoom
});
  