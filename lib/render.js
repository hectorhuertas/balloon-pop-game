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

var game = function (game) {
  screen.clearRect(0,0,640,480);

  screen.font = "14px Arial";
  screen.fillStyle = 'black';
  screen.fillText("Darts: " + game.darts,50,370);

  game.balloons.forEach(function (balloon) {
    screen.drawImage(env.images[balloon.image], balloon.x, balloon.y, 50, 65);
  });

  screen.drawImage(env.images.target, game.target.x, game.target.y, 50, 50);

  if (game.wonReward) {
    screen.drawImage(env.images[game.wonReward.image], game.wonReward.x, game.wonReward.y, 50 * game.wonReward.sizeOffset, 65 * game.wonReward.sizeOffset);
  }
};

var over = function (game) {
  screen.clearRect(0,0,640,480);

  screen.font = "50px Arial";
  screen.fillStyle = 'white';
  screen.fillText("Well done!",190,150);
  screen.font = "25px Arial";
  screen.fillText("Come back tomorrow for more prizes!!",120,200);
};

module.exports = {
  loader: loader,
  game: game,
  over: over
};
