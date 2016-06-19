const Balloon = require('./balloon');
const Reward = require('./reward');
var counter = 0;
var timeSinceFired = 100;
var Game = function () {
  this.balloons = this.generateBalloons();
  this.target = this.newTarget();
  this.darts = 3;
  this.rewards = this.generateRewards();
};

Game.prototype.update = function () {
  if (counter % 20 === 0) { this.updateBalloons(); }
  if (counter % 70 === 0) { this.target = this.newTarget(); }
  if (this.wonReward) {
    this.wonReward.update();
    if (this.wonReward.animationFinished()) { this.wonReward = null; }
  }
  if (this.isFiring && timeSinceFired > 100) { this.fire(); }
  counter ++;
  timeSinceFired ++;
};

Game.prototype.generateRewards = function () {
  var rewards = [];
  rewards.push(new Reward());
  rewards.push(new Reward());
  rewards.push(new Reward());
  return rewards;
};

Game.prototype.fire = function () {
  this.wonReward = this.rewards.pop();
  this.wonReward.x = this.balloons[this.target.balloon].centerX;
  this.wonReward.y = this.balloons[this.target.balloon].centerY;
  this.balloons.splice(this.target.balloon, 1);
  timeSinceFired = 0;
  this.darts --;
};

Game.prototype.over = function () {
  return this.darts <= 0 && !this.wonReward;
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
