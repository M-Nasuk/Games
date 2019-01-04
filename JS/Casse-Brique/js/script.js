function drawRectFill(rec, a, b, c, d, e)
{
  rec.beginPath();
  rec.rect(a, b, c, d);
  rec.fillStyle = e;
  rec.fill();
  rec.closePath();
}

function drawRectStroke(rec, a, b, c, d, e)
{
  rec.beginPath();
  rec.rect(a, b, c, d);
  rec.strokeStyle = e;
  rec.stroke();
  rec.closePath();
}

function drawCircle(circle, a, b, c, d, e, f, g)
{
  circle.beginPath();
  circle.arc(a, b, c, d, e, f);
  circle.fillStyle = g;
  circle.fill();
  circle.closePath();
}

function clearCanv(a, b, c, d)
{
  a.clearRect(c, d, b.width, b.height);
}
