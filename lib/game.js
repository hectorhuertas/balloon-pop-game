var Game = function () {
  this.balloons = this.generateBalloons();
};

Game.prototype.update = function () {

};

Game.prototype.generateBalloons = function () {
  return [
    {image: 'balloon', x: 100, y:  50, color: 4},
    {image: 'balloon', x: 100, y: 150, color: 4},
    {image: 'balloon', x: 100, y: 250, color: 4},
  ];
};


module.exports = Game;
