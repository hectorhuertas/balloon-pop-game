const Render = require('./render');
const env = require('./env');
const Game = require('./game');
const Listeners = require('./listeners');
let game;

function start() {
  document.getElementById('screen').style.backgroundImage = 'url("assets/bg.png")';
  document.getElementById('screen').focus();
  game = new Game();
  Listeners.for(game);
  env.currentAnimationFrame = requestAnimationFrame(gameLoop);
}

function gameLoop() {
  game.update();
  if (game.over()) {
    Render.over(game);
  } else {
    Render.game(game);
  }
  env.currentAnimationFrame = requestAnimationFrame(gameLoop);
}

module.exports = {start: start};
