import NgwMap from "@nextgis/ngw-leaflet";

NgwMap.create({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
}).then((ngwMap) => {
  Promise.all([
    ngwMap.addBaseLayer("OSM"),
    ngwMap.addBaseLayer("QMS", { qmsId: 529 }),
  ]).then(() => {
    console.log(ngwMap.getBaseLayers());
    console.log(ngwMap.getActiveBaseLayer());

    const switchBaselayerControl = ngwMap.createButtonControl({
      html: ">>",
      title: "Switch baselayer",
      onClick: () => {
        const activeBaseLayer = ngwMap.getActiveBaseLayer();
        const baseLayers = ngwMap.getBaseLayersIds();
        const index = baseLayers.indexOf(activeBaseLayer.id);
        const nextBaseLayer = baseLayers[(index + 1) % baseLayers.length];
        ngwMap.showLayer(nextBaseLayer);
      },
    });
    ngwMap.addControl(switchBaselayerControl, "top-left");
  });
});
