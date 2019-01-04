function drawCircle(circle, a, b, c, d, e, f, g)
{
  circle.beginPath();
  circle.arc(a, b, c, d, e, f);
  circle.fillStyle = g;
  circle.fill();
  circle.closePath();
}

function drawRectFill(rec, a, b, c, d, e)
{
  rec.beginPath();
  rec.rect(a, b, c, d);
  rec.fillStyle = e;
  rec.fill();
  rec.closePath();
}

function drawTriangle(tri, a, b, c, d, e)
{
  tri.beginPath();
  tri.moveTo(a, b);
  tri.lineTo(a+c, b+d);
  tri.lineTo(a-c, b+d);
  tri.fillStyle = e;
  tri.fill();
  tri.closePath();
}

function hatMan(hat, x, y, bc, bd){
  drawCircle(hat, x, y, 5, 0, 2 * Math.PI, false, bc); //  Head
  drawCircle(hat, x, y-1, 5, 0, Math.PI, true, bd); //  Hat
  drawRectFill(hat, x+3, y-3, 7, 2, bd);  //  HatCap
  drawRectFill(hat, x-2, y+5, 5, 15, bc);  //  Body
  drawRectFill(hat, x-1, y+20, 3, 10, bc); //  Legs
  drawRectFill(hat, x-1, y+8, 2, 8, bd);  //  Arms
  drawRectFill(hat, x-1, y+28, 5, 2, bd);  //  Feet
}

function clearCanv(a, b)
{
  a.clearRect(0, 0, b.width, b.height);
}

function collisionPic(a, b, p, x)
{
  if(a >= p-9 && a <= p+9 && b+10 >= 280){
    cancelAnimationFrame(x);
    location.reload();
  }
}

function collisionWater(a, b, p, x)
{
  if(a >= p-15 && a <= p+15 && b+10 >= 300){
    cancelAnimationFrame(x);
    location.reload();
  }
}

function grid(x, y)
{
  let i;
  for (i = 0; i < y.width; i += 10) {
    drawRectFill(x, i, 0, 1, y.height, '#000');
    drawRectFill(x, 0, i, y.width, 1, '#000');
    x.font = '5px Arial';
    x.fillStyle = 'red';
    x.fillText(i, i, y.height);
    x.fillText(i, i, 10);
    x.fillText(i, y.width - 10, 320 - i);
    x.fillText(i, 0, i);
  }
}
