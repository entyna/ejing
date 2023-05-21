class Particle {
    constructor() {
      let isInBlack = false;
      while (!isInBlack) {
        this.pos = createVector(random(width), random(height));
        let c = pg.get(floor(this.pos.x), floor(this.pos.y));
        let a = alpha(c);
        if (a > 0) {
          isInBlack = true;
        }
      }
      this.vel = createVector();
      this.acc = createVector();
      this.maxSpeed = 0.02;
      this.yinSpeed = 0.002;
      this.size = random(1, 2.5);
      this.strokeThick = 0.7;
      this.strokeCol = 180;
      this.colOptions = [0, 180];
      this.fillCol = random(this.colOptions);
      this.lifeSpan = random(100, 200);
      this.isStopped = false;
      this.history = [];
      this.historyLength = height/40;

    this.yinAngle = random(TWO_PI);
    }
  
    update() {
    let c = pg.get(floor(this.pos.x), floor(this.pos.y));
    let r = red(c);
    let a = alpha(c);
 
    if (a > 0 && a < 2) {
      // UP
      this.acc.set(p5.Vector.fromAngle(noise(this.pos.x * 0.01, this.pos.y * 0.01) * PI).mult(0.2));
      this.vel.add(this.acc.mult(deltaTime)); // Multiply acceleration by deltaTime
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel.mult(deltaTime));
    } else if (r >= 200) {
      //YANG
      let index = particles.indexOf(this);
      if (index !== -1) {
        particles.splice(index, 1);
      }
    } else if (r === 0 && a===255) {
      //YIN
      this.acc.set(p5.Vector.fromAngle(this.yinAngle).mult(0.2));
      this.vel.add(this.acc.mult(deltaTime));
      this.vel.limit(this.yinSpeed);
      this.pos.add(this.vel.mult(deltaTime));
    } else if (a > 2 && a < 5) {
      // DOWN
      this.acc.set(p5.Vector.fromAngle(noise(this.pos.x * 0.01, this.pos.y * 0.01) * -PI).mult(0.2));
      this.vel.add(this.acc.mult(deltaTime)); // Multiply acceleration by deltaTime
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel.mult(deltaTime));
    }
    // else {
    //   this.isStopped = true;
    // }

    
    this.lifeSpan -= 1;
    this.opacity = map(this.lifeSpan, 0, 200, 0, 255);
    this.history.unshift(createVector(this.pos.x, this.pos.y)); // add current position to the beginning of history array
    
    if (this.history.length > this.historyLength) {
      this.history.pop(); // remove the oldest position from history array if it exceeds the maximum length
    }
    }
  
    display() {
     let c = pg.get(floor(this.pos.x), floor(this.pos.y));
     let a = alpha(c);
    
    
    
    
    if (a > 250) {
      fill(255);
      noStroke();
      circle(this.pos.x, this.pos.y, this.size);
    } else {
      fill(this.fillCol);
      stroke(this.strokeCol);
      strokeWeight(this.strokeThick);
      beginShape();
      for (let i = 0; i < this.history.length; i++) {
        vertex(this.history[i].x, this.history[i].y);
      }
      endShape();
    }
    }
  
    isFinished() {
    return this.lifeSpan <= 0 || this.pos.x < 0 || this.pos.x > width ||     this.pos.y < 0 || this.pos.y > height;
    }
  }