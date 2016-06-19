var Balloon = function (x,y) {
  this.centerX = x;
  this.centerY = y;
  this.x = x;
  this.y = y;
  this.image = 'balloon' + randInt(0,3);
};

Balloon.prototype.float = function () {
  var offsetLimit = 5;
  if (this.x > this.centerX + offsetLimit) {
    this.x --;
  } else if (this.x < this.centerX - offsetLimit) {
    this.x ++;
  } else {
    this.x = this.x + rand(-1,1);
  }
  if (this.y > this.centerY + offsetLimit) {
    this.y --;
  } else if (this.y < this.centerY - offsetLimit) {
    this.y ++;
  } else {
    this.y = this.y + rand(-1,1);
  }
};

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = Balloon;
