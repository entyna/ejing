class Particle {
    constructor() {
      let isInBlack = false;
      while (!isInBlack) {
        this.pos = createVector(random(width), random(height));
        let c = pg.get(floor(this.pos.x), floor(this.pos.y));
        let r = red(c);
        let g = green(c);
        let b = blue(c);
        if (g > 0) {
          isInBlack = true;
        }
      }
      this.vel = createVector();
      this.acc = createVector();
      this.maxSpeed = 2;
      this.yinSpeed = 0.7;
      //let colors = [255]
      this.color = 0;
      this.lifeSpan = random(50, 200);
      this.size = 2;
      //this.opacity = 200;
      this.isStopped = false;
      this.history = []; // array to store past positions
      this.historyLength = 25;

      // Precompute random angle for YIN particles
    this.yinAngle = random(TWO_PI);
    }
  
    update() {
      let c = pg.get(floor(this.pos.x), floor(this.pos.y));
    let r = red(c);
    let g = green(c);
    let b = blue(c);
    if (r === 0 && g === 0 && b === 0) {
      // BLACK
      this.acc.set(p5.Vector.fromAngle(noise(this.pos.x * 0.01, this.pos.y * 0.01) * TWO_PI).mult(0.2));
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
    } else if (r === 0 && g === 100 && b === 0) {
      // YIN
      this.acc.set(p5.Vector.fromAngle(this.yinAngle).mult(0.2));
      this.vel.add(this.acc);
      this.vel.limit(this.yinSpeed);
      this.pos.add(this.vel);
    } else if (r === 0 && g === 1 && b === 1) {
      // UP
      this.acc.set(p5.Vector.fromAngle(noise(this.pos.x * 0.01, this.pos.y * 0.01) * PI).mult(0.2));
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
    } else if (r === 1 && g === 1 && b === 0) {
      // DOWN
      this.acc.set(p5.Vector.fromAngle(noise(this.pos.x * 0.01, this.pos.y * 0.01) * -PI).mult(0.2));
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
    } else {
      // ELSEWHERE
      this.isStopped = true;
    }
    this.lifeSpan -= 1;
    this.opacity = map(this.lifeSpan, 0, 200, 0, 255);
    this.history.unshift(createVector(this.pos.x, this.pos.y)); // add current position to the beginning of history array
    if (this.history.length > this.historyLength) {
      this.history.pop(); // remove the oldest position from history array if it exceeds the maximum length
    }
    }
  
    display() {
           
      //noStroke();
      stroke(200);
      strokeWeight(0.3);
      //this.color.setAlpha(30);
      fill(this.color);
      //ellipse(this.pos.x, this.pos.y, this.size);
      //noFill();
    
     beginShape();
     for (let i = 0; i < this.history.length; i++) {
       vertex(this.history[i].x, this.history[i].y);
     }
     endShape();
      
    }
  
    isFinished() {
    return this.lifeSpan <= 0 || this.pos.x < 0 || this.pos.x > width ||     this.pos.y < 0 || this.pos.y > height;
    }
  }