//global Vars

var score = 0;
var scrollSpeed = 5;
var scrollY;
var particles = [];
var obsticles = [];
var lvls = [];
var scaller;
var playing = false;
var mute = false;
var totalLvls = 4;
var currentLvl = {
    lvl: 0,
    levelEnd: 900
};
function preload(){
    for(i = 1; i <= totalLvls; i++){
        lvls.push(loadJSON("/Levels/Level_" + i + ".json"));
    }
    //lvls.push(loadJSON("/Levels/Level_4.json"));
   
    muteButton = loadImage("mute.png");
    unMuteButton = loadImage("un-mute.png");
    //load play button
    playButton = loadImage("play-button.png");
}


function setup(){
    
    var m1 = new Howl({
        src: ['music1.mp3'],
        autoplay: true,
        volume: 1,
        html5: false
    });

    //creates defulat canvas
    var canvasW = 360;
    var canvasH = 640;
    
    //scales canvas to fit window
    if(window.innerWidth <= window.innerHeight*.562){
        canvasW = window.innerWidth;
        canvasH = window.innerWidth * 1.778;
        console.log("long");
        scaller = window.innerWidth/360;
    }else{
        canvasW = window.innerHeight * .562;
        canvasH = window.innerHeight;
        console.log(canvasW);
        console.log("wide");
        scaller = window.innerHeight/640;
    }
    
    //create camvas
    createCanvas(canvasW, canvasH);
    
    //create player object
    player = new Player();
    
}

function draw(){
    //scalles graphics to fit canvas
    scale(scaller);
    //set the back ground color
    background(140, 218, 255);
    //when the player is playing
    
    if(mute == true){
        image(unMuteButton, 310, 10, 40, 40);
    }else{
        image(muteButton, 310, 10, 40, 40);
    }
    
    fill(0, 0, 0);
    textSize(40);
    text(score, 180, 100);
    
    if(playing){
        
        //increas scroll
        scrollY += scrollSpeed;
        //update and show all particles
        for(i = 0; i < particles.length; i++){
            particles[i].update();
            particles[i].show();
            
            if(particles[i].checkEdge() == true){
                particles.splice(i, 1);
            }
        }
        
        //update and show all obsticles
        for(i = 0; i < obsticles.length; i++){
            obsticles[i].update();
            obsticles[i].show();
        }
        
        //show and update the player
        player.show();
        player.update();

        

        if(currentLvl.levelEnd <= scrollY){
            creatLevel(); 
        }
    }else{ //if we the player is at the "home" screen
        obsticles = [];
        player = 0;
        //display the play button
        image(playButton, 130, 270);
        //check if play button is pressed
        if(collidePointRect(mouseX / scaller, mouseY / scaller, 130, 270, 100, 100) && mouseIsPressed){
            //reset player
            player = new Player();
            //play next frame
            playing = true;
            //clear obsticles
            
            //reset scroll y
            scrollY = 0;
            
            score = 0;
            
            currentLvl = {
                lvl: 0,
                levelEnd: 900
            };
            
            creatLevel();
        }
    }
}

function mousePressed(){

    if(collidePointRect(mouseX / scaller, mouseY / scaller, 310, 10, 40, 40)){
        
        if(mute == true){
            mute = false;
            Howler.volume(1);
        }else{
            mute = true;
            Howler.volume(0);
        }
        console.log(mute);
    }
}

function creatLevel(){
    //create new objects
    score++;
    lvlData = lvls[currentLvl.lvl];
    console.log(currentLvl.lvl);
    currentLvl.levelEnd = lvlData.length + scrollY;
    currentLvl.lvl++;
    if(currentLvl.lvl > totalLvls - 1){
        currentLvl.lvl = 0;
    }
    lvlObsticles = lvlData.obsticles;

    for(i = 0; i < lvlObsticles.length; i++){
        
        var obsticleData = lvlObsticles[i];
        obsticles.push(new Obsticle(obsticleData.type, 
            obsticleData.x, 
            obsticleData.y, 
            obsticleData.startingY + scrollY, 
            obsticleData.xVel, 
            obsticleData.yVel, 
            obsticleData.w, 
            obsticleData.h));
    }
}

