const Balloon = require('./balloon');
var counter = 0;
var rested = 0;
var Game = function () {
  this.balloons = this.generateBalloons();
  this.target = {balloon: 0, x: 0, y: 0};
  console.log(this.balloons);
};

Game.prototype.update = function () {
  if (counter % 70 === 0) {
    this.target = this.newTarget();
  }
  if (this.isFiring && rested > 100) {
    console.log('fire');
    this.balloons.splice(this.target.balloon,1);
    rested = 0;
  }
  console.log(rested);
  counter ++;
  rested ++;
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

module.exports = Game;
