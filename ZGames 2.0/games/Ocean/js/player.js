 import {Sitting, Running, Jumping , Falling, Rolling,Diving,Hit} from "./playerStates.js";
 import{CollisionAnimation} from "./collAni.js";
 import{FloatingMessage} from "./float.js";
 import{Fire} from "./fire.js";

 export class Player{
    //export it so you can use Player in adifferent module or class
 constructor(game){
    this.game=game;
    //can extract elemets from the game constructor like width and height
    
// taking the entire game object as an argument    
 //aka your just refrencing or pointing towards the game object
 //this gives you access to elements in the game contructer likw width and height
this.width=60
this.height=80;
//image size
this.x=0;
this.y=this.game.height-this.height+this.game.groundMargin;
//players postion

this.image=player;
//this.image=document.getElementById('player');
//javascript automatically creates
//references to all elements with IDs into the global namespace,using its ID as  a variable namespace
///using its ID as a variable namespace
//so you dont have to use getelementById

this.speed=0
//speed property 
this.maxSpeed=10;
this.vy=0;
//vertical speed

this.weight=1;
this.fps=20;
this.frameInterval=1000/this.fps;
this.frameTimer=0;
//numbers are by milisecond and help give a toimeframe to gauge until one frame moves onto the next frame
this.maxframes;
this.frameX=0;
//cycles from each frame in a pic from left to right
this.frameY=0;
//cycles through each frame from up to down
this.frametime=0;
this.sizer=1.1;

//this.states=[new Sitting(this), new Running(this), new Jumping(this), new Falling(this), new Rolling(this)];
//this refrences the entire player class(this stands for the player class since this is in the player constructor)
this.blueflame=false
this.flametime=0
this.states=[new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game),new Hit(this.game) ];
//pass this.game too them now since your game in player sate not player anymore
this.charge=true
this.charger=false
this.ctime=0;
this.ptime=0

//this.currentState=this.states[0];
//help point to indexs(location) in thu=is.states array


//this.currentState.enter();
// call the entry method to activate its intial defualt state

//need to cut both current methods since they are being called before the game object is loaded

}


 update(input,deltaTime){
//add input so the players expects the key input value being passed in player update
if(!this.game.gameOver){
this.fireCollision();


if(this.blueflame){
this.flametime++;
}

if(this.flametime==500){
   this.blueflame=false;
   this.flametime=0;
   }
   this.checkCollision();
   this.currentState.handleInput(input)
   //passing the inout value as an argument

   // attack charge time 
   if(this.charger){
      this.ctime++;
      }

      if(this.ctime==400){
         this.charge=false;
         this.ctime=0;
         }
if(!this.charge){
    this.ptime++;
}

if(this.ptime==150){
   this.charge=true;
   this.ptime=0;
   }

this.x+=this.speed;

//horizontal movement
if(input.includes('ArrowRight')&&this.currentState!=this.states[6]) 
this.speed=this.maxSpeed;
//want to check if it includes specific values(and return true/false) using .includes
else if(input.includes('ArrowLeft')&&this.currentState!=this.states[6])
this.speed=-this.maxSpeed;

else
this.speed=0
//so if the array doesnt iclude ones of the arrows the objects becomes static instead of infintely moving

//horizontal boundaries
//prevent the character from going below the ground when using diving attack

if(this.x<0)
this.x=0
if(this.x>this.game.width-this.width)
this.x=this.game.width-this.width
//this prevents player from going past the right and left edges of the game

//this.x++;
//from every animation frame you want to increase the players x
//this creates an animation of the image continously moving foward 

 
//vertical movement
this.y+=this.vy;
/*
if(input.includes("ArrowUp") && this.onGround()){
this.vy-=20;
console.log('jump');
*/
if(!this.onGround()){
this.vy+=this.weight;
//pull the object back down by decrease the y when its not on the ground/after it jumps

}else{
    this.vy=0;
    
    }
//puts vy back to zero when it touches the ground so it doenst drop off the canvas

//vertical boundries
//prevent the character from going below the ground when using diving attack
if(this.y>360)
this.y=360;

//sprite animation 
if (this.frameTimer>this.frameInterval){
  this.frameTimer=0
  if(this.frameX<this.maxframes-1){
  this.frameX++;
  this.frametime++;
   }else{
   this.frameX=0;
   }
}else{
   this.frameTimer+=10;
    
    //frame progress
}
}
}

 draw(context){

//use context as an argument to specify which canvas element we want to draw on

if(this.game.debug)
context.strokeRect(this.x,this.y,  (this.image.width/this.maxframes)*1.1,this.image.height*1.1)
context.drawImage(this.image, 
   this.frameX*(this.image.width/this.maxframes),
   this.frameY*this.image.height,
   this.image.width/this.maxframes,
   this.image.height,
   this.x, 
   this.y, 
  (this.image.width/this.maxframes)*this.sizer,
   this.image.height*this.sizer);
// between image and this.x there is
// source x=sx , source y-sy ,source width-sw, source height-sh
// use those four elements to crop out certain images in your sprite sheet


}
onGround(){
    //returns true if player is on the ground and false if player is in the air 
return this.y>=this.game.height-this.height+this.game.groundMargin;
//stop the character frm infintely going up if jumping by checking if it touching the ground
}

setState(state,speed){
   this.currentState=this.states[state]
   //set the state to the index of the states array /the value thats located there
  this.game.speed=this.game.maxSpeed*speed;
   this.currentState.enter();
}


 

checkCollision(){
  this.game.enemies.forEach(enemy => {
if(
 //y starts from bottom(bottom to top when add height) and x starts from left(left to right when you add width) 

//checking if the right side of the player image/attackbox is less than(/ passed) the far left side of the enemies attackbox/image
enemy.x<this.x+this.width&&

enemy.x+enemy.width>this.x&&
//Checks if the far left side of the enemey image/attack box is greater or pass the far left side of the player's attackbox
enemy.y<this.y+this.height&&
//checks if the top side of the enemy is above the top side of the player
enemy.y+enemy.height>this.y
//check if enemey top side is above player's bottom side
//and checks if enemy bottom side above player's top side
){
//collision dected 
enemy.markedforDeletion=true;
this.game.collisions.push(new CollisionAnimation(this.game,enemy.x+enemy.width*0.5,enemy.y+enemy.height*0.5));
if (!this.game.player.blueflame&&this.currentState===this.states[4] ||this.currentState===this.states[5]){
//4 and 5 stands for rolling and diving since thats there index placement in states array
this.game.score++;
this.game.floatingMessages.push(new FloatingMessage("+1",enemy.x,enemy.y,80,50));
console.log("true",this.game.player.blueflame)
//0,0 means the top left this is where you went the
//change 0.0 to 150 ,50 tho
}else if(this.currentState===this.states[4] ||this.currentState===this.states[5]){
   console.log("false",this.game.player.blueflame)
   this.game.score+=5;
   this.game.floatingMessages.push(new FloatingMessage("+5",enemy.x,enemy.y,80,50));
}else{
   this.setState(6,0);
   //0 equal speed want the game to stop moving when your going through the hit animation
  this.game.lives--;
  if(this.game.lives<=0)
  this.game.gameOver=true;
}

  }
});
}

fireCollision(){
   this.game.fires.forEach(fire => {
 if(
 fire.x<this.x+this.width&&
 fire.x+fire.width>this.x&&
 fire.y<this.y+this.height&&
 fire.y+fire.height>this.y
 ){
   fire.markedforDeletion=true;
   this.blueflame=true;
}
});
}

 }
