// Expose to global context (using expose-loader).
require("expose?jQuery!jquery");
require("expose?$!jquery");


// Load styling.
require("stylesheets/main.scss");


// External libraries.
const three = require("three");


// Local modules.
const galaxies = require('galaxies.js');


let scene, camera, renderer, geometry, material, space;


const buildGeometry = (galaxies) => {
  geometry = new three.Geometry();
  _.forEach(galaxies, ({ x, y, z }) => {
    geometry.vertices.push(new three.Vector3(x, y, z));
  });
  return geometry;
};


const render = function () {
  requestAnimationFrame(render);

  space.rotation.y += 0.005;

  renderer.render(scene, camera);
};


const init = () => {
  scene = new three.Scene();
  camera = new three.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1.0, 10000);

  renderer = new three.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  material = new three.PointsMaterial({
    color: 0xf0f0f0,
    size: 0.5
  });
  space = new three.Points(buildGeometry(galaxies), material);

  scene.add(space);

  camera.position.z = 5000;

  render();
};


window.TotalPerspectiveVortex = { init };