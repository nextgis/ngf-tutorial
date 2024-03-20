import NgwMap from "@nextgis/ngw-leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

const bounds = [-58.39, -34.6, -58.36, -34.61];
NgwMap.create({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
  osm: true,
  bounds,
}).then((ngwMap) => {
  ngwMap.mapAdapter.map.pm.addControls({
    position: "topleft",
    drawCircle: false,
  });
});

//============ LEAFLET ONLY ============//

// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import "@geoman-io/leaflet-geoman-free";
// import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

// const map = L.map('map').setView([51.505, -0.09], 13);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// map.pm.addControls({
//   position: "topleft",
//   drawCircle: false,
// });