// import NgwMap from "@nextgis/ngw-leaflet";
import NgwMap from "@nextgis/ngw-ol";
// import NgwMap from "@nextgis/ngw-maplibre-gl";

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
  ngwMap
    .addNgwLayer({
      resource: 6245,
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
  const sliderWrapper = document.createElement("span");
  const opacitySlider = document.createElement("input");

  opacitySlider.style.width = "100px";
  opacitySlider.id = String(layer.id);
  opacitySlider.type = "range";
  opacitySlider.min = "0";
  opacitySlider.max = "1";
  opacitySlider.step = "0.1";

  const initialOpacity =
    layer.options.opacity !== undefined ? layer.options.opacity : 1;
  opacitySlider.value = String(initialOpacity);

  opacitySlider.addEventListener("change", () => {
    layer.properties.set("opacity", opacitySlider.value);
  });

  sliderWrapper.appendChild(opacitySlider);
  return sliderWrapper;
}
