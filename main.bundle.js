/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Loader = __webpack_require__(1);

	window.onload = Loader.start();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const sources = __webpack_require__(2);
	const Render = __webpack_require__(3);
	const env = __webpack_require__(4);
	const GameSetup = __webpack_require__(5);

	var balloons = [];
	var balloonImage;
	var assetsNumber = countAssets();
	var loadedAssets = 0;

	var start = function () {
	  loadAssets();

	  balloonImage = new Image();
	  balloonImage.onload = startLoaderAnimation;
	  balloonImage.src = sources.balloon0;
	};

	var loadAssets = function () {
	  for (var name in sources) {
	    env.images[name] = new Image();
	    env.images[name].onload = function () {
	      if (++loadedAssets === assetsNumber) {
	        onLoadingComplete();
	      }
	    };
	    env.images[name].src = sources[name];
	  }
	};

	var onLoadingComplete = function () {
	  setTimeout(function () {
	    cancelAnimationFrame(env.currentAnimationFrame);
	    GameSetup.start();
	  }, 1000);
	};

	var startLoaderAnimation = function () {
	  balloons.push({ image: balloonImage, x: 50, y: 450, speed: 6 });
	  balloons.push({ image: balloonImage, x: 250, y: 300, speed: 2 });
	  balloons.push({ image: balloonImage, x: 500, y: 130, speed: 3 });
	  env.currentAnimationFrame = requestAnimationFrame(loaderLoop);
	};

	var loaderLoop = function () {
	  loaderUpdate();
	  Render.loader(balloons, loadedAssets / assetsNumber);
	  env.currentAnimationFrame = requestAnimationFrame(loaderLoop);
	};

	var loaderUpdate = function () {
	  balloons.forEach(function (balloon) {
	    if (balloon.y <= -100) {
	      balloon.y = 650;
	    }
	    balloon.y = balloon.y - balloon.speed;
	  });
	};

	function countAssets() {
	  var count = 0;
	  for (var name in sources) {
	    count++;
	  }
	  return count;
	}

	module.exports = { start: start };

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
	  balloon0: 'assets/balloon_512w.png',
	  balloon1: 'assets/balloon_1.svg',
	  balloon2: 'assets/balloon_2.svg',
	  balloon3: 'assets/balloon_3.svg',
	  bg: 'assets/bg.png',
	  shop: 'assets/carnival_shop.png',
	  carousel: 'assets/carousel.png',
	  dart: 'assets/dart.png',
	  loader_bg: 'assets/loader_bg.png',
	  logo: 'assets/logo.png',
	  reward1: 'assets/mrQ_body.png',
	  reward2: 'assets/mrQ_hat.png',
	  mrQLeftArm: 'assets/mrQ_left_arm.png',
	  mrQRightArm: 'assets/mrQ_right_arm.png',
	  mrQ: 'assets/mrQ.png',
	  reward0: 'assets/reward.png',
	  target: 'assets/target.png'
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const screen = document.getElementById('screen').getContext('2d');
	const env = __webpack_require__(4);

	var loader = function (balloons, progress) {
	  screen.clearRect(0, 0, 640, 480);

	  balloons.forEach(function (balloon) {
	    screen.drawImage(balloon.image, balloon.x, balloon.y, 100, 130);
	  });

	  screen.font = "50px Arial";
	  screen.fillStyle = 'black';
	  screen.fillText("Balloon Pop", 180, 150);
	  screen.rect(170, 200, 300, 50);
	  screen.stroke();
	  screen.fillRect(170, 200, 300 * progress, 50);
	  screen.font = "30px Arial";
	  screen.fillStyle = 'white';
	  screen.fillText("100 %", 280, 235);
	};

	var game = function (game) {
	  screen.clearRect(0, 0, 640, 480);

	  screen.font = "14px Arial";
	  screen.fillStyle = 'black';
	  screen.fillText("Darts: " + game.darts, 50, 370);

	  game.balloons.forEach(function (balloon) {
	    screen.drawImage(env.images[balloon.image], balloon.x, balloon.y, 50, 65);
	  });

	  screen.drawImage(env.images.target, game.target.x, game.target.y, 50, 50);

	  if (game.wonReward) {
	    screen.drawImage(env.images[game.wonReward.image], game.wonReward.x, game.wonReward.y, 50 * game.wonReward.sizeOffset, 65 * game.wonReward.sizeOffset);
	  }
	};

	var over = function (game) {
	  screen.clearRect(0, 0, 640, 480);

	  screen.font = "50px Arial";
	  screen.fillStyle = 'white';
	  screen.fillText("Well done!", 190, 150);
	  screen.font = "25px Arial";
	  screen.fillText("Come back tomorrow for more prizes!!", 120, 200);
	};

	module.exports = {
	  loader: loader,
	  game: game,
	  over: over
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
	  currentAnimationFrame: 0,
	  images: {}
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Render = __webpack_require__(3);
	const env = __webpack_require__(4);
	const Game = __webpack_require__(6);
	const Listeners = __webpack_require__(9);
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

	module.exports = { start: start };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Balloon = __webpack_require__(7);
	const Reward = __webpack_require__(8);
	var counter = 0;
	var timeSinceFired = 100;
	var Game = function () {
	  this.balloons = this.generateBalloons();
	  this.target = this.newTarget();
	  this.darts = 3;
	  this.rewards = this.generateRewards();
	};

	Game.prototype.update = function () {
	  if (counter % 20 === 0) {
	    this.updateBalloons();
	  }
	  if (counter % 70 === 0) {
	    this.target = this.newTarget();
	  }
	  if (this.wonReward) {
	    this.wonReward.update();
	    if (this.wonReward.animationFinished()) {
	      this.wonReward = null;
	    }
	  }
	  if (this.isFiring && timeSinceFired > 100) {
	    this.fire();
	  }
	  counter++;
	  timeSinceFired++;
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
	  this.darts--;
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
	  var balloon = Math.floor(Math.random() * this.balloons.length);
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

/***/ },
/* 7 */
/***/ function(module, exports) {

	var Balloon = function (x, y) {
	  this.centerX = x;
	  this.centerY = y;
	  this.x = x;
	  this.y = y;
	  this.image = 'balloon' + randInt(0, 3);
	};

	Balloon.prototype.float = function () {
	  var offsetLimit = 5;
	  if (this.x > this.centerX + offsetLimit) {
	    this.x--;
	  } else if (this.x < this.centerX - offsetLimit) {
	    this.x++;
	  } else {
	    this.x = this.x + rand(-1, 1);
	  }
	  if (this.y > this.centerY + offsetLimit) {
	    this.y--;
	  } else if (this.y < this.centerY - offsetLimit) {
	    this.y++;
	  } else {
	    this.y = this.y + rand(-1, 1);
	  }
	};

	function rand(min, max) {
	  return Math.random() * (max - min) + min;
	}

	function randInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	module.exports = Balloon;

/***/ },
/* 8 */
/***/ function(module, exports) {

	var Reward = function () {
	  this.image = 'reward' + randInt(0, 2);
	  this.lived = 0;
	  this.sizeOffset = 1;
	  this.animationSpeed = 0.05;
	};

	Reward.prototype.update = function () {
	  this.lived++;
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

/***/ },
/* 9 */
/***/ function(module, exports) {

	const game = function (game) {
	  window.addEventListener('touchstart', setFiring.bind(null, true));
	  window.addEventListener('mousedown', setFiring.bind(null, true));
	  window.addEventListener('keydown', setFiring.bind(null, true));
	  window.addEventListener('touchend', setFiring.bind(null, false));
	  window.addEventListener('mouseup', setFiring.bind(null, false));
	  window.addEventListener('keyup', setFiring.bind(null, false));

	  function setFiring(state, event) {
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

	module.exports = { for: game };

/***/ }
/******/ ]);