const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasH = canvas.height;
const canvasW = canvas.width;

let leftpeddle = (rightpeddle = ball = {});

let score = 0;

let peddle = { h: 70, w: 5 };

setInitialVariables();

drawBall();
drawLeftPeddle();
drawRightPeddle();
moveBall();
drawScore();
moveleftPeddle();
drawCenterLine();

function drawScore() {
  ctx.beginPath();
  ctx.fillText("Score is " + score, 10, 10);
  ctx.stroke();
  ctx.closePath();
}

function setInitialVariables() {
  ball = { x: 150, y: 150, r: 10, dx: 2, dy: -1 };
  leftpeddle = { x: 0, y: 125 };
  rightpeddle = { x: canvasW - 5, y: 125 };
}

function moveleftPeddle() {
  document.addEventListener("mousemove", (e) => {
    leftpeddle.y = e.screenY - 153;
  });
}

function detectCollision() {
  if (ball.x > rightpeddle.x - ball.r) {
    ball.dx = -ball.dx;
  }
  // Bottom Collision TopCollision
  if (ball.y > canvasH - ball.r || ball.y < 0 + ball.r) {
    ball.dy = -ball.dy;
  }

  //detect left collision

  if (
    ball.x < 0 + ball.r + peddle.w &&
    ball.y > leftpeddle.y &&
    ball.y < leftpeddle.y + peddle.h
  ) {
    ball.dx = -ball.dx + 0.4;
    ball.dy += 0.2;
    score = score + 1;
  }

  //detect  loose

  if (ball.x < 0 + ball.r) {
    alert("you loose");
    score = 0;
    setInitialVariables();
  }
}

function drawCenterLine() {
  ctx.beginPath();

  ctx.setLineDash([5, 5]);

  ctx.moveTo(300, 0);
  ctx.lineTo(300, canvasH);
  ctx.stroke();
  ctx.closePath();
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  rightpeddle.y = ball.y - peddle.h / 2;
  ctx.clearRect(0, 0, canvasW, canvasH);
  detectCollision();
  drawBall();
  drawLeftPeddle();
  drawScore();
  drawRightPeddle();
  drawCenterLine();
  requestAnimationFrame(moveBall);
}

function drawBall() {
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
}

function drawLeftPeddle() {
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.rect(leftpeddle.x, leftpeddle.y, peddle.w, peddle.h);
  ctx.stroke();
  ctx.closePath();
}

function drawRightPeddle() {
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.rect(rightpeddle.x, rightpeddle.y, peddle.w, peddle.h);
  ctx.stroke();
  ctx.closePath();
}
 