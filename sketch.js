let currentPoint = 0;
let particles = [];
let startTime = 0;
let dur = 2000; // in milliseconds
let pg;
let cg;
let HH, HM, MH1, MH2, MM, ME, EM1, EM2, EE, EH1, EH2, HE1, HE2;
let t = 0;
let ballX = 25;
let ballY = 25;
let speedX = 3;
let speedY = 2;

let points = [
   [0, 0],
   [0, 1],
   [0, 2],
   [0, 3],
   [0, 4],
   [0, 5]
];



function updatePoints(yaoValues) {
  points[0][0] = yaoValues[0];
  points[1][0] = yaoValues[1];
  points[2][0] = yaoValues[2];
  points[3][0] = yaoValues[3];
  points[4][0] = yaoValues[4];
  points[5][0] = yaoValues[5];
}

function setup() {

  var canvasDiv = document.getElementById('sketch-container');
  var divHeight = canvasDiv.offsetHeight;
  var canvas = createCanvas(windowWidth, divHeight);
  canvas.parent('sketch-container');
  pg = createGraphics(width, height);
  cg = createGraphics(width, height);
  cg.pixelDensity(0.01);
  background(0);
  
  let hMarg = height / 18;
  let hField = height / 6;
  HH = new Field(pg, width * 0.15, width * 0.85, width * 0.3, hMarg, hField, 3);
  MH1 = new Field(pg, 0, width * 0.3, width * 0.3, hMarg + hField, hField, 3);
  HM = new Field(pg, width * 0.3, width * 0.7, width * 0.3, hMarg + hField, hField, 3);
  MH2 = new Field(pg, width * 0.7, width, width * 0.3, hMarg + hField, hField, 3);
  EH1 = new Field(pg, - width*0.3, width * 0.1, width * 0.3,hMarg + 2 * hField, hField, 3);
  HE1 = new Field(pg, width * 0.1, width * 0.35, width * 0.3, hMarg + 2 * hField, hField, 3);
  MM = new Field(pg, width * 0.35, width * 0.65, width * 0.3, hMarg + 2 * hField, hField, 3);
  HE2 = new Field(pg, width * 0.65, width * 0.9, width * 0.3, hMarg + 2 * hField, hField, 3);
  EH2 = new Field(pg, width * 0.9, width * 1.3, width * 0.3, hMarg + 2 * hField, hField, 3);
  EM1 = new Field(pg, 0, width * 0.3, width * 0.3, hMarg + 3 * hField, hField, 3);
  ME = new Field(pg, width * 0.3, width * 0.7, width * 0.3, hMarg + 3 * hField, hField, 3);
  EM2 = new Field(pg, width * 0.7, width, width * 0.3, hMarg + 3 * hField, hField, 3);
  EE = new Field(pg, width * 0.15, width * 0.85, width * 0.3, hMarg + 4 * hField, hField, 3);
}

function draw() {
// SHINYYYY
shinyYang();

// FIELDS  
pg.clear();
pgFields();
image(pg, 0, 0);
  
// PARTICLES
// Add new particles
if (particles.length < 100) {
  for (let i = 0; i < 10; i++) {
    let p = new Particle();
    particles.push(p);
  }
}
// Update and display particles
let particlesToRemove = [];
for (let i = particles.length - 1; i >= 0; i--) {
  let p = particles[i];
  p.update();
  p.display();
  if (p.isFinished()) {
    particlesToRemove.push(i);
  }
}
// Remove finished particles
for (let i = particlesToRemove.length - 1; i >= 0; i--) {
  particles.splice(particlesToRemove[i], 1);
}

push();
blendMode(DIFFERENCE);
graphLine();
pop();

}

