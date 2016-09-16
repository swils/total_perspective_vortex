const GALAXIES = 2274081;
const SIZE = 10000;


const load = () => {
  let deferred = $.Deferred();
  let allGalaxies = [ ];
  let first = 0;

  let $content = $("#content");
  $content.html('<div class="loader"></div>');
  let $loader = $(".loader");

  const finish = () => {
    $content.empty();
    deferred.resolve(allGalaxies);
  };

  const process = ({ galaxies }) => {
    allGalaxies = allGalaxies.concat(galaxies);
    first += SIZE;
    if (first >= GALAXIES) {
      finish();
    } else {
      setTimeout(next, 0);
    }
  };

  const next = () => {
    let pct = (100.0 * first / GALAXIES).toFixed(2);
    let progress =
        `<div class="tpv-loader">
          <div class="tpv-title">Loading galaxies...</div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" style="width: ${pct}%;">
            </div>
          </div>
        </div>`;
    $loader.html(progress);

    $.get('/galaxies', { first: first, size: SIZE }).done(process);
  };

  next();

  return deferred.promise();
};


module.exports = { load };