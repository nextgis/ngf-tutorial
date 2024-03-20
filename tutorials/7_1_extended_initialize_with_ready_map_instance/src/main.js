import 'ol/ol.css';
import Map from 'ol/Map';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import NgwMap from "@nextgis/ngw-ol";

const map = new Map({
  target: 'map',
  layers: [
    new Tile({
      source: new OSM()
    })
  ],
});

const ngwMap = new NgwMap({
  baseUrl: "https://demo.nextgis.com",
  map,
});

ngwMap.addNgwLayer({
  id: "building",
  resource: 6569,
  adapter: 'IMAGE',
  adapterOptions: {
    fit: true,
  },
});
