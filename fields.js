class Field {
  constructor(pg, xpos1, xpos2, xoff, ypos, yoff, grain) {
    this.pg = pg;
    this.xpos1 = xpos1;
    this.xpos2 = xpos2;
    this.xoff = xoff;
    this.ypos = ypos;
    this.yoff = yoff;
    this.grain = grain;
  }
  
  show() {
    this.pg.beginShape();
    this.pg.vertex(this.xpos1, this.ypos);
    
    for (let y = this.ypos; y <= this.ypos + this.yoff; y += this.grain) {
      let x = map(noise(y * 0.02, frameCount * 0.002), 0, 1, this.xpos1 - this.xoff, this.xpos1 + this.xoff);
      this.pg.vertex(x, y);
    }
    
    this.pg.vertex(this.xpos1, this.ypos + this.yoff);
    this.pg.vertex(this.xpos2, this.ypos + this.yoff);
    
    for (let y = this.ypos + this.yoff; y >= this.ypos; y -= this.grain) {
      let x = map(noise(y * 0.02, frameCount * 0.002), 0, 1, this.xpos2 - this.xoff, this.xpos2 + this.xoff);
      this.pg.vertex(x, y);
    }
    
    this.pg.vertex(this.xpos2, this.ypos);
    this.pg.endShape(CLOSE);
  }
}