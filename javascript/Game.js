const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");
// ctx.moveTo(0,0);
// ctx.lineTo(50,250);
// ctx.stroke();

const canvasH = canvas.height;
const canvasW = canvas.width;

let x, dx, y, dy;
let radius, paddleX, paddleY, paddleW;
let brickW;
let brickH;
let brickOffset;
let rightPressed = false;
let leftPressed = false;
let interval;
let brickRows;
let brickCount;
const bricksArray = [];
let score;

//functions

setVariables();
drawBall();
drawPeddle();
createBricksArray();
drawBricks();
drawScore();
paddleNavigation();
startgame();

//Create Bricks Array

function createBricksArray() {
  for (let j = 0; j < brickRows; j++) {
    bricksArray[j] = [];
    for (let i = 0; i < brickCount; i++) {
      bricksArray[j][i] = { x: 0, y: 0, isVisible: true };
    }
  }
}

//wonnnn
function checkYouWon() {
    if (score === 18) {
      alert("You Won !!");
      clearInterval(interval);
      interval = null;
      setVariables();
    }
  }
//score function

function drawScore() {
  ctx.beginPath();
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.fillText("Score: " + score, 9, 10);
  ctx.closePath();
}
// //This is the function to draw the bricks

function drawBricks() {
  for (let j = 0; j < brickRows; j++) {
    for (let i = 0; i < brickCount; i++) {
      if (bricksArray[j][i].isVisible) {
        const brickX = 10 + i * (brickW + brickOffset);
        const brickY = (10 + brickOffset) * (j + 1);
        bricksArray[j][i].x = brickX;
        bricksArray[j][i].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickW, 10);
        ctx.fillStyle = "#799351";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function paddleNavigation() {
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);

  function handleKeyDown(e) {
    if (e.key === "ArrowRight") {
      rightPressed = true;
    }
    if (e.key === "ArrowLeft") {
      leftPressed = true;
    }
  }

  function handleKeyUp(e) {
    if (e.key === "ArrowRight") {
      rightPressed = false;
    }
    if (e.key === "ArrowLeft") {
      leftPressed = false;
    }
  }
}

function setVariables() {
  radius = 8;
  paddleW = 55;
  paddleX = canvasW / 2 - paddleW / 2;
  paddleY = canvasH - 10;
  x = canvasW / 2;
  y = canvasH - 10;
  dx = 5;
  dy = -5;
  score = 0;
  brickW = 40;
  brickH = 10;
  brickOffset = 8;
  brickRows = 6;
  brickCount = 13;
}

// //setTimeout
function DetectCollision() {
  if (x + dx >= canvasW || x + dx < 0) {
    dx = -dx;
  }
  if (y + dy > canvasH - radius) {
    if (x + dx > paddleX && x + dx < paddleX + paddleW) {
      dy = -dy;
      dx = dx + (x + dx - paddleX) / 100;
    }
  }

  if (y + dy < 0 || y + dy > canvasH) {
    dy = -dy;
  }

  for (let b = 0; b < bricksArray.length; b++) {
    for (let i = 0; i < bricksArray[b].length; i++) {
      const brick = bricksArray[b][i];
      if (brick.isVisible) {
        if (
          x > brick.x &&
          x < brick.x + brickW &&
          y > brick.y &&
          y < brick.y + brickH
        ) {
          brick.isVisible = false;
          dy = -dy;
          score += 1;
          drawScore();
          checkYouWon();
        }
      }
    }
  }
}

function startgame() {
  if (!interval) {
    interval = setInterval(() => {
      if (rightPressed) {
        paddleX = paddleX + 5;
      }
      if (leftPressed) {
        paddleX = paddleX - 5;
      }

      DetectCollision();
      x = x + dx;
      y = y + dy;

      detectGameOver();

      ctx.clearRect(0, 0, canvasW, canvasH);
      drawPeddle();
      drawBricks();
      drawScore();
      drawBall();
    }, 26);
  }
}

// //gane Over Function

function detectGameOver() {
  if (y === canvasH) {
    alert("Game Over");
    clearInterval(interval);
    interval = null;

    setVariables();
  }
}

// //This is the function to draw the circle

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, radius, 2 * Math.PI, false);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}

// //This is the function to draw the paddle

function drawPeddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleW, 10);
  ctx.fillStyle = "#799351";
  ctx.fill();
  ctx.closePath();
}
