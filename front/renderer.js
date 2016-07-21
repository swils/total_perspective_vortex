// External libraries.
const THREE = require("three");


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
    autoRotate: true
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
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1.0, 10000);
  camera.position.z = 5000;

  // Perform the actual animation.
  const render = () => {
    requestAnimationFrame(render);
    if (options.autoRotate) { space.rotation.y += 0.005; }
    renderer.render(scene, camera);
  };
  render();
};


module.exports = { render };