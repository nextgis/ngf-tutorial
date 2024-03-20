<template>
  <VueNgwMap :mapOptions="mapOptions" @load="onMapLoad" fullFilling/>
</template>

<script>
import { defineComponent, ref } from "vue";
import VueNgwMap from "./components/VueNgwMap";

export default defineComponent({
  components: { VueNgwMap },
  setup() {
    const mapOptions = ref({
      baseUrl: "https://demo.nextgis.com",
      osm: true,
      center: [-87.6355, 41.8818],
      minZoom: 17,
    });

    const onMapLoad = (ngwMap) => {
      ngwMap.value.addNgwLayer({
        resource: 6101,
        adapter: "MVT",
        adapterOptions: {
          selectable: true,
          selectedPaint: {
            "fill-color": "black",
            "fill-opacity": 1,
          },
          paint: {
            "fill-color": [
              "case",
              [
                "all",
                ["!=", ["get", "BUILDING"], "commercial"],
                ["!=", ["get", "BUILDING"], "train_station"],
                ["!=", ["get", "BUILDING"], "industrial"],
              ],
              "#ba0003",
              "#177771",
            ],
            "fill-opacity": [
              "case",
              ["==", ["get", "BUILDING"], "commercial"],
              0,
              0.7,
            ],
            "fill-outline-color": "black",
          },
          // Set this parameter to use native Maplibre-gl-js style for both paint and selected paint
          nativePaint: true,
        },
      });
    };
    return { mapOptions, onMapLoad };
  },
});
</script>

<style>
html,
body,
#app,
.ngw-map-container {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
