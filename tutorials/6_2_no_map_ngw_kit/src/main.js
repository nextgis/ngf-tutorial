const NgwConnector = require("@nextgis/ngw-connector");
const {
  fetchNgwExtent,
  fetchNgwLayerItems,
  fetchNgwLayerCount,
  fetchNgwLayerItemExtent,
} = require("@nextgis/ngw-kit");

// Define the base URL for the NextGIS Web service
const baseUrl = "https://demo.nextgis.com";

// Create a connector instance to interact with the NextGIS Web service
const connector = new NgwConnector({
  baseUrl,
});

// Fetch and log the geographic extent of a specific resource by its ID
fetchNgwExtent({ connector, resourceId: 4224, cache: true }).then((extent) => {
  console.log(`Resource extent is ${extent}`);
});

// Fetch items from a specific resource, filtered by the name 'Okanogan County',
// and then fetch the geographic extent for the first item found
const okanoganExtent = fetchNgwLayerItems({
  connector,
  resourceId: 4224,
  filters: [["NAME", "eq", "Okanogan County"]],
  geom: false,
  fields: ["NAME"],
  limit: 1,
})
  .then((res) => {
    const r = res[0];
    if (r) {
      // Fetch the extent of the item if it is found
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

// Log the geographic extent of Okanogan County
okanoganExtent.then((extent) => {
  console.log(`Okanogan boundary is ${extent}`);
});

// Fetch the total count of items in a specific resource and then fetch items
// based on complex filters, logging the percentage of items that match the filters
fetchNgwLayerCount({ connector, resourceId: 1733 }).then((total) => {
  return fetchNgwLayerItems({
    connector,
    resourceId: 1733,
    limit: Infinity,
    filters: [
      // Complex filters combining various conditions
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
      `Cafe found by filter: ${len} (${Math.round((len / total) * 100)}%)`,
    );
  });
});
