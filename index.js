var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var X = canvas.width/4
var Y = canvas.height/2

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    if(e.key == "Down" || e.key == "ArrowDown") {
    	downPressed = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
    	upPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
}

var playerX = X;
var playerY = Y;

var player2X = 3*X;
var player2Y = Y;

var ballRadius = 10;

function drawBall() {
    c.beginPath();
    c.arc(playerX, playerY, ballRadius, 0, Math.PI*2);
    c.fillStyle = "#0095DD";
    c.fill();
    c.closePath();
}

function drawBall2() {
    c.beginPath();
    c.arc(player2X, player2Y, ballRadius, 0, Math.PI*2);
    c.fillStyle = "green";
    c.fill();
    c.closePath();
}

var a = 0;
var a2 = 0;
var dx = 0;
var dy = -1;

var gamepads = navigator.getGamepads();
console.log(gamepads);

function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    gamepads = navigator.getGamepads();
    var gp = gamepads[0];
    if(gp.buttons[7].pressed && !gp.buttons[6].pressed){
        if(a <= 5){
            a += 0.01*gp.buttons[7].value;
        }
        try {
          gp.vibrationActuator.playEffect("dual-rumble", {
            startDelay: 0,
            duration: 1,
            weakMagnitude: 1.0,
            strongMagnitude: 1.0
          });
        }
        catch(err) {
          
        }       
    }
    else{
        a *= 0.9;
    }
    if(gp.buttons[6].pressed && gp.buttons[7].pressed){
        if(Math.abs(a) <= 5){
            a *= 0.5;
        }
    }
    playerY += dy*a;
    //console.log(a);
    if(Math.abs(gp.axes[0]) > 0.001){
        dx = gp.axes[0];
    }
    if(Math.abs(gp.axes[1]) > 0.001){
        dy = gp.axes[1];
    }
    if(playerX+a*dx < ballRadius || playerX+a*dx > canvas.width-ballRadius){
        dx = -dx;
    }
    if(playerY+a*dy > canvas.height-ballRadius || playerY+a*dy < ballRadius) {
        dy = -dy;
    }
    playerX += Math.sqrt(a)*dx;
    playerY += Math.sqrt(a)*dy;
    drawBall();
    //a2 = gp.buttons[7].value;
    //console.log(a2);
    //d2x = gp.axes[2]*Math.sqrt(a2);
    //d2y = gp.axes[3]*Math.sqrt(a2);
    //player2X += 5*d2x;
    //player2Y += 5*d2y;
    //console.log({player2X,player2Y})
    //drawBall2();
    //requestAnimationFrame(draw);
}

window.addEventListener("gamepadconnected", (event) => {
  console.log("A gamepad connected:");
  console.log(event.gamepad);
  setInterval(draw, 2);
});

window.addEventListener("gamepaddisconnected", (event) => {
  console.log("A gamepad disconnected:");
  console.log(event.gamepad);
});




