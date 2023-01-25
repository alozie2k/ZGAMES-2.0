export class CollisionAnimation {
    constructor (game, x, y){
    this.game=game
    this.image =boom
    //to manipluate the size of the explosion
    this.spriteWidth = 100;
    this.spriteHeight = 90;
    this.sizeModifier = Math.random() + 0.5
    this.width=this.spriteWidth*this.sizeModifier
    this.height=this.spriteHeight*this.sizeModifier
this.x=x-this.width*0.5
this.y=y-this.height*0.5
//since its a rectangular image you want x and y postion to in the middle of the image
//u do this by calulating the width/height of the animation(which is why u put x/y only after width/height is calculated)
// the times it by .5 to get half the width/height thefore getting the middle
this.scale=2
this.frameX = 0;
this.maxframes = 4;
this.markedForDeletion=false
this.fps=Math.random()*10+5;
this.frameInterval=1000/this.fps
this.frameTimer=0;
}

draw(context) {
context.drawImage(this.image, this.frameX*this.spriteWidth, 0, this.spriteWidth,
this.spriteHeight, this.x, this.y, this.width, this.height);
}
update(deltaTime){
    this.x -= this.game.speed;
    if(this.frameTimer>this.frameInterval){
        this.frameX++;
        this.frameTimer=0
    }else{
        this.frameTimer+=deltaTime;
    }
    
    if(this.frameX > this.maxframes-1) 
    this.markedForDeletion = true;
    
    }
}