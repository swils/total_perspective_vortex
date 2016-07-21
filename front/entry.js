// Expose to global context (using expose-loader).
require("expose?jQuery!jquery");
require("expose?$!jquery");


// Load styling.
require("stylesheets/main.scss");


// External libraries.
const THREE = require("three");


let scene, camera, renderer, geometry, material, space;


const buildGeometry = (galaxies) => {
  geometry = new THREE.Geometry();
  _.forEach(galaxies, (galaxy) => {
    geometry.vertices.push(new THREE.Vector3(galaxy[0], galaxy[1], galaxy[2]));
  });

  return geometry;
};


const render = function () {
  requestAnimationFrame(render);

  space.rotation.y += 0.005;

  renderer.render(scene, camera);
};


const init = (galaxies) => {
  console.log(galaxies.length);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1.0, 10000);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let uniforms = {
    color: {
      type: "c",
      value: new THREE.Color(0xd0d0ff)
    }
  };
  material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    fragmentShader: "uniform vec3 color; void main() { gl_FragColor = vec4(color, 0.4); }",
    transparent: true
  });
  space = new THREE.Points(buildGeometry(galaxies), material);

  scene.add(space);

  camera.position.z = 5000;

  render();
};


const bootstrap = () => {
  const loader = require("loader");
  loader.load().then((galaxies) => { console.log(galaxies.length); });
};


window.TotalPerspectiveVortex = { bootstrap };