function shinyYang() {
  cg.background('black');
  cg.noStroke();
  let noiseVal = noise(frameCount * 0.005);
  diameter = map(noiseVal, 0, 1, 10, 60);
  d2 = map(noiseVal, 0, 1, 0.5, 0.9);
  cg.fill(200, 40);
  cg.ellipse(width/2, height/2, width*d2, height*d2);
  cg.ellipse(50, -50, width*d2, height*d2);
    
  for (let x = 0; x < pg.width; x+=height/5) {
    for (let y = 0; y < pg.height; y+=height/5) {
      let color = pg.get(x, y);
      if (color[0] === 255 && color[1] === 255 && color[2] === 255) {
        cg.fill('200');
        cg.circle(x, y, diameter);
      }
    }
  }
  image(cg, 0, 0);
}

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}
function fieldColor(valueA, valueB) {
  if (valueA === 0 && valueB === 0) {
    return 0;
  } else if (valueA === 1 && valueB === 1) {
    return 255;
  } else if (valueA === 1 && valueB === 0) {
    return 1;
  } else if (valueA === 0 && valueB === 1) {
    return 1;
  }
}

function fieldOpacity(valueA, valueB) {
  if (valueA === 0 && valueB === 0) {
    return 255;
  } else if (valueA === 1 && valueB === 1) {
    return 50;
  } else if (valueA === 1 && valueB === 0) {
    return 2;
  } else if (valueA === 0 && valueB === 1) {
    return 1;
  }
}

function pgFields() {
  let fieldStroke = 100;
  let fieldWeight = 0.3;
 
  pg.stroke(fieldStroke);
  pg.strokeWeight(fieldWeight);

  let color2 = fieldColor(points[2][0], points[5][0]);
  let opacity2 = fieldOpacity(points[2][0], points[5][0]);
  pg.fill(color2, opacity2);
  HH.show();

  let color1 = fieldColor(points[1][0], points[5][0]);
  let opacity1 = fieldOpacity(points[1][0], points[5][0]);
  pg.fill(color1, opacity1);
  MH1.show();
  MH2.show();

  let color4 = fieldColor(points[2][0], points[4][0]);
  let opacity4 = fieldOpacity(points[2][0], points[4][0]);
  pg.fill(color4, opacity4);
  HM.show();

  let color5 = fieldColor(points[0][0], points[5][0]);
  let opacity5 = fieldOpacity(points[0][0], points[5][0]);
  pg.fill(color5, opacity5);
  EH1.show();
  EH2.show();

  let color3 = fieldColor(points[2][0], points[3][0]);
  let opacity3 = fieldOpacity(points[2][0], points[3][0]);
  pg.fill(color3, opacity3);
  HE1.show();
  HE2.show();

  let color6 = fieldColor(points[1][0], points[4][0]);
  let opacity6 = fieldOpacity(points[1][0], points[4][0]);
  pg.fill(color6, opacity6);
  MM.show();

  let color7 = fieldColor(points[0][0], points[4][0]);
  let opacity7 = fieldOpacity(points[0][0], points[4][0]);
  pg.fill(color7, opacity7);
  EM1.show();
  EM2.show();

  let color8 = fieldColor(points[1][0], points[3][0]);
  let opacity8 = fieldOpacity(points[1][0], points[3][0]);
  pg.fill(color8, opacity8);
  ME.show();

  let color9 = fieldColor(points[0][0], points[3][0]);
  let opacity9 = fieldOpacity(points[0][0], points[3][0]);
  pg.fill(color9, opacity9);
  EE.show();
}

function graphLine() {
  let xScale = width*0.9;
  let yScale = height/6;
  let xShift = width*0.05;
  let yShift = height/9;
  push();
  stroke(255);
  fill(0)
  strokeWeight(1);
  for (let i = 0; i < points.length - 1; i++) {
    let startX = points[i][0] * xScale + xShift;
    let startY = height - points[i][1] * yScale - yShift;
    let endX = points[i+1][0] * xScale + xShift;
    let endY = height - points[i+1][1] * yScale - yShift;
    line(startX, startY, endX, endY);
  }
  pop();
}

