export class Fire{
    constructor(game){
    this.game=game
    this.frameX=0;
    this.frameY=0;
    this.fps=20;
    this.frameInterval=1000/this.fps;
    this.frameTimer=0;
    this.image=fireani;
    this.maxframes=8;
    this.markedforDeletion=false;
    this.scale=.6;
    this.x=this.game.width;
    this.y=Math.random()*this.game.height*0.4;
this.speedX=Math.random()*1;
this.speedY=0;
this.height=this.image.height;
this.width=this.image.width/8
    }
    update(deltaTime){
this.x-=this.speedX+this.game.speed;
this.y+=this.speedY;
if(this.frameTimer>this.frameInterval){
 this.frameTimer=0;
 if(this.frameX<this.maxframes-1)
 this.frameX++;
 else this.frameX=0;
}else{
    this.frameTimer+=13
}

if(this.x+this.width<-25)
this.markedforDeletion=true;
}
draw(context){
    

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