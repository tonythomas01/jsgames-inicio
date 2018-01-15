document.title = "My Pong Game!";


var canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext('2d');

var leftButton = document.createElement("button");
leftButton.id = "leftButton";
var upButton = document.createElement("button");
upButton.id = "upButton";
var rightButton = document.createElement("button");
rightButton.id = "rightButton";
var downButton = document.createElement("button");
downButton.id = "downButton";


var animateFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000 / 60) };


var tick = function() {
  update();
  render();
  animateFrame(tick);
};

var update = function() {
  player1.update();
  player2.update();
  ball.update(player1.paddle, player2.paddle);
};

var render = function() {
  context.fillStyle = "lightblue";
  context.fillRect(0, 0, canvas.width, canvas.height);
  player1.render();
  player2.render();
  ball.render();
  context.font = (canvas.width / 16) + "px Arial";
  context.fillStyle = "cyan";
  context.fillText("" + score2, player2.paddle.x, (canvas.height / 8) + (canvas.width / 16));
  context.fillText("" + score1, player1.paddle.x, canvas.height - (canvas.height / 8));
};


var ball = new Ball((canvas.width / 2), (canvas.height / 2), (canvas.height / 100));

var score1 = 0;
var score2 = 0;

var player1 = new Player(((canvas.width / 2) - (canvas.width / 32)),
  ((canvas.height - (canvas.height / 32)) - 10), (canvas.width / 16),
  (canvas.height / 32));
var player2 = new Player(((canvas.width / 2) - (canvas.width / 32)), 10,
  (canvas.width / 16), (canvas.height / 32));

function Player(x, y, width, height) {
  this.paddle = new Paddle(x, y, width, height);
}

function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}



function Ball(x, y, radius) {
  this.x = x;
  this.y = y;
  this.x_speed = 0;
  this.y_speed = 3;
  this.radius = radius;
}

Player.prototype.render = function() {
  this.paddle.render();
};

Paddle.prototype.render = function() {
  context.fillStyle = "crimson";
  context.fillRect(this.x, this.y, this.width, this.height);
};

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "green";
  context.fill();
};

Ball.prototype.update = function(paddle1, paddle2) {
  this.x += this.x_speed;
  this.y += this.y_speed;
  var top_x = this.x - this.radius;
  var top_y = this.y - this.radius;
  var bottom_x = this.x + this.radius;
  var bottom_y = this.y + this.radius;

  if (this.x - this.radius < 0) { // hitting the left wall
    this.x = this.radius;
    this.x_speed = -this.x_speed;
  }
  else if (this.x + this.radius > canvas.width) { // hitting the right wall
    this.x = (canvas.width - this.radius);
    this.x_speed = -this.x_speed;
  }

  if (this.y < 0 || this.y > canvas.height) { // a point was scored
    this.x_speed = 0;
    if (this.y < 0) {
      this.y_speed = -3;
      score1++;
    }
    else {
      this.y_speed = 3;
      score2++;
    }
    this.x = (canvas.width / 2);
    this.y = (canvas.height / 2);
  }

  if (top_y > (canvas.height / 2)) {
    if (top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
      // hit the player1's paddle
      this.y_speed = -3;
      this.x_speed += (paddle1.x_speed / 2);
      this.y += this.y_speed;
    }
  }
  else {
    if (top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
      // hit the player2's paddle
      this.y_speed = 3;
      this.x_speed += (paddle2.x_speed / 2);
      this.y += this.y_speed;
    }
  }
};

Player.prototype.update = function() {
  for (var button in buttonsDown) {
    if (button == "ArrowLeft" || button == "leftButton") {
      player1.paddle.move(-4, 0);
    }
    else if (button == "ArrowUp" || button == "upButton") {
      player2.paddle.move(-4, 0);
    }
    else if (button == "ArrowRight" || button == "rightButton") {
      player1.paddle.move(4, 0);
    }
    else if (button == "ArrowDown" || button == "downButton") {
      player2.paddle.move(4, 0);
    }
    else {
      this.paddle.move(0, 0);
    }
  }
};

Paddle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if (this.x < 0) { // all the way to the left
    this.x = 0;
    this.x_speed = 0;
  }
  else if (this.x + this.width > canvas.width) { // all the way to the right
    this.x = canvas.width - this.width;
    this.x_speed = 0;
  }
}

var buttonsDown = {};

window.addEventListener("keydown", function(event) {
  buttonsDown[event.key] = true;
});

window.addEventListener("keyup", function(event) {
  delete buttonsDown[event.key];
});

window.addEventListener("mousedown", function(event) {
  buttonsDown[event.target.id] = true;
});
window.addEventListener("mouseup", function(event) {
  delete buttonsDown[event.target.id];
});

window.addEventListener("touchstart", function(event) {
  buttonsDown[event.target.id] = true;
});
window.addEventListener("touchend", function(event) {
  delete buttonsDown[event.target.id];
});

window.onload = function() {
  document.body.appendChild(canvas);
  document.body.appendChild(leftButton);
  document.body.appendChild(upButton);
  document.body.appendChild(rightButton);
  document.body.appendChild(downButton);
  animateFrame(tick);
};

window.onresize = function() {
  window.location.reload();
};
