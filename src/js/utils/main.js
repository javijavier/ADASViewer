export function modelTransform(modelOrigin, modelAltitude, modelRotate) {
  const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
    modelOrigin,
    modelAltitude
  );

  // transformation parameters to position, rotate and scale the 3D model onto the map
  const modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    /* Since the 3D model is in real world meters, a scale transform needs to be
     * applied since the CustomLayerInterface expects units in MercatorCoordinates.
     */
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
  };

  return modelTransform;
}
export function modelTransformJSON(res) {
  var modelOrigin = new Array();
  var modelAltitude;
  var modelRotate = new Array();

  var perceivedObjects = new Array();
  for (let po = 0; po < res.numPO; po++) {
    modelOrigin.push(res.data[po].position[1]);
    modelOrigin.push(res.data[po].position[0]);
    modelAltitude = res.data[po].position[2];
    modelRotate.push(res.data[po].rotation[0]);
    modelRotate.push(res.data[po].rotation[1]);
    modelRotate.push(res.data[po].rotation[2]);

    perceivedObjects.push(
      modelTransform(modelOrigin, modelAltitude, modelRotate)
    );
    modelOrigin = [];
    modelRotate = [];
  }

  return perceivedObjects;
}

export function addObject(map, gl, gltf) {
    
  var camera = new THREE.Camera();
  var scene = new THREE.Scene();
  // create two three.js lights to illuminate the model
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 60, 0).normalize();
  scene.add(directionalLight);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff);
  directionalLight2.position.set(0, 20, 20).normalize();
  scene.add(directionalLight2);

  const directionalLight3 = new THREE.DirectionalLight(0xffffff);
  directionalLight3.position.set(0, 20, -20).normalize();
  scene.add(directionalLight3);

  // use the Mapbox GL JS map canvas for three.js
  var renderer = new THREE.WebGLRenderer({
    canvas: map.getCanvas(),
    context: gl,
    antialias: true,
  });

  renderer.autoClear = false;

  // use the three.js GLTF loader to add the 3D model to the three.js scene
  const loader = new THREE.GLTFLoader();

  scene.add(gltf.scene);
  var obj = {
    camera: camera,
    scene: scene,
    map: map,
    renderer: renderer,
  };

  return obj;
}
