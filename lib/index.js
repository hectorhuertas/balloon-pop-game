const screen = document.getElementById('screen').getContext('2d');
const sources = require('./sources')
window.onload = startLoader;
var currentAnimationFrame;

var balloon;
function startLoader() {
  var balloonImage = new Image();
  balloonImage.onload = function () {
    balloon = { image: balloonImage, x: 50, y: 400 };
    currentAnimationFrame = requestAnimationFrame(loaderLoop);
  };

  balloonImage.src = sources.balloon;

  var assetsNumber = countAssets();
  var loadedAssets = 0;
  var images = {};

  for (var name in sources) {
    images[name] = new Image();
    images[name].onload = function () {
      if (++loadedAssets === assetsNumber) {
        screen.drawImage(images.reward, 500, 50, 100, 130);
        setTimeout(function () { cancelAnimationFrame(currentAnimationFrame); }, 1000);
      }
    };
    images[name].src = sources[name];
  }
}

function startLoaderAnimation() {

}

function loaderUpdate() {
  if (balloon.y <= -100) {
    balloon.y = 650;
  }
  balloon.y = balloon.y - 5;

}

function loaderLoop() {
  loaderUpdate();
  renderloader();
  currentAnimationFrame = requestAnimationFrame(loaderLoop);
}

function renderloader() {
  // screen.clearRect(0,0,640,480);

  screen.font = "50px Arial";
  screen.fillStyle = 'black';
  screen.fillText("Balloon Pop",180,150);
  screen.rect(170,200,300,50);
  screen.stroke();
  screen.fillRect(170,200,150,50);
  screen.font = "30px Arial";
  screen.fillStyle = 'white';
  screen.fillText("100 %",280,235);

  screen.drawImage(balloon.image, balloon.x, balloon.y, 100, 130);
}

function countAssets() {
  var count = 0;
  for (var name in sources) { count ++; }
  return count;
}

function random(max) {
  return Math.floor(Math.random() * (max + 1));
}
