// External libraries.
const THREE = require("three");

const TrackballControls = require("trackball_controls");


const UNIFORMS = {
  color: {
    type: "c",
    value: new THREE.Color(0xd0d0ff)
  }
};


const MATERIAL = new THREE.ShaderMaterial({
  uniforms: UNIFORMS,
  fragmentShader: "uniform vec3 color; void main() { gl_FragColor = vec4(color, 0.4); }",
  transparent: true
});


const render = (galaxies) => {
  const options = {
    autoRotate: false
  };

  // Create a renderer.
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create geometry.
  let geometry = new THREE.Geometry();
  _.forEach(galaxies, (galaxy) => {
    geometry.vertices.push(new THREE.Vector3(galaxy[0], galaxy[1], galaxy[2]));
  });

  // Build the scene.
  let space = new THREE.Points(geometry, MATERIAL);
  let scene = new THREE.Scene();
  scene.add(space);

  // Create a camera.
  let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1.0, 10000);
  camera.position.z = 500;

  // Trackball controls.
  let controls = new TrackballControls(camera);
  controls.rotateSpeed = 3.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.45;

  // Perform the actual animation.
  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    if (options.autoRotate) { space.rotation.y += 0.005; }
  };

  const render = () => {
    renderer.render(scene, camera);
  };

  controls.addEventListener('change', render);
  animate();
  render();
};


module.exports = { render };