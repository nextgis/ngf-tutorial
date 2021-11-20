import NgwMap from "@nextgis/ngw-leaflet";
import { fetchNgwLayerFeatures } from "@nextgis/ngw-kit";

const bounds = [37.65972, 55.7299, 37.66735, 55.73278];

const createCustomAdapter = (ngwMap) => {
  return class CustomAdapter extends ngwMap.mapAdapter.layerAdapters.GEOJSON {
    addLayer(options) {
      const { resourceId, ...opt } = options;

      this.updateLayerData = () => {
        const intersects = ngwMap.getBounds();
        return fetchNgwLayerFeatures({
          resourceId,
          connector: ngwMap.connector,
          intersects,
        }).then((geojson) => {
          console.log('Added features: ' + geojson.length)
          this.setData(geojson);
        });
      };
      this.updateLayerData();
      ngwMap.emitter.on("moveend", this.updateLayerData);
      return super.addLayer(opt);
    }

    beforeRemove() {
      ngwMap.emitter.off("moveend", this.updateLayerData);
    }
  };
};

NgwMap.create({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
  osm: true,
  bounds,
}).then((ngwMap) => {
  ngwMap.addLayer(createCustomAdapter(ngwMap), { resourceId: 5300 });
});
