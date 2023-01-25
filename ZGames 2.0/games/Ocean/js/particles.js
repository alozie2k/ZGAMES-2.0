class Particle{
    constructor(game){
        this.game=game;
        this.markedforDeletion=false;
    }
    update(){
        this.x-=this.speedX+this.game.speed;
        this.y-=this.speedY
        this.size*=.97;
        //deccreases the size  of the particles everything its updated
        //making the number bigger results in samkker particles and longer particle trail
        if(this.size<0.5)
        this.markedforDeletion=true;
        //will delete particles when it gets too small
}
}

export class Dust extends Particle{
constructor(game, x, y){
//pass the x and y coordinates because the particles will depend on the players location
super(game);
//pass the game in this super
// super triggers class constructor on the Parent Class Particle activating all shared properties (like the constructor elemelnts and the update method)
this.size=Math.random()*10+10
//randomizes the sizes
this.x=x;
this.y=y;
//passing the x and y coornidate
this.speedX=Math.random()
this.speedY=Math.random()
//randomizing the speed of the particles between zero and one
this.color="rgba(255, 255, 255, 0.4)"
//give a transparent white color
};

draw(context){
context.beginPath();
context.arc(this.x,this.y, this.size,0,Math.PI*2);
// this. size is the raduis, 0 is the start angle, and the last value is the angle 
context.fillStyle=this.color;
context.fill();
//creating the particles
}
}

export class Splash extends Particle{
constructor(game,x,y){
super(game)
this.size=Math.random()*10+20
this.x=x+75
this.y=y+150;
//add -this.size*0.4/0.5 need adjust the positon of the particles lower

this.speedX=Math.random()*6-3
this.speedY=Math.random()*2+2
this.gravity=0;
//as the gravity gets stronger particles start to curve and go down 
this.color='blue';
}
update() {
super.update();
//gets the update values from the parent(particles)class
this.gravity+=0.1;
this.y+=this.gravity;
// this give the particles a curved path
}
draw(context){
    context.beginPath();
    context.arc(this.x,this.y, this.size,0,Math.PI*2);
   
    context.fillStyle=this.color;
    context.fill();
 

}
}
export class Fire extends Particle{
constructor(game,x,y){
super(game);
this.image=fire
this.size=Math.random()*80+50;
this.x=x;
this.y=y;
this.speedX=1;
this.speedY=Math.random();

//making the fire rotate 
this.angle=0;
this.va=Math.random()*0.2-0.1 
}
update(){
super.update();
this.angle+=this.va;
//increase the angle every animation frame
this.x+=Math.sin(this.angle*10)
//to give particles a wavy motion
//if you pass math.sin and an ever increasing angle vaule it willl map postion on a wavy path
}
draw(context){
context.save()
context.translate(this.x,this.y)
//to rotate something on canvas first we translate rotation center point from its default psotion 
//at coordinate 0 0 in the  top left corner of canvas
//then over the center of the item we want to rotate
//this particle is rectanguk=lar image so we are translating to its top left corner
context.rotate(this.angle)
//calling a built in rotate method that takes in the angle value in raidans 
//and rotates evrything thtas drawn after this call
//unless we restore canvas again to its orginal defaul state 


context.drawImage(this.image,0,0,this.size,this.size);
//set x and y to 0 in draw image since postion of particle in canvas is already defined in context.translate
// tried to change x and y to -this size*0.5 to center it later on
context.restore()
//to make sure the the rotation doesnt overflow to other elemets and only affect the fire partivle
//we wrap the code between save and restore to make sure all canvas settings decarled in between
//will only affect this one particle
}

}


