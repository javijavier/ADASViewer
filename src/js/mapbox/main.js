import loadJSON from "../jsonLoader/main.js";
import { map1, map2 } from "./init.js";

import { addObject, modelTransformJSON } from "../utils/main.js";

const THREE = window.THREE;

// configuration of the custom layer for a 3D model per the CustomLayerInterface

var modelTransform;
var modelList = new Array();

loadJSON.then((res) => {
  modelTransform = modelTransformJSON(res);
});

const customLayer = {
  id: "3d-model",
  type: "custom",
  renderingMode: "3d",

  onAdd: function (map, gl) {
    for (let i = 0; i < 3; i++) {
        
      // use the three.js GLTF loader to add the 3D model to the three.js scene
      const loader = new THREE.GLTFLoader();
      loader.load("src/assets/Vehicle" +  i.toString() + ".gltf", (gltf) => {
        modelList.push(addObject(map, gl, gltf));

      });
  
    }
  },
  render: function (gl, matrix) {
    //updateCameraPosition(position, altitude, target);
    for (var i = 0; i < modelTransform.length; i++) {
      const rotationX = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(1, 0, 0),
        modelTransform[i].rotateX
      );
      const rotationY = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 1, 0),
        modelTransform[i].rotateY
      );
      const rotationZ = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 0, 1),
        modelTransform[i].rotateZ
      );

      const m = new THREE.Matrix4().fromArray(matrix);
      const l = new THREE.Matrix4()
        .makeTranslation(
          modelTransform[i].translateX,
          modelTransform[i].translateY,
          modelTransform[i].translateZ
        )
        .scale(
          new THREE.Vector3(
            modelTransform[i].scale,
            -modelTransform[i].scale,
            modelTransform[i].scale
          )
        )
        .multiply(rotationX)
        .multiply(rotationY)
        .multiply(rotationZ);
      
        console.log(modelList)

      modelList[i].camera.projectionMatrix = m.multiply(l);
      modelList[i].renderer.resetState();
      modelList[i].renderer.render(modelList[i].scene, modelList[i].camera);
      modelList[i].map.triggerRepaint();
    }
  },
};

function updateCameraPosition(position, altitude, target) {
  const camera = map1.getFreeCameraOptions();

  camera.position = mapboxgl.MercatorCoordinate.fromLngLat(position, altitude);
  camera.lookAtPoint(target);

  map1.setFreeCameraOptions(camera);
}

map1.on("style.load", () => {
  map1.addLayer(customLayer, "waterway-label");
});
