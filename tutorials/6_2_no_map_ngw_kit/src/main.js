const NgwConnector = require("@nextgis/ngw-connector");
const {
  fetchNgwExtent,
  fetchNgwLayerItems,
  fetchNgwLayerCount,
  fetchNgwLayerItemExtent,
} = require("@nextgis/ngw-kit");

const baseUrl = "https://demo.nextgis.com";

const connector = new NgwConnector({
  baseUrl,
});

fetchNgwExtent({ connector, resourceId: 4224, cache: true }).then((extent) => {
  console.log(`Resource extent is ${extent}`);
});

const okanoganExtent = fetchNgwLayerItems({
  connector,
  resourceId: 4224,
  filters: [["NAME", "eq", "Okanogan County"]],
  geom: false,
  fields: ["NAME"],
})
  .then((res) => {
    const r = res[0];
    if (r) {
      return fetchNgwLayerItemExtent({
        connector,
        resourceId: 4224,
        featureId: r.id,
      });
    }
  })
  .catch((er) => {
    console.log(er.name);
  });

okanoganExtent.then((extent) => {
  console.log(`Okanogan boundary is ${extent}`);
});

// okanoganExtent.cancel();

fetchNgwLayerCount({ connector, resourceId: 1733 }).then((total) => {
  return fetchNgwLayerItems({
    connector,
    resourceId: 1733,
    limit: Infinity,
    filters: [
      "any",
      [
        ["AMENITY", "eq", "restaurant"],
        ["NAME", "ilike", "Subway%"],
      ],
      [
        ["AMENITY", "eq", "cafe"],
        ["any", ["NAME", "ilike", "Caribou%"], ["NAME", "ilike", "Starbucks%"]],
      ],
    ],
  }).then((cafeItems) => {
    const len = cafeItems.length;
    console.log(
      `Cafe found by filter: ${len} (${Math.round((len / total) * 100)}%)`
    );
  });
});
