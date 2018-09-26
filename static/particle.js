function Particle(sX, sY, yVel, radius){
    this.yVel = yVel;
    this.x = sX;
    this.y = sY;
    this.r = radius;
    this.fade = 255;
    this.g = random(178, 200);
    this.b = random(180, 255)
    
    
    this.update = function(){
      this.y += scrollSpeed + this.yVel;
    };
    
    this.show = function(){
      strokeWeight(this.r);
      stroke(0, this.g, this.b, this.fade)
      this.fade -= 20;
      point(this.x, this.y);
    };
    
    this.checkEdge = function(){
        return this.y > 640 || this.fade <= 0;
    }
}