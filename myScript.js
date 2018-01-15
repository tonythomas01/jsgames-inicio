document.title = "Neon Hover!";

var canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");

var background = new Background();

var player1 = new Player((canvas.width / 2) - 60,
    (canvas.height / 2) - 190, 120, 219, "assets/topcar.png", null, "image");


function Player(x, y, width, height, imageSrc, color, type) {
    if (type == "image") {
        var image = document.createElement("IMG");
        image.src = imageSrc;
        image.width = width;
        image.height = height;
        image.alt = imageSrc;
    }
    this.box = new Box(x, y, width, height, color);

    this.update = function() {
        for (var button in buttonsDown) {
            if (button == "ArrowLeft" || button == "leftArrow") {
                this.box.move(-4, 0);
            }
            else if (button == "ArrowUp" || button == "upButton") {
                this.box.move(0, -4);
            }
            else if (button == "ArrowRight" || button == "rightArrow") {
                this.box.move(4, 0);
            }
            else if (button == "ArrowDown" || button == "downButton") {
                this.box.move(0, 4);
            }
            else {
                this.box.move(0, 0);
            }
        }
    }
    this.render = function() {
        if (type == "image") {
            context.shadowBlur = 5;
            context.shadowColor = "hotpink";
            context.drawImage(image, this.box.x, this.box.y);

        }
        else {
            this.box.render();
        }
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
        if (this.x < (canvas.width / 3) +23) { // hitting the left side
            this.x = (canvas.width / 3) +23;
            this.x_speed = 0;
        }
        else if (this.x + this.width -20  > (canvas.width/3)*2) { // hitting the right side
            this.x = (canvas.width/3)*2 - this.width +20;
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


function Background() {
    this.groundTick = 0;
    var width = canvas.width;
    var height = canvas.height;
    var middelX = canvas.width / 2;
    var middelY = canvas.height / 2;
    var quarterY = canvas.height / 4;

    var sunRadius = (canvas.height / 4) * 0.8;
    var twoPi = 2 * Math.PI;

    var sunGradient = context.createLinearGradient(0, 0, 0, middelY);
    sunGradient.addColorStop(0, "gold");
    sunGradient.addColorStop(0.3, "yellow");
    sunGradient.addColorStop(0.7, "red");
    sunGradient.addColorStop(1, "black");

    this.renderGround = function() {

        context.beginPath();

        // for (var i = 1; i < 60; i++) {
        //   //context.moveTo(0, Math.pow(i, 2));
        //   //context.lineTo(canvas.width, Math.pow(i, 2));
        // }
        var stepSize = ((2 * canvas.width) / 30);
        context.moveTo((canvas.width / 3), 0);
        context.lineTo((canvas.width / 3), canvas.height);

        context.moveTo((canvas.width / 3)+25, 0);
        context.lineTo((canvas.width / 3)+25, canvas.height);


        context.moveTo((canvas.width / 3)*2, 0);
        context.lineTo((canvas.width / 3)*2, canvas.height);

        context.moveTo(((canvas.width / 3)*2) +25, 0);
        context.lineTo(((canvas.width / 3)*2) +25, canvas.height);

        // context.moveTo((canvas.width / 3)*3, 0);
        // context.lineTo((canvas.width / 3)*3, canvas.height);

        // for (var i = 0; i < 2; i++) {
        //     context.moveTo((canvas.width / 2), 0);
        //     context.lineTo(-(canvas.width / 2) + stepSize * i + (this.groundTick % stepSize), canvas.height);
        // }
        context.strokeStyle = "cyan";
        context.shadowBlur = 15;
        context.shadowColor = "deepskyblue";
        context.lineWidth = 2;
        context.stroke();
    }

    this.update = function() {
        this.groundTick = this.groundTick + 2;
    }
    this.render = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.shadowBlur = 0;
        context.fillStyle = "Black";
        context.fillRect(0, 0, canvas.width, canvas.height);


        this.renderGround();
        context.shadowBlur = 0;
        context.fillStyle = "Black";
        // context.fillRect(0, 0, canvas.width, (canvas.height / 2));
        context.beginPath();
        //context.moveTo(0, middelY);
        //context.lineTo(canvas.width, middelY);
        context.strokeStyle = "cyan";
        context.shadowBlur = 15;
        context.shadowColor = "deepskyblue";
        context.lineWidth = 2;
        context.stroke();
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
    background.update();
    player1.update();
};

var render = function() {
    background.render();
    player1.render();
};



window.onload = function() {
    document.body.appendChild(canvas);
    document.body.appendChild(leftArrow);
    //document.body.appendChild(leftButton);
   // document.body.appendChild(rightButton);
    document.body.appendChild(rightArrow);
    animateFrame(tick);
};

window.onresize = function() {
    window.location.reload();
};

var leftButton = document.createElement("button");
var leftArrow = document.createElement("leftArrow");
leftArrow.id = "leftArrow";

leftButton.id = "leftButton";
// var upButton = document.createElement("button");
// upButton.id = "upButton";
var rightButton = document.createElement("button");
var rightArrow = document.createElement("rightArrow");
rightArrow.id = "rightArrow";
rightButton.id = "rightButton";
// var downButton = document.createElement("button");
// downButton.id = "downButton";

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
