let currentPoint = 0;
let particles = [];
let startTime = 0;
let dur = 2000; // in milliseconds
let pg;
let cg;
let HH, HM, MH, MM, ME, EM, EE, EH, HE;
let t = 0;

let points = [
   [1, 0],
   [1, 1],
   [1, 2],
   [1, 3],
   [1, 4],
   [1, 5]
];



function updatePoints(yaoValues) {
  points[0][0] = yaoValues[0];
  points[1][0] = yaoValues[1];
  points[2][0] = yaoValues[2];
  points[3][0] = yaoValues[3];
  points[4][0] = yaoValues[4];
  points[5][0] = yaoValues[5];

  print(points[0][0]);
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
  HH = new Field(pg, width * 0.85, width * 0.3, hMarg, hField, 3);
  MH = new Field(pg, width, width * 0.3, hMarg + hField, hField, 3);
  HM = new Field(pg, width * 0.7, width * 0.15, hMarg + hField, hField, 3);
  EH = new Field(pg, width * 1.3, width * 0.3, hMarg + 2 * hField, hField, 3);
  HE = new Field(pg, width * 0.9, width * 0.3, hMarg + 2 * hField, hField, 3);
  MM = new Field(pg, width * 0.65, width * 0.15, hMarg + 2 * hField, hField, 3);
  EM = new Field(pg, width, width * 0.3, hMarg + 3 * hField, hField, 3);
  ME = new Field(pg, width * 0.3, width * 0.15, hMarg + 3 * hField, hField, 3);
  EE = new Field(pg, width * 0.85, width * 0.3, hMarg + 4 * hField, hField, 3);
}

function draw() {
  //background(0);
  //background('rgba(0,0,0, 0.05)');
  //pg.background(200, 0, 200);
  cg.background(0);
  cg.circle(width/2, height/2, width/2, height/2);
  image(cg, 0, 0);
  pg.clear();
  pgFields();

  //  // Horizontal lines in pg
  //  push();
  //  pg.stroke(0,0,0);
  //  pg.strokeWeight(4)
  //  let spacing = height / 6;
  //  let marg = height / 12;
  //  for (let i = 0; i < 6; i++) {
  //    pg.line(0, marg, width, marg);
  //    marg += spacing;
  //  }
  //  pop();
  //let opacity = noise(t) * 255;
  //push();
  //tint(255, opacity);
  //blendMode(LIGHTEST);
  image(pg, 0, 0);
  //t += 0.1;
  //pop();

 

  // Add new particles
  if (particles.length < 100) {
    for (let i = 0; i < 10; i++) {
      let p = new Particle();
      particles.push(p);
    }
  }
  
  // // Update and display particles
  // let particlesToRemove = [];
  // for (let i = particles.length - 1; i >= 0; i--) {
  //   let p = particles[i];
  //   p.update();
  //   p.display();
  //   if (p.isFinished()) {
  //     particlesToRemove.push(i);
  //   }
  // }

  // // Remove finished particles outside the loop
  // for (let i = particlesToRemove.length - 1; i >= 0; i--) {
  //   particles.splice(particlesToRemove[i], 1);
  // }

  graphLine();

  
}

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}


function pgFields() {
  let fieldStroke = 255;
  let fieldWeight = 0.1;
  let mult = 255;
  //let g = 1;
  pg.stroke(fieldStroke);
  pg.strokeWeight(fieldWeight);
  pg.fill(points[5][0]+points[2][0], (1-abs(points[5][0]-points[2][0]))*mult);
  HH.show();
  pg.fill(points[5][0]+points[1][0], (1-abs(points[5][0]-points[1][0]))*mult);
  MH.show();
  //pg.noStroke();
  pg.fill(points[4][0]+points[2][0], (1-abs(points[4][0]-points[2][0]))*mult);
  HM.show();
  pg.fill(points[5][0]+points[0][0], (1-abs(points[5][0]-points[0][0]))*mult);
  EH.show();
  //pg.noStroke();
  pg.fill(points[3][0]+points[2][0], (1-abs(points[3][0]-points[2][0]))*mult);
  HE.show();
  pg.fill(points[1][0]+points[4][0], (1-abs(points[1][0]-points[4][0]))*mult);
  MM.show();
  pg.fill(points[0][0]+points[4][0], (1-abs(points[0][0]-points[4][0]))*mult);
  EM.show();
  //pg.noStroke();
  pg.fill(points[1][0]+points[3][0], (1-abs(points[1][0]-points[3][0]))*mult);
  ME.show();
  pg.fill(points[0][0]+points[3][0], (1-abs(points[0][0]-points[3][0]))*mult);
  EE.show();
}
function graphLine() {
  // linka nahoře
  let xScale = width*0.9;
  let yScale = height/6;
  let xShift = width*0.05;
  let yShift = height/9;
  push();
  //translate(width, 0);
  //scale(-1, 1);
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
  // for (let i = 0; i < points.length; i++) {
  //   let x = points[i][0] * xScale + xShift;
  //   let y = height - points[i][1] * yScale - yShift;
  //   circle(x, y, 10);
  // }
  pop();
}

