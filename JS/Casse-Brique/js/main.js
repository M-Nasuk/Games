document.addEventListener('DOMContentLoaded', ()=>{
  let canvas = document.querySelector('#myCanvas');
  let ctx = canvas.getContext('2d');

  let x = canvas.width/2;
  let y = canvas.height-30;
  let dx = 2;
  let dy = -2;
  let ballRadius = 10;

  let paddleHeight = 10;
  let paddleWidth = 75;
  let paddleX = (canvas.width-paddleWidth)/2; // 480 - 75 / 2 = 102.5

  let rightPressed = false;
  let leftPressed = false;

  let brickRowCount = 4;
  let brickColumnCount = 8;
  let brickWidth = 75;
  let brickHeight = 20;
  let brickPadding = 10;
  let brickOffsetTop = 30;
  let brickOffsetLeft = 30;

  let bricks = [];
  for (let c = 0; c < brickColumnCount; c++){
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++){
      bricks[c][r] = {x: 0, y: 0, status: 1};
    }
  }

  let score = 0;

  let lives = 3;

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  function keyDownHandler(e) {
    if(e.keyCode == 39 || e.keyCode == 68) {
      rightPressed = true;
    }
    else if(e.keyCode == 37 || e.keyCode == 81) {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if(e.keyCode == 39 || e.keyCode == 68) {
      rightPressed = false;
    }
    else if(e.keyCode == 37 || e.keyCode == 81) {
      leftPressed = false;
    }
  }

  function drawPaddle()
  {
    drawRectFill(ctx, paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, '#000');
  }

  function drawBall()
  {
    drawCircle(ctx, x, y, ballRadius, 0, 2 * Math.PI, false, '#0000DD');
  }

  function drawBricks()
  {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status == 1) {
          let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
          let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          drawRectFill(ctx, brickX, brickY, brickWidth, brickHeight, '#FF0000');
        }
      }
    }
  }

  function collisionDetection()
  {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++){
        let b = bricks[c][r];
        if (b.status == 1) {
          if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
            dy = -dy;
            b.status = 0;
            score++;
            if (score == brickRowCount * brickColumnCount) {
              alert('You WIN , Congrats !');
              document.location.reload();
            }
          }
        }
      }
    }
  }

  function drawScore()
  {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0000DD';
    ctx.fillText('Score: ' + score, 8, 20);
  }

  function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

  function draw(event)
  {
    clearCanv(ctx, canvas, 0, 0);
    drawPaddle();
    drawBall();
    drawBricks();
    collisionDetection();
    drawScore();
    drawLives();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy < ballRadius){
      dy = -dy;
    } else if (y + dy > canvas.height + ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        lives--;
        if (!lives) {
          alert('Game Over');
          document.location.reload();
        } else {
          x = canvas.width/2;
          y = canvas.height-30;
          dx = 2;
          dy = -2;
          paddleX = (canvas.width-paddleWidth)/2;
        }
      }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 6;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 6;
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw);
  }
  draw();

})
