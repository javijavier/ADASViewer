
var lat = 43.30723;
var lon = -2.012827;

mapboxgl.accessToken = "pk.eyJ1IjoiamF2aWphdmllciIsImEiOiJja3g5YXU5dG0wajh2Mm9vMWV2cGUwMjRyIn0.xVWm5yHpp8E-MyZpd300DQ";

export const map = new mapboxgl.Map({
  container: "map2", // container ID
  style: "mapbox://styles/mapbox/dark-v10",
  center: [lon, lat], // starting position [lng, lat]
  zoom: 15, // starting zoom
  antialias: true,
});

  const customLayer = {
    id: "3d-model1",
    type: "custom",
    renderingMode: "3d",
  
    onAdd: function (map, gl) {
      this.camera = new THREE.Camera();
      this.scene = new THREE.Scene();
  
      // create two three.js lights to illuminate the model
      const directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(0, -70, 100).normalize();
      this.scene.add(directionalLight);
  
      const directionalLight2 = new THREE.DirectionalLight(0xffffff);
      directionalLight2.position.set(0, 70, 100).normalize();
      this.scene.add(directionalLight2);
  
      // use the three.js GLTF loader to add the 3D model to the three.js scene
      const loader = new THREE.GLTFLoader();
      loader.load(
        "https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf",
        (gltf) => {
          this.scene.add(gltf.scene);
        }
      );
      this.map = map;
  
      // use the Mapbox GL JS map canvas for three.js
      this.renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true,
      });
  
      this.renderer.autoClear = false;
    },
    render: function (gl, matrix) {
      //updateCameraPosition(position, altitude, target);
  
      loadJSON.then((res) => {
  
        var modelTransform = modelTransformJSON(res)
        modelTransform = modelTransform[0];
  
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
    
        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
      });
  
   
    },
  };
