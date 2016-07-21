// Expose to global context (using expose-loader).
require("expose?jQuery!jquery");
require("expose?$!jquery");


// Load styling.
require("stylesheets/main.scss");


const bootstrap = () => {
  const loader = require("loader");
  const renderer = require("renderer");
  loader.load().then(renderer.render);
};


window.TotalPerspectiveVortex = { bootstrap };