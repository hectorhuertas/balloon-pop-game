const screen = document.getElementById('screen').getContext('2d');
const env = require('./env');

var loader = function (balloons, progress) {
  screen.clearRect(0,0,640,480);

  balloons.forEach(function (balloon) {
    screen.drawImage(balloon.image, balloon.x, balloon.y, 100, 130);
  });

  screen.font = "50px Arial";
  screen.fillStyle = 'black';
  screen.fillText("Balloon Pop",180,150);
  screen.rect(170,200,300,50);
  screen.stroke();
  screen.fillRect(170,200,300 * progress,50);
  screen.font = "30px Arial";
  screen.fillStyle = 'white';
  screen.fillText("100 %",280,235);
};

var image = function(name) {
  screen.drawImage(env.images[name], 500, 50, 100, 130);
};

module.exports = {
  loader: loader,
  image: image
};
