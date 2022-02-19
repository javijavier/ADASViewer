
export function loadModels(map, gl) {
    var modelList = new Array();
  
    for (let i = 0; i < 3; i++) {
      // use the three.js GLTF loader to add the 3D model to the three.js scene
      const loader = new THREE.GLTFLoader();
      loader.load("src/assets/Vehicle" + i.toString() + ".gltf", (gltf) => {
  
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
  
        scene.add(gltf.scene);
        var obj = {
          camera: camera,
          scene: scene,
          map: map,
          renderer: renderer,
        };
  
        modelList.push(obj);
      });
    }
    return modelList;
}


export function addObject(gl, matrix, modelTransform, model){

    const rotationX = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(1, 0, 0),
        modelTransform.rotateX
      );
      const rotationY = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 1, 0),
        modelTransform.rotateY
      );
      const rotationZ = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 0, 1),
        modelTransform.rotateZ
      );

      const m = new THREE.Matrix4().fromArray(matrix);
      const l = new THREE.Matrix4()
        .makeTranslation(
            modelTransform.translateX,
            modelTransform.translateY,
            modelTransform.translateZ
        )
        .scale(
          new THREE.Vector3(
            modelTransform.scale,
            -modelTransform.scale,
            modelTransform.scale
          )
        )
        .multiply(rotationX)
        .multiply(rotationY)
        .multiply(rotationZ);

        model.camera.projectionMatrix = m.multiply(l);
        model.renderer.resetState();
        model.renderer.render(model.scene, model.camera);
        model.map.triggerRepaint();

}