function Player(){
    
    //declar player vars
    this.displayY = 550;
    this.reloading = false;
    
    //update the player
    this.update = function(){
        
        if(random() < 0.5){
            particles.push(new Particle(random(190, 170), 
                                        this.displayY + 60, 
                                        0,
                                        5));
        }
        if(this.displayY <= 100){
            this.reloading = true;
        }else if(!mouseIsPressed && this.displayY < 550){
            this.reloading = true;
        }else if(this.displayY >= 550){
            this.reloading = false;
        }

        if(mouseIsPressed && this.reloading == false){
            this.displayY -= 20;
            
            particles.push(new Particle(random(190, 170), 
                                        this.displayY + 60, 
                                        0,
                                        5));
        }else{
            if(this.displayY < 550){
                this.displayY += 8;
            }
        }
    }

    this.show = function(){
        fill(107, 235, 255);
        strokeWeight(2);
        stroke(147, 197, 255);
        /*triangle(180, this.displayY, 180 - 20, this.displayY + 60, 180 + 20, this.displayY + 60);*/  
        this.tri = [];
        this.tri[0] = createVector(180, this.displayY);
        this.tri[1] = createVector(200, this.displayY + 60);
        this.tri[2] = createVector(185, this.displayY + 60);
        this.tri[3] = createVector(180, this.displayY + 45);
        this.tri[4] = createVector(175, this.displayY + 60);
        this.tri[5] = createVector(160, this.displayY + 60);
        
        
        beginShape();
        //draw the polygon from the created Vectors above.
        for(i=0; i < this.tri.length; i++){
            vertex(this.tri[i].x,this.tri[i].y);
        }
        endShape(CLOSE);
        
       
    };
    
    this.checkCollision = function(type, x, y, w, h ){
        
        
        if(type == 'c'){
            return collideCirclePoly(x, y, w, this.tri);
            
        }else if(type == 'r'){
            return collideRectPoly(x, y, w, h, this.tri, false);
        }
        
    }
}