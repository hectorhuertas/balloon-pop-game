var counter = 0;
var rested = 0;
var Game = function () {
  this.balloons = this.generateBalloons();
  this.target = {balloon: 0, x: 0, y: 0};
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
  return [
    {image: 'balloon', x: 100, y:  50, color: 4},
    {image: 'balloon', x: 100, y: 150, color: 4},
    {image: 'balloon', x: 100, y: 250, color: 4},
    {image: 'balloon', x: 300, y:  50, color: 4},
    {image: 'balloon', x: 300, y: 150, color: 4},
    {image: 'balloon', x: 300, y: 250, color: 4},
  ];
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
