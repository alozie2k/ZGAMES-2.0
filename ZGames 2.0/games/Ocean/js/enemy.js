class Enemy{
    constructor(){
    this.frameX=0;
    this.frameY=0
    this.fps=20;
    this.frameInterval=1000/this.fps;
    this.frameTimer=0;
    this.image;
    this.maxframes;
    this.markedforDeletion=false
    this.scale
    }
    update(deltaTime){
        // will need acess to deltaTime
//movement
this.x-=this.speedX*this.game.speed;
this.y+=this.speedY;
if(this.frameTimer>this.frameInterval){
 this.frameTimer=0;
 if(this.frameX<this.maxframes-1)
 this.frameX++;
 else this.frameX=0;
}else{
    this.frameTimer+=13
}
//check if enemy is off screen
if(this.x+this.width<-25)
this.markedforDeletion=true;

    }
draw(context){
    
    if(this.game.debug)
context.strokeRect(this.x,this.y,(this.image.width/this.maxframes)*this.scale, this.image.height*this.scale)
context.drawImage(this.image, 
   this.frameX*(this.image.width/this.maxframes),
   this.frameY*this.image.height,
   this.image.width/this.maxframes,
   this.image.height,
   this.x, 
   this.y, 
  (this.image.width/this.maxframes)*this.scale,
   this.image.height*this.scale);

}
}

export class FlyingEnemy extends Enemy{
constructor(game){
super();
this.game=game;
//enemies  need to be aware of the game area width and height so they know when they are offscreen 
this.width=60;
this.height=44;
this.x=this.game.width;
//radnomize wjere they appear horizontally 
this.y=Math.random()*this.game.height*0.4;
//randomizes where they appear in upper part of the y axis
//this.speedX=2
this.speedX=Math.random()*3;
//horizontal speed
//randomize the speed of each enemy
this.speedY=0;
this.maxframes=4;
this.image=fly;

this.angle =0;
this.va=Math.random()*0.1+0.1;
//varibles to make flying enemies move in a wavy direction 
this.scale=.7

}
update(deltaTime) {
   super.update(deltaTime); 
   //this.y+=Math.sin(this.angle);
   //makes them move in a wavy motion
}


}

export class GroundEnemy extends Enemy{
    constructor(game){
        super();
        this.game=game;
        this.width=60;
        this.height=87;
        this.image=jelly;
        this.x=this.game.width;
        this.y=this.game.height-this.image.height-this.game.groundMargin+55;
        this.speedX=Math.random()*3;
        this.speedY=0;
        this.maxframes=4;
        this.scale=.3

    }

}

export class ClimbingEnemy extends Enemy{

}