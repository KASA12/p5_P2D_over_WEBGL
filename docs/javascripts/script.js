let pg = null;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(30);

  //default camera setting
  camera(0, 0, (windowHeight / 2) / tan(PI * 30 / 180), 0, 0, 0, 0, 1, 0);
  //ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 50000);

  pg = createGraphics(windowWidth, windowHeight);
  pg.colorMode(HSB, 360, 100, 100, 100);
  pg.smooth();
}

function draw() {
  scene1();
  // if (frameCount < 190) {
  //   scene1();
  // } else {
  //   scene2();
  // }


  console.log(mouseX + " " + mouseY);
}

function scene1() {
  const backgroundColor = color(340, 5, 100, 100);
  const baseColor = color(340, 80, 70, 100);

  const texts = ["P2D", "Canvas", "Over", "WEBGL"];
  let textY = (textAscent() + textDescent()) * 12;
  const textX_padding = windowWidth / 5;
  const textY_padding = windowHeight - textY * (texts.length - 1) - 5;

  background(backgroundColor);

  pg.background(backgroundColor);

  //rect
  pg.noStroke();
  pg.fill(baseColor);
  pg.rect(0, 0, textX_padding, windowHeight);
  pg.stroke(baseColor);
  pg.strokeWeight(15);
  pg.noFill();
  pg.rect(0, 0, windowWidth, windowHeight);

  //asterisk
  pg.strokeWeight(5);
  pg.textSize(200);
  pg.noStroke();
  pg.fill(backgroundColor);
  pg.text("*", easing(windowWidth / 3, textX_padding / 2 - 15, 0), textY_padding);
  //line
  // pg.line(0, windowHeight / 2, windowWidth, windowHeight / 2);//x
  // pg.line(windowWidth / 2, 0, windowWidth / 2, windowHeight);//y

  //text
  pg.strokeWeight(5);
  pg.textSize(200);
  pg.fill(baseColor);
  pg.textFont("Helvetica");
  texts.forEach((text, i) => {
    pg.text(text, easing(-windowWidth, textX_padding, 10 * i), textY_padding + textY * i);
  })

  //plane
  texture(pg);
  plane(windowWidth, windowHeight);

  //camera control
  camera(
    easing(0, windowHeight, 50, 20),
    easing(0, windowHeight / 2, 50, 20),
    (windowHeight / 2) / tan(PI * 30 / 180),
    // easing(0, -windowWidth + textX_padding * 3, 80, 70, "inout"),
    // easing(0, -windowHeight + textY_padding + textY * 3 + 35, 80, 70, "inout"),
    easing(0, -windowWidth / 2 + textX_padding / 2 + 32, 80, 70, "inout"),
    easing(0, -windowHeight / 2 + textY_padding - 75, 80, 70, "inout"),
    0,
    0, 1, 0);

  //perspective
  perspective(easing(PI / 3, PI / 350, 90, 70, "in"), windowWidth / windowHeight, 0.1, 3000);
}

function scene2() {
  const backgroundColor = color(340, 100, 70, 100);
  background(backgroundColor);

  pg.clear();

  //camera control
  camera(
    0,
    0,
    (windowHeight / 2) / tan(PI * 30 / 180),
    0,
    0,
    0,
    0, 1, 0);
}

function mouseWheel() {
  return false;
}

function touchMoved() {
  return false;
}

function easing(startX, endX, startFrame, speedRatio = 15, type = "out") {
  if (type === "in") {
    return startX + (endX - startX) * ease_in((frameCount - startFrame) / speedRatio);
  } else if (type === "out") {
    return startX + (endX - startX) * ease_out((frameCount - startFrame) / speedRatio);
  } else if (type === "inout") {
    return startX + (endX - startX) * ease_inout((frameCount - startFrame) / speedRatio);
  }

  function ease_in(x) {
    if (x < 0) {
      return 0;
    }
    if (1 < x) {
      return 1;
    }
    return Math.pow(x, 2);
  }

  function ease_out(x) {
    if (x < 0) {
      return 0;
    }
    if (1 < x) {
      return 1;
    }
    return x * (2 - x);
  }

  function ease_inout(x) {
    if (x < 0) {
      return 0;
    }
    if (1 < x) {
      return 1;
    }
    return Math.pow(x, 2) * (3 - 2 * x);
  }
}

