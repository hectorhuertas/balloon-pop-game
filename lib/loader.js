const sources = require('./sources');
const Render = require('./render');
const env = require('./env');
const GameSetup = require('./gameSetup');

var balloons = [];
var balloonImage;
var assetsNumber = countAssets();
var loadedAssets = 0;

var start = function () {
  loadAssets();

  balloonImage = new Image();
  balloonImage.onload = startLoaderAnimation;
  balloonImage.src = sources.balloon;
};

var loadAssets = function () {
  for (var name in sources) {
    env.images[name] = new Image();
    env.images[name].onload = function () {
      if (++loadedAssets === assetsNumber) { onLoadingComplete(); }
    };
    env.images[name].src = sources[name];
  }
};

var onLoadingComplete = function () {
  setTimeout(function () {
    cancelAnimationFrame(env.currentAnimationFrame);
    GameSetup.start();
  }, 10);
};

var startLoaderAnimation = function () {
  balloons.push({ image: balloonImage, x:  50, y: 450, speed: 6 });
  balloons.push({ image: balloonImage, x: 250, y: 300, speed: 2 });
  balloons.push({ image: balloonImage, x: 500, y: 130, speed: 3 });
  env.currentAnimationFrame = requestAnimationFrame(loaderLoop);
};

var loaderLoop = function () {
  loaderUpdate();
  Render.loader(balloons, loadedAssets / assetsNumber);
  env.currentAnimationFrame = requestAnimationFrame(loaderLoop);
};

var loaderUpdate = function () {
  balloons.forEach(function (balloon) {
    if (balloon.y <= -100) { balloon.y = 650; }
    balloon.y = balloon.y - balloon.speed;
  });
};

function countAssets () {
  var count = 0;
  for (var name in sources) { count ++; }
  return count;
}

module.exports = {start: start};
