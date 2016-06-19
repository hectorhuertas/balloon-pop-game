const Render = require('./render');
const env = require('./env');
const Game = require('./game');
let game;

function start() {
  document.getElementById('screen').style.backgroundImage = 'url("assets/bg.png")';
  game = new Game();
  env.currentAnimationFrame = requestAnimationFrame(gameLoop);
}

function gameLoop() {
  game.update();
  Render.game(game);
}

module.exports = {start: start};
