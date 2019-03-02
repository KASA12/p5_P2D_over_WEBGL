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
  if (frameCount < 190) {
    scene1();
  } else if (frameCount < 290) {
    scene2(190);
  } else if(frameCount < 310) {
    scene3(290);
  } else {
    frameCount = 0;
  }
  console.log(frameCount);
}

function scene1() {
  const backgroundColor = color(340, 5, 100, 100);
  const baseColor = color(340, 80, 70, 100);

  const texts = ["P2D", "over", "WEBGL"];
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

  //line
  // pg.line(0, windowHeight / 2, windowWidth, windowHeight / 2);//x
  // pg.line(windowWidth / 2, 0, windowWidth / 2, windowHeight);//y

  //text
  pg.textAlign(LEFT, BOTTOM);
  pg.strokeWeight(5);
  pg.textSize(200);
  pg.fill(baseColor);
  pg.textFont("Helvetica");
  texts.forEach((text, i) => {
    pg.text(text, easing(-windowWidth - textWidth(text), textX_padding, 15 * (i + 1)), textY_padding + textY * i);
  });

  //asterisk
  pg.strokeWeight(5);
  pg.textSize(200);
  pg.noStroke();
  pg.fill(backgroundColor);
  pg.text("*", easing(windowWidth / 3, textX_padding / 2 - 15, 15), textY_padding);
  //plane
  texture(pg);
  plane(windowWidth, windowHeight);

  //camera control
  camera(
    easing(0, windowHeight, 75, 20),
    easing(0, windowHeight / 2, 78, 20),
    (windowHeight / 2) / tan(PI * 30 / 180),
    // easing(0, -windowWidth + textX_padding * 3, 80, 70, "inout"),
    // easing(0, -windowHeight + textY_padding + textY * 3 + 35, 80, 70, "inout"),
    easing(0, -windowWidth / 2 + textX_padding / 2 + 32, 115, 70, "inout"),
    easing(0, -windowHeight / 2 + textY_padding - 75, 120, 70, "inout"),
    0,
    0, 1, 0);

  //perspective
  perspective(easing(PI / 3, PI / 350, 110, 70, "in"), windowWidth / windowHeight, 0.1, 3000);
}

function scene2(startFrameCount) {
  const nowFrameCount = frameCount - startFrameCount;
  const backgroundColor = color(340, 80, 70, 100);
  const ASTERISK_Y = windowHeight / 2 + 125;
  background(backgroundColor);

  pg.background(backgroundColor);
  pg.fill(340, 5, 100, 100);
  pg.noStroke();
  pg.textFont("Helvetica");
  pg.textAlign(CENTER, CENTER);

  pg.textSize(24);
  pg.fill(
    340,
    easing(80, 5, 0, 3, "inout", nowFrameCount),
    easing(70, 100, 0, 3, "inout", nowFrameCount),
    100
  );
  pg.text("This Sketch is Powered by", windowWidth / 2, ASTERISK_Y - 300);

  pg.textSize(500);
  pg.fill(340, 5, 100, 100);
  pg.push();
  pg.translate(windowWidth / 2, easing(-windowHeight / 2, windowHeight / 2, 10, 20, "out", nowFrameCount));
  pg.rotate(PI / 6 * nowFrameCount * 0.05);
  pg.text(
    "*",
    0,
    125
  );
  pg.pop();
  pg.textSize(80);
  pg.text(
    "p5.js",
    windowWidth / 2, easing(-windowHeight / 2, ASTERISK_Y + 10, 10, 20, "out", nowFrameCount)
  );

  texture(pg);
  plane(windowWidth, windowHeight);

  //camera control
  camera(
    0,
    easing(0, windowHeight, 80, 20, "in", nowFrameCount),
    (windowHeight / 2) / tan(PI * 30 / 180),
    0,
    easing(0, windowHeight, 80, 20, "in", nowFrameCount),
    0,
    0, 1, 0);

  //perspective
  perspective(PI / 3, windowWidth / windowHeight, 0.1, 3000);
}

function scene3(startFrameCount) {
  const nowFrameCount = frameCount - startFrameCount;
  const backgroundColor = color(340, 80, 70, 100);
  const nextBackgroundColor = color(340, 5, 100, 100);
  const textX_padding = windowWidth / 5;

  background(backgroundColor);

  //rect
  pg.background(nextBackgroundColor);
  pg.noStroke();
  pg.fill(backgroundColor);
  pg.rect(0, 0, textX_padding, windowHeight);
  pg.stroke(backgroundColor);
  pg.strokeWeight(15);
  pg.noFill();
  pg.rect(0, 0, windowWidth, windowHeight);

  pg.fill(backgroundColor);
  pg.rect(
    0,
    easing(0, -windowHeight, 0, 20, "in", nowFrameCount),
    windowWidth,
    windowHeight
  );

  texture(pg);
  plane(windowWidth, windowHeight);

  camera(
    0,
    0,
    (windowHeight / 2) / tan(PI * 30 / 180),
    0,
    0,
    0,
    0, 1, 0);
  perspective(PI / 3, windowWidth / windowHeight, 0.1, 3000);
}

function mouseWheel() {
  return false;
}

function touchMoved() {
  return false;
}

function easing(start, end, startFrame, speedRatio = 20, type = "out", nowFrameCount = frameCount) {
  if (type === "in") {
    return start + (end - start) * ease_in((nowFrameCount - startFrame) / speedRatio);
  } else if (type === "out") {
    return start + (end - start) * ease_out((nowFrameCount - startFrame) / speedRatio);
  } else if (type === "inout") {
    return start + (end - start) * ease_inout((nowFrameCount - startFrame) / speedRatio);
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

