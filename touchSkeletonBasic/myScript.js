document.title = "Tab title!";

var canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");

var leftButton = document.createElement("button");
leftButton.id = "leftButton";
var upButton = document.createElement("button");
upButton.id = "upButton";
var rightButton = document.createElement("button");
rightButton.id = "rightButton";
var downButton = document.createElement("button");
downButton.id = "downButton";


var player1 = new Player((canvas.width / 2) - (100 / 2),
  (canvas.height / 2) - (100 / 2), 100, 100, "purple");


function Player(x, y, width, height, color) {
  this.box = new Box(x, y, width, height, color);

  this.update = function() {
    for (var button in buttonsDown) {
      if (button == "leftButton") {
        this.box.move(-4, 0);
      }
      else if (button == "upButton") {
        this.box.move(0, -4);
      }
      else if (button == "rightButton") {
        this.box.move(4, 0);
      }
      else if (button == "downButton") {
        this.box.move(0, 4);
      }
      else {
        this.box.move(0, 0);
      }
    }
  }
  this.render = function() {
    this.box.render();
  }
}

function Box(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.x_speed = 0;
  this.y_speed = 0;

  this.move = function(x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    if (this.x < 0) { // hitting the left side
      this.x = 0;
      this.x_speed = 0;
    }
    else if (this.x + this.width > canvas.width) { // hitting the right side
      this.x = canvas.width - this.width;
      this.x_speed = 0;
    }
    if (this.y < 0) { // hitting the top
      this.y = 0;
      this.y_speed = 0;
    }
    else if (this.y + this.height > canvas.height) { // hitting the bottom
      this.y = canvas.height - this.height;
      this.y_speed = 0;
    }
  }
  this.render = function() {
    context.fillStyle = color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}


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
};

var render = function() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, canvas.width, canvas.height);
  player1.render();
};



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

var buttonsDown = {};

window.addEventListener("touchstart", function(event) {
  buttonsDown[event.target.id] = true;
});
window.addEventListener("touchend", function(event) {
  delete buttonsDown[event.target.id];
});
