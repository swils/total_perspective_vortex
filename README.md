# Total Perspective Vortex

Browse galaxies discovered by SDSS (Sloan Digital Sky Survey) using WebGL. Let the size of the universe blow your mind :-)

## Getting the data

The data is currently not checked into the repo as it is ~80 megabytes. Download the data from [CASJobs](http://skyserver.sdss.org/casjobs/) using something like the following query:

    SELECT p.objid, p.ra, p.dec, s.z as redshift
    FROM PhotoObj AS p
    JOIN SpecObj AS s ON s.bestobjid = p.objid
    WHERE s.class='galaxy'
    ORDER BY p.objid;
    
This gives you a raw dump of galactic coordinates (ascension, declination and red shift). Then use the script provided in `scripts/spherical_rectangular.py` to transform this data into a database than can be used by the webserver.

## Compiling the assets

The actual browser needs to be compiled using Webpack. See `webpack.config.js`.

The front end code mainly depends on Babel (ES6), Lodash, jQuery and of course `three.js`. Look at `package.json` for more details.

## Hosting

This is just a proof of concept. I have many ideas to actually host this demo online. If you want to collaborate on this, don't hesitate to contact me. 