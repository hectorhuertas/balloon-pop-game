var Reward = function () {
  this.image = 'reward' + randInt(0,2);
  this.lived = 0;
  this.sizeOffset = 1;
  this.animationSpeed = 0.05;
};

Reward.prototype.update = function () {
  this.lived ++;
  if (this.sizeOffset >= 1.7 || this.sizeOffset < 1) {
    this.animationSpeed = this.animationSpeed * -1.02;
  }
  this.sizeOffset = this.sizeOffset + this.animationSpeed;
};

Reward.prototype.animationFinished = function () {
  return this.lived > 75;
};

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = Reward;
