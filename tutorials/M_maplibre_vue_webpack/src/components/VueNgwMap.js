import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  shallowRef,
  computed,
  nextTick,
  provide,
  watch,
  unref,
  ref,
  h,
} from "vue";
import NgwMap from "@nextgis/ngw-mapbox";

const DEFAULT_MAP_OPTIONS = {
  bounds: [-179, -90, 180, 90],
  controlsOptions: {
    ATTRIBUTION: { position: "bottom-right" },
  },
};

export default defineComponent({
  name: "VueNgwMap",

  props: {
    fullFilling: { type: Boolean, required: false },
    mapOptions: {
      type: Object,
      default: () => DEFAULT_MAP_OPTIONS,
    },
    maxBounds: { type: [Array, null] },
    bounds: {
      type: [Array, null],
    },
    center: { type: [Array, null] },
    zoom: { type: [Number, null] },
    cursor: { type: [String, null]},
    controls: {
      type: Array,
      default: () => ["ZOOM", "ATTRIBUTION"],
    },
  },

  emits: ["load", "click"],

  setup(props, { emit }) {
    const _NgwMap = NgwMap;
    const ready = ref(false);
    const target = ref(null);
    const ngwMap = shallowRef(null);
    const bounds = computed(() => props.bounds || props.mapOptions.bounds);
    const center = computed(() => props.center || props.mapOptions.center);
    const zoom = computed(() => props.zoom || props.mapOptions.zoom);

    const onCursorChange = (cursor) => {
      const wm = unref(ngwMap);
      wm && wm.setCursor(cursor || "default");
    };
    const onReady = () => {
      if (props.cursor) {
        onCursorChange(props.cursor);
      }
    };
    const addMapEventsListener = () => {
      const wm = unref(ngwMap);
      if (wm) {
        wm.emitter.on("click", (e) => {
          emit("click", e);
        });
      }
    };
    const makeWithMap = (action) => {
      const wm = unref(ngwMap);
      wm && action(wm);
    };
    const fitBounds = (b) => {
      makeWithMap((wm) => b && wm.fitBounds(b));
    };
    const setCenter = (c) => {
      makeWithMap((wm) => c && wm.setCenter(c));
    };
    const setZoom = (z) => {
      makeWithMap((wm) => z && wm.setZoom(z));
    };
    const destroy = () => {
      ready.value = false;
      if (ngwMap.value) {
        ngwMap.value.destroy();
        ngwMap.value = null;
      }
    };

    watch(() => props.cursor, onCursorChange);
    watch(() => bounds.value, fitBounds);
    watch(() => center.value, setCenter);
    watch(() => zoom.value, setZoom);
    watch(() => props.tileJson, destroy);

    onMounted(() => {
      if (!target.value) {
        return;
      }
      const props_ = {};
      let p;
      for (p in props) {
        const prop = props[p];
        if (prop !== undefined) {
          props_[p] = prop;
        }
      }
      const { mapOptions, ...mapProps } = props;
      const webMapOptions = {
        ...DEFAULT_MAP_OPTIONS,
        ...mapProps,
        target: target.value,
      };
      if (mapOptions) {
        Object.assign(webMapOptions, mapOptions);
      }
      ngwMap.value = new _NgwMap(webMapOptions);
      ngwMap.value.onLoad().then(() => {
        nextTick().then(() => {
          onReady();
          ready.value = true;
          emit("load", ngwMap);
        });
        addMapEventsListener();
      });
    });
    onBeforeUnmount(destroy);
    const renderFunction = (opt) => {
      const style = {
        zIndex: "0",
      };
      if (props.fullFilling) {
        style.width = "100%";
        style.height = "100%";
      }

      const data = {
        ref: opt.target,
        attrs: opt.attrs,
        class: "vue-ngw-map",
        style,
      };
      return opt.ready && opt.slots
        ? h("div", data, opt.slots)
        : h("div", data);
    };

    // To use webMap in layers, controls and other slots
    provide("ngwMap", ngwMap);

    return {
      renderFunction,
      ngwMap: ngwMap,
      target,
      ready,
    };
  },

  render() {
    const slots = this.$slots.default && this.$slots.default();
    return this.renderFunction({
      target: "target",
      slots,
      ready: this.ready,
      attrs: this.$attrs,
    });
  },
});
