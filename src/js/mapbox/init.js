

var lat = 43.30723;
var lon = -2.012827;

mapboxgl.accessToken = 'pk.eyJ1IjoiamF2aWphdmllciIsImEiOiJja3p1ZnBna2sxY3M1Mm9vaGZnNm93eTdhIn0.lpPjj0MxB9J4ALvRo8ZX9g';
export  const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/javijavier/ckzok4qdm00kk14l8kepcsv6l', // stylesheet location
  center: [lon, lat], // starting position [lng, lat]
  zoom: 16, // starting zoom
  pitch: 15,
  antialising: true

});
  