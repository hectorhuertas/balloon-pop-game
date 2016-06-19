const Balloon = require('./balloon');
var counter = 0;
var timeSinceFired = 0;
var Game = function () {
  this.balloons = this.generateBalloons();
  this.target = this.newTarget();
};

Game.prototype.update = function () {
  if (counter % 20 === 0) { this.updateBalloons(); }
  if (counter % 70 === 0) { this.target = this.newTarget(); }
  if (this.isFiring && timeSinceFired > 100) {
    this.balloons.splice(this.target.balloon,1);
    timeSinceFired = 0;
  }
  counter ++;
  timeSinceFired ++;
};

Game.prototype.generateBalloons = function () {
  var balloons = [];
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 3; j++) {
      balloons.push(new Balloon(60 + 150 * i, 50 + 100 * j));
    }
  }
  return balloons;
};

Game.prototype.newTarget = function () {
  var balloon =  Math.floor(Math.random()*this.balloons.length);
  return {
    balloon: balloon,
    x: this.balloons[balloon].x,
    y: this.balloons[balloon].y
  };
};

Game.prototype.updateBalloons = function () {
  this.balloons.forEach(function (balloon) {
    balloon.float();
  });
};

module.exports = Game;
