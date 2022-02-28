import loadJSON from "../jsonLoader/main.js";
import mqqtClient, { mqqtReceived } from "../mqtt/main.js";

import { map } from "./init.js";

import { loadDataFromJSON } from "../utils/main.js";
import { loadModels, addObject } from "./utils.js";
import { getLocation } from "../location/main.js";

const THREE = window.THREE;

// configuration of the custom layer for a 3D model per the CustomLayerInterface

var sceneData;
var modelList = null;

var client = mqqtClient();

loadJSON.then((res) => {
  sceneData = loadDataFromJSON(res);
});

getLocation();


map.addControl(

  new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    language: 'es',
  }),
  'top-left'
);

const customLayer = {
  id: "3d-model",
  type: "custom",
  renderingMode: "3d",

  onAdd: function (map, gl) {
    modelList = loadModels(map, gl);
  },

  render: function (gl, matrix) {
    client.publish("data", JSON.stringify(sceneData));
    var mqttData = mqqtReceived();

    if (mqttData) {
      for (var i = 0; i < mqttData.length; i++) {
        addObject(gl, matrix, mqttData[i].pose, modelList[mqttData[i].type]);
      }
    }
  },
};


map.on("style.load", () => {

  const layers = map.getStyle().layers;
  const labelLayerId = layers.find(
    (layer) => layer.type === "symbol" && layer.layout["text-field"]
  ).id;
  map.addLayer(customLayer, labelLayerId);

});

