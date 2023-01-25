import {Player} from "./player.js";
import {InputHandler} from "./input.js";
import{Background} from "./background.js"
import {FlyingEnemy, ClimbingEnemy, GroundEnemy} from "./enemy.js"
import {UI} from "./UI.js"
import{CollisionAnimation} from "./collAni.js";
import{Fire} from "./fire.js";

window.addEventListener('load', function(){
const canvas=document.getElementById('canvas1')
const  ctx=canvas.getContext("2d");
//when the page is fully loaded  we will point javascript towards our canvas element using its id
//I create an instance of built in 2d drawing api using getcontext method using get context method
canvas.width=500;
canvas.height=500;

class Game{
constructor(width,height){
this.width=width;
this.height=height;
this.groundMargin=-60;
this.speed=0;
this.maxSpeed=3;
this.background=new Background(this)

//need to create this before you create the player so it can take in affect
this.player=new Player(this);
//gives access to the player object
//this means this.game 
this.input=new InputHandler(this);
//this input and players are instances
//this helps execute code from the player and input hander class
// (this)means its accepts game as an argument
//this.flyingenemy= new FlyingEnemy(this);
this.UI=new UI(this);
this.enemies=[];
this.particles =[];
this.collisions=[];
this.floatingMessages=[];
this.fires=[];   
this.enemyTimer=0;
//this timer will increase by deltatime
//any time it reaches a vaule in enemy interval there be one new enemy added to the Game
// and reset enemytimer back to zero 
this.enemyInterval=1000;
//1000 miliseconds equal 1 sec
this.debug=false;
this.score=0;
this.fontColor="black";
this.gameOver=false;
this.lives=5
this.player.currentState=this.player.states[0];
this.player.currentState.enter();
//call these current methods at the end of the game boject so they are only triggered when everything is ready for the game class
}
//this is a special type of constructor  method  that gets automatically executed when we call the class and run the code inside the constructer

update(deltaTime){
//updates images 
if(!this.gameOver){
this.background.update();

this.player.update(this.input.keys,deltaTime);
//put this.input.keys inside as an argument
//so it updates the current arraylist of current active key inputs
// and checks is the inputs are in  keys array 

//also pass in deltatime as an argument so you can use it in player.update




//handle enemies
if(this.enemyTimer>this.enemyInterval){
    this.addEnemy();
    this.enemyTimer=0;
}else{
    this.enemyTimer+=15;
}

this.enemies.forEach(enemy =>{
    enemy.update(deltaTime);
    if(enemy.markedforDeletion)
    this.enemies.splice(this.enemies.indexOf(enemy),1);
    //if enemy is outside the game screen 
    //its deleted from the array using the splice method
    // the 1 is how many elements to remove at that index
    
});
//using a forEach method  executes a provided function once for each array element
// use this for arrays

//handle  particles

this.particles.forEach((particle,index) =>{
    particle.update();
    if (particle.markedforDeletion)
    this.particles.splice(index,1);
    //if enemy is outside the game screen 
    //its deleted from the array using the splice method
    // the 1 is how many elements to remove at that index
    
});
//assign index as variable name to creare an auto genertated index argument
//index identifys the particles to remove

if (this.particles.length>150){
    this.particles=this.particles.slice(0,50)
//returns a copy of an arry without the item in it that you sliced
//so it only allows the first 50 particles to be in the array after the array length reaches 50
}

//collision sprites
this.collisions.forEach((collision,index)=>{
collision.update(deltaTime);
//pass deltatime so the collison move with the game speed
if (collision.markedforDeletion)
    this.collisions.splice(index,1);
});
//messages
//cycle through all the messages in the array
this.floatingMessages.forEach(message =>{
message.update();  
});

this.floatingMessages=this.floatingMessages.filter(message=>!message.markedforDeletion)
//filter runs a provided callback function once per each element in the array
//array elements which do not pass the callback function test are skipped
//are not included in the new array
//so in this case this function makes ure the new array only includes messages that have markedfordeletion set to false
//the ones that are set to true get filterd out and are not included in the new array
//filter is a superior way to remove things out of an array


this.fires.forEach(fire=>{
    fire.update();  
    if(fire.markedforDeletion)
    this.fires.splice(this.fires.indexOf(fire),1);
    });
}
}

draw(context){
 // draw images
 this.background.draw(context);
 //console.log(this.background)
 //call it before you draw the player becuase you want the background to be behind the player 

 this.player.draw (context);

 
 this.enemies.forEach(enemy =>{
enemy.draw(context); 
 
});



this.particles.forEach(particle => {
    particle.draw(context);
    }); 


    this.collisions.forEach(collision => {
        collision.draw(context);
        }); 

        this.floatingMessages.forEach(message =>{
            message.draw(context);  
            });

            this.fires.forEach(fire =>{
                fire.draw(context); 
                });


this.UI.draw(context);

}
//this will add enemies in a specific interval 
addEnemy(){

if(this.speed>0 &&Math.random()<0.8){
//make sure ground enemies arent added when the game isnt moving/your sitting down
//math random makes sure ground enemies arent added every single time and there is only a 50% chance they are added
//random value returns a value between 0 or 1
this.enemies.push(new GroundEnemy(this))
}

if(this.speed>0 &&Math.random()<0.1){
this.fires.push(new Fire(this))
}
this.enemies.push(new FlyingEnemy(this))
//console.log(new FlyingEnemy(this))
//pushing enemies into an array
//console.log(this.enemies);

}
}




const game=new Game(canvas.width,canvas.height);
console.log(game)
//calls the game class constructor(which create sthe player)

let lastTime=0;
window.addEventListener("keydown", e=>{
    //console.log(e.key, this.keys);
    if(e.key==="p"){
        console.log('p')
        game.enemies.length=0;
        /*
        game.enemies.forEach(enemy =>{
          game.enemies.splice(game.enemies.indexOf(enemy),1);   
        });*/
        game.fires.length=0;
        /*
        game.fires.forEach(fire=>{
        game.fires.splice(game.fires.indexOf(fire),1);
            });
            */
            game.player.charge=true
            game.player.charger=false
            game.player.ctime=0;
            game.player.ptime=0
        game.player.blueflame=false
        game.gameOver=false
        game.lives=5
        game.score=0
       game.player.x=0;
       game.player.y=this.game.height-player.height+this.game.groundMargin;
      
    }
});
function animate(timeStamp){
//create the animation loop so the game can continously update and draw
// timeStamp- is autogenerate value that generates every 60 animation frames
// which is passed as an argument() in Requestanimationframe

//if you only want to see the current animation frame and dont want to get a trail of sprites/images from the old pain you clear the canvas/Rect
//so you clear the canvas eacj time you update and draw

const deltaTime= timeStamp-lastTime;
//console.log(deltaTime)
//current loop  minus previous loop in miliseconds
lastTime=timeStamp;
ctx.clearRect(0,0,canvas.width,canvas.height);
game.update(deltaTime);
game.draw(ctx)
//call game.draw from line 25
//if(!game.gameOver)
requestAnimationFrame(animate);
//gives 60 animation frames per sec
}
animate(0);
//0 is the value your passing for timestamp
});
//making sure the code runs only after all art assets have been loaded
//by placing the images inside the html page
//by putting all javascript inside a callback function on event listener for window load event
//this way javascript waits for all dependent resources such as stylesheets and images to be fully loaded 
//and available before it runs 

