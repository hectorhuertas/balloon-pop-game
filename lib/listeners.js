const game = function (game) {
  window.addEventListener('touchstart', setFiring.bind(null, true));
  window.addEventListener('mousedown', setFiring.bind(null, true));
  window.addEventListener('keydown', setFiring.bind(null, true));
  window.addEventListener('touchend', setFiring.bind(null, false));
  window.addEventListener('mouseup', setFiring.bind(null, false));
  window.addEventListener('keyup', setFiring.bind(null, false));

  function setFiring(state,event) {
    let isKeyboard = event.type === 'keyup' || event.type === 'keydown';
    let isValid = event.keyCode === 32 || event.keyCode === 13;

    if (isKeyboard) {
      if (isValid) {
        game.isFiring = state;
      }
    } else {
      game.isFiring = state;
    }
  }
};

module.exports = {for: game};
