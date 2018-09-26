function Obsticle(type, x, y, startingY, xVell, yVell, w, h){
    this.x = x;
    this.startingY = startingY;
    this.y = y;
    this.h = h;
    this.w = w;
    this.xVell = xVell;
    this.yVell = yVell;
    this.type = type;
    
    this.show = function(){
        if(scrollY >= startingY){
            fill(81, 198, 169);
            strokeWeight(5);
            stroke(81, 174, 198);
            if(type == 'c'){
                ellipse(this.x, this.y, this.w, this.h);
            }else if(type == 'r'){
                rect(this.x, this.y, this.w, this.h);
            }
        }
    }
    
    this.update = function(){
        if(scrollY >= startingY){
            this.y += scrollSpeed + this.yVell;
            this.x += this.xVell;
            if(player.checkCollision(this.type, this.x, this.y, this.w, this.h)){
               playing = false;
            }
        }
    }
    
    
}

