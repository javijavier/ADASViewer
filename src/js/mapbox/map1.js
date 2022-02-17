
var lat = 43.30723;
var lon = -2.012827;

mapboxgl.accessToken = "pk.eyJ1IjoiamF2aWphdmllciIsImEiOiJja3g5YXU5dG0wajh2Mm9vMWV2cGUwMjRyIn0.xVWm5yHpp8E-MyZpd300DQ";

export const map1 = new mapboxgl.Map({
    container: "map1", // container ID
    style: "mapbox://styles/javijavier/ckzok4qdm00kk14l8kepcsv6l", // style URL
    center: [lon, lat], // starting position [lng, lat]
    zoom: 19, // starting zoom
    pitch: 60,
    antialias: true,
  });

