const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let SnakeH = (SnakeW = 5);
let canvasH = canvas.height;
let canvasW = canvas.width;
let randomX;
let randomY;
let rounds=[];

let dx, dy, score;

let interval;
let snakes, upPressed, downPressed, rightPressed, leftPressed;
setVariables();
drawSnake();
moveSnake();
drawScore();
controlSnake();
randomPosition();
drawFood();
showScore();

function setVariables() {
  interval = null;
  dx = SnakeW;
  score = 0;
  dy = 0;
  rightPressed = leftPressed = downPressed = upPressed = false;
  
  snakes = [{ x: 10, y: 10 }];
}

function controlSnake() {
  document.addEventListener("keydown", handlekeydown);
  document.addEventListener("keyup", handlekeyup);

  function handlekeydown(e) {
    if (e.key === "ArrowUp") {
      upPressed = true;
    }
    if (e.key === "ArrowRight") {
      rightPressed = true;
    }
    if (e.key === "ArrowLeft") {
      leftPressed = true;
    }
    if (e.key === "ArrowDown") {
      downPressed = true;
    }
  }

  function handlekeyup(e) {
    if (e.key === "ArrowUp") {
      upPressed = false;
    }
    if (e.key === "ArrowRight") {
      rightPressed = false;
    }
    if (e.key === "ArrowLeft") {
      leftPressed = false;
    }
    if (e.key === "ArrowDown") {
      downPressed = false;
    }
  }
}


function showScore(){
    const scorediv=document.getElementById("scoreCard");
    scorediv.innerHTML=rounds.map(round=>`<li>Scores: ${round.score}</li>`).join(' ')
}

function randomPosition() {
  randomX = Math.floor((Math.random() * 290) / 5) * 5;
  randomY = Math.floor((Math.random() * 290) / 5) * 5;
}
function drawFood() {
  ctx.beginPath();
  ctx.rect(randomX, randomY, SnakeW, SnakeH);
  ctx.fillStyle = "orange";
  ctx.fill();
  ctx.closePath();
}

function moveSnake() {
  if (!interval) {
    interval = setInterval(() => {
      handleDirection();
      growSnake();
      detectCollision();
      const head = { x: snakes[0].x + dx, y: snakes[0].y + dy };
      snakes.unshift(head);
      snakes.pop();
      ctx.clearRect(0, 0, canvasW, canvasH);
      drawSnake();
      drawFood();
      drawScore();
    }, 100);
  }
}

function detectCollision() {
  const leftCollision = snakes[0].x <= 0;
  const rightCollision = snakes[0].x >= canvasW;
  const topCollision = snakes[0].y <= 0;
  const bottomCollision = snakes[0].y >= canvasH;
  if (leftCollision || rightCollision || bottomCollision || topCollision) {
    alert("game Over");
    reset();
  }
}

function reset() {
  clearInterval(interval);
  rounds.push({score:score});
  showScore();
  setVariables();
  randomPosition();
  moveSnake();
}

function drawScore() {
  ctx.beginPath();
  ctx.fillText("Score is   " + score, 10, 10);
  ctx.closePath();
}

function drawSnake() {
  snakes.forEach((snake) => {
    ctx.beginPath();
    ctx.rect(snake.x, snake.y, SnakeW, SnakeH);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  });
}

function growSnake() {
  if (snakes[0].x === randomX && snakes[0].y === randomY) {
    snakes.push({ x: randomX, y: randomY });
    randomPosition();
    score += 1;
  }
}

function handleDirection() {
  if (downPressed) {
    dy = SnakeW;
    dx = 0;
  }
  if (upPressed) {
    dy = -SnakeW;
    dx = 0;
  }
  if (leftPressed) {
    dx = -SnakeW;
    dy = 0;
  }
  if (rightPressed) {
    dx = SnakeW;
    dy = 0;
  }
}
