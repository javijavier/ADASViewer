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

export function loadDataFromJSON(res) {
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

    var po_data = {
      uuid: res.data[po].uuid,
      type: res.data[po].type,
      pose: modelTransform(modelOrigin, modelAltitude, modelRotate)
    }    
    perceivedObjects.push(po_data);

    modelOrigin = [];
    modelRotate = [];
  }

  return perceivedObjects;
}


