document.addEventListener('DOMContentLoaded', ()=>{
  let canvas_1 = document.querySelector('#canvas_1');
  let ctx_1 = canvas_1.getContext('2d');

  let canvas_2 = document.querySelector('#canvas_2');
  let ctx_2 = canvas_2.getContext('2d');

  let cvs_test = document.querySelector('#cvs_test');
  let cvs = cvs_test.getContext('2d');

  let a = canvas_1.width /20;
  let b = canvas_1.height - 50;
  let da = 1;
  let db = -2;

  let spacePressed = false;

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  function keyDownHandler(e) {
    if(e.keyCode == 32) {
      spacePressed = true;
    }
  }
  function keyUpHandler(e) {
    if(e.keyCode == 32) {
      spacePressed = false;
    }
  }

  function jump(){
    if (spacePressed) {
      b += db;
      a += da;
      setTimeout(()=>{spacePressed = false;}, 400);
    } else {
      if (b >= 270) {
        if (canvas_1.dataset.index == 0) {
          if (a >= 240 && a <= 270) {
            document.removeEventListener("keydown", keyDownHandler, false);
            b -= db/2;
          }
        } else if (canvas_2.dataset.index == 0) {
          if (a >= 120 && a <= 150 || a >= 290 && a <= 320) {
            document.removeEventListener("keydown", keyDownHandler, false);
            b -= db/2;
          }
        } else {
          b = 270;
        }

      } else if (b <= 270) {
        document.removeEventListener("keydown", keyDownHandler, false);
        b -= db/2;
        if (b >= 268) {
          document.addEventListener("keydown", keyDownHandler, false);
        }
        if (a > 480) {
         a = 0;
        }
        else {
          a += da;
        }
      }
    }
  }

  function cvs_1(){
    canvas_1.dataset.index = 0;
    clearCanv(ctx_1, canvas_1);
    let pic = 45;

    // Clouds
    for (let i = 40; i < 140; i+=18) {
      drawCircle(ctx_1, i, 23, 15, 0, 2 * Math.PI, true, '#f1fffd');
    }
    for (let i = 180; i < 260; i+=18) {
      drawCircle(ctx_1, i, 27, 13, 0, 2 * Math.PI, true, '#f1fffd');
    }
    for (let i = 280; i < 380; i+=20) {
      drawCircle(ctx_1, i, 70, 18, 0, 2 * Math.PI, true, '#f1fffd');
    }
    for (let i = 410; i < 500; i+=20) {
      drawCircle(ctx_1, i, 50, 15, 0, 2 * Math.PI, true, '#f1fffd');
    }

    //  Mountains
    drawTriangle(ctx_1, 100, 40, 230, canvas_1.height, '#8d7b89');
    drawTriangle(ctx_1, 100, 40, 23, canvas_1.height/10, '#eeeeee');
    drawTriangle(ctx_1, 230, 70, 230, canvas_1.height, '#8d7b89');
    drawTriangle(ctx_1, 230, 70, 23, canvas_1.height/10, '#eeeeee');
    drawTriangle(ctx_1, 430, 55, 230, canvas_1.height, '#8d7b89');
    drawTriangle(ctx_1, 430, 55, 23, canvas_1.height/10, '#eeeeee');

    //  Trees
    drawRectFill(ctx_1, 10, 250, 10, 60, 'brown');
    drawCircle(ctx_1, 15, 250, 20, 0, 2 * Math.PI, false, 'green');
    drawRectFill(ctx_1, 180, 250, 10, 60, 'brown');
    drawCircle(ctx_1, 185, 250, 20, 0, 2 * Math.PI, false, 'green');
    drawRectFill(ctx_1, 330, 250, 10, 60, 'brown');
    drawCircle(ctx_1, 335, 250, 20, 0, 2 * Math.PI, false, 'green');


    // Ground Elements (earth, Water)
    drawRectFill(ctx_1, 0, 310, 240, 10, 'green');
    drawRectFill(ctx_1, 0, 317, 240, 3, 'brown');
    drawRectFill(ctx_1, 240, 313, 30, 8, 'blue');
    drawRectFill(ctx_1, 270, 310, 240, 10, 'green');
    drawRectFill(ctx_1, 270, 317, 240, 3, 'brown');

    // Obstacles
    drawTriangle(ctx_1, pic, 290, 10, 20, '#000');
    drawTriangle(ctx_1, pic+20, 290, 10, 20, '#000');
    drawTriangle(ctx_1, pic+60, 290, 10, 20, '#000');
    drawTriangle(ctx_1, pic+80, 290, 10, 20, '#000');
    drawTriangle(ctx_1, pic+120, 290, 10, 20, '#000');

    hatMan(ctx_1, a, b+10, '#FFF', '#000');
    for (let i = 0; i < 240; i += 2) {
      drawRectFill(ctx_1, i, 307, 1, 5, 'green');
    }
    for (let i = 270; i < canvas_1.width; i += 2) {
      drawRectFill(ctx_1, i, 307, 1, 5, 'green');
    }

    jump();

    collisionPic(a, b, pic, cvs_1);
    collisionPic(a, b, pic+20, cvs_1);
    collisionPic(a, b, pic+60, cvs_1);
    collisionPic(a, b, pic+80, cvs_1);
    collisionPic(a, b, pic+120, cvs_1);

    collisionWater(a, b, 255, cvs_1);



    if (a > 479) {
      canvas_1.style.display = 'none';
      canvas_2.style.display = 'block';
      canvas_1.dataset.index = 1;
      cvs_2();
      return;
    }
    requestAnimationFrame(cvs_1);
  }
  function cvs_2(){
    canvas_2.dataset.index = 0;
    clearCanv(ctx_2, canvas_2);
    let pic_2 = 60;
    let test = a;

    // Clouds
    for (let i = 40; i < 140; i+=18) {
      drawCircle(ctx_2, i, 50, 15, 0, 2 * Math.PI, true, '#f1fffd');
    }
    for (let i = 180; i < 260; i+=18) {
      drawCircle(ctx_2, i, 30, 13, 0, 2 * Math.PI, true, '#f1fffd');
    }
    for (let i = 280; i < 380; i+=20) {
      drawCircle(ctx_2, i, 80, 18, 0, 2 * Math.PI, true, '#f1fffd');
    }
    for (let i = 410; i < 500; i+=20) {
      drawCircle(ctx_2, i, 55, 15, 0, 2 * Math.PI, true, '#f1fffd');
    }

    //  Mountains
    drawTriangle(ctx_2, 40, 40, 230, canvas_2.height, '#a91a05');
    drawTriangle(ctx_2, 40, 40, 23, canvas_2.height/10, '#7b0000');
    drawTriangle(ctx_2, 175, 90, 230, canvas_2.height, '#a91a05');
    drawTriangle(ctx_2, 175, 90, 23, canvas_2.height/10, '#7b0000');
    drawTriangle(ctx_2, 280, 60, 230, canvas_2.height, '#a91a05');
    drawTriangle(ctx_2, 280, 60, 23, canvas_2.height/10, '#7b0000');
    drawTriangle(ctx_2, 440, 75, 230, canvas_2.height, '#a91a05');
    drawTriangle(ctx_2, 440, 75, 23, canvas_2.height/10, '#7b0000');

    //  Trees
    drawRectFill(ctx_2, 80, 250, 10, 60, '#555c3d');
    drawCircle(ctx_2, 85, 250, 20, 0, 2 * Math.PI, false, '#ee9d4a');
    drawRectFill(ctx_2, 260, 250, 10, 60, '#555c3d');
    drawCircle(ctx_2, 265, 250, 20, 0, 2 * Math.PI, false, '#ee9d4a');
    drawRectFill(ctx_2, 430, 250, 10, 60, '#555c3d');
    drawCircle(ctx_2, 435, 250, 20, 0, 2 * Math.PI, false, '#ee9d4a');

    // Ground Elements (earth, Water)
    drawRectFill(ctx_2, 0, 310, 120, 10, 'green');
    drawRectFill(ctx_2, 0, 317, 120, 3, 'brown');
    drawRectFill(ctx_2, 120, 313, 30, 8, 'blue');

    drawRectFill(ctx_2, 150, 310, 140, 10, 'green');
    drawRectFill(ctx_2, 150, 317, 140, 3, 'brown');
    drawRectFill(ctx_2, 290, 313, 30, 8, 'blue');

    drawRectFill(ctx_2, 320, 310, 240, 10, 'green');
    drawRectFill(ctx_2, 320, 317, 240, 3, 'brown');

    // Obstacles
    drawTriangle(ctx_2, pic_2, 290, 10, 20, '#000');
    drawTriangle(ctx_2, pic_2+20, 290, 10, 20, '#000');
    drawTriangle(ctx_2, pic_2+130, 290, 10, 20, '#000');
    drawTriangle(ctx_2, pic_2+150, 290, 10, 20, '#000');
    drawTriangle(ctx_2, pic_2+190, 290, 10, 20, '#000');
    drawTriangle(ctx_2, pic_2+300, 290, 10, 20, '#000');
    drawTriangle(ctx_2, pic_2+350, 290, 10, 20, '#000');
    drawTriangle(ctx_2, pic_2+370, 290, 10, 20, '#000');

    hatMan(ctx_2, a, b+10, '#FFF', '#000');
    for (let i = 0; i < 120; i += 2) {
      drawRectFill(ctx_2, i, 307, 1, 5, 'green');
    }
    for (let i = 150; i < 290; i += 2) {
      drawRectFill(ctx_2, i, 307, 1, 5, 'green');
    }
    for (let i = 320; i < canvas_2.width; i += 2) {
      drawRectFill(ctx_2, i, 307, 1, 5, 'green');
    }
    jump();

    collisionPic(a, b, pic_2, cvs_2);
    collisionPic(a, b, pic_2+20, cvs_2);
    collisionPic(a, b, pic_2+130, cvs_2);
    collisionPic(a, b, pic_2+150, cvs_2);
    collisionPic(a, b, pic_2+190, cvs_2);
    collisionPic(a, b, pic_2+300, cvs_2);
    collisionPic(a, b, pic_2+350, cvs_2);
    collisionPic(a, b, pic_2+370, cvs_2);

    collisionWater(test, b, 135, cvs_2);
    collisionWater(test, b, 305, cvs_2);

    if (a == 470) {
      alert('Congratz !!');
      location.reload();
    }

    requestAnimationFrame(cvs_2);
  }

  cvs_1();
  grid(cvs, cvs_test);

})
