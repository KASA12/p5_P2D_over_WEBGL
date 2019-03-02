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
  background(180, 5, 100, 100);

  pg.clear();
  //line
  // pg.line(0, windowHeight / 2, windowWidth, windowHeight / 2);//x
  // pg.line(windowWidth / 2, 0, windowWidth / 2, windowHeight);//y

  //text
  pg.strokeWeight(5);
  pg.textSize(200);
  pg.fill(180, 50, 50, 100);
  pg.textFont("Helvetica");
  const texts = ["P2D", "Canvas", "Over", "WEBGL"];
  let textY = (textAscent() + textDescent()) * 12;
  const textX_padding = windowWidth / 5;
  const textY_padding = windowHeight - textY * (texts.length - 1) - 5;
  texts.forEach((text, i) => {
    pg.text(text, easing(-windowWidth, textX_padding, 10 * i), textY_padding + textY * i);
  })

  //rect
  pg.noStroke();
  pg.rect(0, 0, textX_padding, windowHeight);
  pg.stroke(180, 50, 50, 100);
  pg.strokeWeight(15);
  pg.noFill();
  pg.rect(0, 0, windowWidth, windowHeight);

  texture(pg);
  plane(windowWidth, windowHeight);

  //camera control
  camera(easing(0, windowHeight, 50), easing(0, windowHeight / 2, 50), (windowHeight / 2) / tan(PI * 30 / 180), 0, 0, 0, 0, 1, 0);
}

function mouseWheel() {
  return false;
}

function touchMoved() {
  return false;
}

function easing(startX, endX, startFrame, speedRatio = 15) {
  return startX + (endX - startX) * ease_out((frameCount - startFrame) / speedRatio);
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