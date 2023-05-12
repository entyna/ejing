class Particle {
    constructor() {
      // Check if initial position is in black area
      let isInBlack = false;
      while (!isInBlack) {
        this.pos = createVector(random(width), random(height));
        let c = pg.get(floor(this.pos.x), floor(this.pos.y));
        let r = red(c);
        let g = green(c);
        let b = blue(c);
        if (r == 0 && g == 0 && b == 0) {
          isInBlack = true;
        }
      }
      this.vel = createVector();
      this.acc = createVector();
      this.maxSpeed = 2;
      this.yinSpeed = 0.7;
      let colors = [255]
      this.color = color(random(colors));
      this.lifeSpan = random(50, 200);
      this.size = 3;
      this.opacity = 255;
      this.isStopped = false;
    }
  
    update() {
      let c = pg.get(floor(this.pos.x), floor(this.pos.y));
      
      if (red(c) == 0 && green(c) == 0 && blue(c) == 0) {
        // Move randomly in black areas
        this.acc = p5.Vector.fromAngle(noise(this.pos.x * 0.01, this.pos.y * 0.01) * TWO_PI)
                          .mult(0.2);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        
      } else if (red(c) == 0 && green(c) == 100 && blue(c) == 0) {
        // Move slowly and chaoticly in dark areas
          this.acc = p5.Vector.fromAngle(random(this.pos.x * 0.05, this.pos.y * 0.05) * TWO_PI)
                          .mult(0.2);
          this.vel.add(this.acc);
          this.vel.limit(this.yinSpeed);
          this.pos.add(this.vel);

      } else if (red(c) == 255 && green(c) == 100 && blue(c) == 0) {
        // Flow upwards in gray areas
        this.acc = createVector(0, 0.1);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.isStopped = true;
        
      } else if (red(c) == 0 && green(c) == 100 && blue(c) == 255) {
        // Flow downwards in white areas
        this.acc = createVector(0, -0.1);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.isStopped = true;
        
      } else {
        // Stop moving in white areas
        this.isStopped = true;
      }
      
      this.lifeSpan -= 1;
      this.opacity = map(this.lifeSpan, 0, 200, 0, 255);
    }
  
    display() {
           
      noStroke();
      //this.color.setAlpha(30);
      fill(this.color);
      ellipse(this.pos.x, this.pos.y, this.size);
      
    }
  
    isFinished() {
    return this.lifeSpan <= 0 || this.pos.x < 0 || this.pos.x > width ||     this.pos.y < 0 || this.pos.y > height;
    }
  }