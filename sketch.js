let currentPoint = 0;
let particles = [];
let startTime = 0;
let dur = 2000; // in milliseconds
let pg;
let HH, HM, MH, MM, ME, EM, EE, EH, HE;
//let cg;

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
  
  //clearCanvas();
}

// function clearCanvas() {
//   clear();
//   background(0);
// }

function setup() {
  var canvasDiv = document.getElementById('sketch-container');
  var divHeight = canvasDiv.offsetHeight;
  var canvas = createCanvas(windowWidth, divHeight);
  canvas.parent('sketch-container');
  //pixelDensity(1);
  pg = createGraphics(width, height);
  
  //cg = createGraphics(width, height);
  //cg.pixelDensity(0.01);
  let hMarg = height / 12;
  let hField = height / 6;
  HH = new Field(pg, width * 0.7, width * 0.2, hMarg, hField, 5);
  MH = new Field(pg, width * 0.2, width * 0.2, hMarg + hField, hField, 5);
  HM = new Field(pg, width * 0.6, width * 0.2, hMarg + hField, hField, 5);
  EH = new Field(pg, width * 0.1, width * 0.2, hMarg + 2 * hField, hField, 5);
  HE = new Field(pg, width * 0.2, width * 0.2, hMarg + 2 * hField, hField, 5);
  MM = new Field(pg, width * 0.57, width * 0.2, hMarg + 2 * hField, hField, 5);
  EM = new Field(pg, width * 0.2, width * 0.2, hMarg + 3 * hField, hField, 5);
  ME = new Field(pg, width * 0.6, width * 0.2, hMarg + 3 * hField, hField, 5);
  EE = new Field(pg, width * 0.7, width * 0.2, hMarg + 4 * hField, hField, 5);
}

function draw() {
  background('rgba(0,0,0, 0.1)');
  pg.background(255);
  pgFields();
  //image(pg, 0, 0);
  

  // Add new particles
  if (particles.length < 150) {
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

  // Remove finished particles outside the loop
  for (let i = particlesToRemove.length - 1; i >= 0; i--) {
    particles.splice(particlesToRemove[i], 1);
  }

  graphLine();
}

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}

//function yangLowDen() {
  //cg.background(0);
  // cg.clear();
  // for (let x = 0; x < pg.width; x+=60) {
  //   for (let y = 0; y < pg.height; y+=40) {
  //     let color = pg.get(x, y); // Get the color of the pixel
      
  //     // Check if the color is white (255, 255, 255)
  //     if (color[0] === 255 && color[1] === 255 && color[2] === 255) {
  //       cg.fill(250);
  //       cg.noStroke();
  //       //let noiseVal = noise(frameCount * 0.005);
  //       //diameter = map(noiseVal, 0, 1, 10, 100);
  //       cg.circle(x, y, 50);
  //     }
  //   }
  // }
  
  // image(cg, 0, 0);
//}

function pgFields() {
  pg.stroke(0);
  pg.strokeWeight(2);
  pg.fill(points[2][0]*255, 100, points[5][0]*255);
  HH.show();
  pg.fill(points[1][0]*255, 100, points[5][0]*255);
  MH.show();
  pg.fill(points[2][0]*255, 100, points[4][0]*255);
  HM.show();
  pg.fill(points[0][0]*255, 100, points[5][0]*255);
  EH.show();
  pg.fill(points[2][0]*255, 100, points[3][0]*255);
  HE.show();
  pg.fill(points[1][0]*255, 100, points[4][0]*255);
  MM.show();
  pg.fill(points[0][0]*255, 100, points[4][0]*255);
  EM.show();
  pg.fill(points[1][0]*255, 100, points[3][0]*255);
  ME.show();
  pg.fill(points[0][0]*255, 100, points[3][0]*255);
  EE.show();
}
function graphLine() {
  // linka nahoře
  let xScale = width*0.9;
  let yScale = height/6;
  let xShift = width*0.05;
  let yShift = height/12;
  push();
  translate(width, 0);
  scale(-1, 1);
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
  for (let i = 0; i < points.length; i++) {
    let x = points[i][0] * xScale + xShift;
    let y = height - points[i][1] * yScale - yShift;
    circle(x, y, 10);
  }
  pop();
}


