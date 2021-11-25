// import NgwMap from "@nextgis/ngw-leaflet";
import NgwMap from "@nextgis/ngw-ol";
// import NgwMap from "@nextgis/ngw-mapbox";

const tree = document.getElementById("tree");
const ngwMap = new NgwMap({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
  osm: true,
});

// The code below is only necessary to show 
// that different adapters work the same way 
// even with such non-trivial mechanics

ngwMap.onLoad().then(() => {
  const webMapLayer = ngwMap
    .addNgwLayer({
      resource: 4355,
      fit: true,
    })
    .then((webmap) => {
      tree.appendChild(createTreeItem(webmap.layer));
    });
});

function createTreeBranch(layers) {
  const elem = document.createElement("div");
  elem.className = "tree-container__item-children";
  layers.forEach((x) => {
    if (x.item) {
      const item = createTreeItem(x);
      elem.appendChild(item);
    }
  });
  return elem;
}

function createTreeItem(layer) {
  const item = layer.item;
  const elem = document.createElement("div");
  elem.className = "tree-container__item";
  if (item.display_name) {
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    const value = item.item_type === "layer" ? item.layer_enabled : true;
    input.checked = value;

    const visibility = layer.properties.property("visibility");
    if (visibility) {
      visibility.emitter.on("change", (ev) => {
        input.checked = ev.value;
      });
      input.onclick = () => {
        visibility.set(input.checked, {
          propagation: NgwMap.keys.pressed("ctrl"),
        });
      };
    }
    elem.appendChild(input);
    const slider = createLayerOpacitySlider(layer);
    elem.appendChild(slider);

    const name = document.createElement("span");
    name.innerHTML = item.display_name;
    elem.appendChild(name);
  }

  if (
    item.item_type === "group" ||
    (item.item_type === "root" && item.children.length)
  ) {
    const children = layer.tree.getChildren();
    const treeBranch = createTreeBranch(children.reverse());
    elem.appendChild(treeBranch);
  }
  return elem;
}

function createLayerOpacitySlider(layer) {
  const wrapper = document.createElement("span");
  const slider = document.createElement("input");
  slider.style.width = "30px";
  slider.id = layer.id;
  [
    ["type", "range"],
    ["min", "0"],
    ["max", "1"],
    ["step", "0.1"],
  ].forEach((x) => slider.setAttribute(...x));
  slider.value =
    layer.options.opacity !== undefined ? layer.options.opacity : 1;

  slider.onchange = () => {
    layer.properties.set("opacity", slider.value);
  };
  wrapper.appendChild(slider);
  return wrapper;
}
