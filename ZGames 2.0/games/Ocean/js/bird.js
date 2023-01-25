window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

const canvas=document.getElementById('canvas1');
const ctx=canvas.getContext('2d');
canvas.width=600;
canvas.height=400;



let spacePressed=false;
//this will flipped between true and false whenever we press through spacebar on keyboard
let angle=0;
// will used with the math.sin method to make the bird move up and down
let hue=0;
// used to cyle through a red blue and green color specturm
let frame=0;
//keeps track of frame count of animation loop so we can add any perdoric triggers to the game(like you can add a new enemy to the right of the screen every five added frames)
let score=0;
//score will increase every time you avoid an obstacle 
let gamespeed=2;
//use it to move objects  particles and backgrounds at the same speed/can also add mutiplers to this to have some objects move at differnts spped tho still relative to each other
//for example you can have the gound elements to move at full game speed  but have the backgorund move at a slower speed to create the percpetion of depth
let temp=canvas.height-90;


const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop('0.4','#fff');
gradient.addColorStop('0.54','#000');
gradient.addColorStop('0.55','#4040ff');
gradient.addColorStop('0.6','#000');
gradient.addColorStop('0.9','#fff');
// gives the score a coolr slilverish color
const background=new Image();
background.src='image/space.jpg ';
const BG= {
    //cretaing varibles 
x1:0, 
x2: canvas.width,
y:0, 
width:canvas.width,
height:canvas.height,

//drawing two backgrounds that both move on each other as the game is scrolled to the right 
//as soon as one background move to the left part of the screen it quickly jumps back to the right side so its ready to slide again
//pretty much made to make the images look like image sliders 
}
function handleBackground(){
    if(BG.x1 <= -BG.width+gamespeed) 
    BG.x1=BG.width;
    else BG.x1-=gamespeed;
//makes sure the if statments takes in account gamespeed so there is a white space created between white spaces
    if(BG.x2 <= -BG.width+gamespeed) 
    BG.x2=BG.width;
    else BG.x2-=gamespeed;
        // checks backgrounds x horizontal position is less then the image's width(negative)
    //if so it sets x1 with BG width
    // which means if background image 1 is sco=rolled all the way to its left than its entire width is hidden behind the left edge of canvas quickly move it and hide it behind the right edge of canvas so we can slide it to the left again 
    //if you get confused how BG.width pushes the background to the right edge you have to realize its just a rectangle and canvas and draws rectanglws from the top-left corner and goes to the right bottom corner coordinate which is defined by width and height of the rectangle element so if I set its x to be the right edge of canvas by saying x is equal to canvas width
    //the background rectangle is drawn from that point to the right
    //therefore its completly hidden behind the right canvas else just move background one to the left
    
    // else just move background one to along the x-axis by the amount of pixels defined in game speed variable
    //which means here the background is just endlessy moving to the left unless
    //its completly hidden behind the left edge at hich point it jumps behind the left edge which at this point it jumps behind the right edge and starts moving left again 
    ctx.drawImage(background , BG.x1,BG.y, BG.width, BG.height);
    ctx.drawImage(background , BG.x2,BG.y, BG.width, BG.height);
//for the second ctx at first only the first ctx was showing beacue you had x2 set to canvas witdh and werent doing anything with it like an else  statment like you did with x1
}
//drawing tow background images gives two identical images  scrollling next to each other creatina illusion of endless backgrounds
    // first argument-image you want to draw, second-is the x coornidate and y is the y coordinate, 3rd-width 4th-height
    //have to put the background before the animation loop




// objects movement
const playerSprite = new Image();
playerSprite.src='image/player.png'
  class Bird{
constructor (){
     this.x=150
     this.y=200;
     this.vy=0;
     //which is velocity y
     //this. width =20;
     //this.height=20;
//the height and width for a small square charcter
    this.orginalWidth=800;
    this.orginalHeight=418;
// have to find pixel height abd width of the image
//you can calculate the width of one  frame of your sprite sheet by taking your total width and dividing it by the number of image per a row 
    this.width = this.orginalWidth/13;
     this.height=this.orginalHeight/13;
     //trying to scale the orginal sprite down 20 times

     this.weight=1;
     
     //weight is force that is constantlly pulling our object down 
     // constructer holds the blueprint information
this.death=false;
this.start=false
    }
update() {
    let curve=Math.sin(angle)*20;
    //mutipler increase the range it bounces
    // makes sure that objects bounces up and down/flap around when its touches the floor of y
    if(this.y>canvas.height-(this.height*3)+curve){
        this.y=canvas.height-(this.height*3)+curve;
        console.log("vy1",bird.vy)
    console.log("weight1",bird.weight)
        this.vy=0;
        // prevents the object from dropping off the canvas
    }else if(bird.death==false&&bird.start==true){
        console.log("vy2",bird.vy)
        console.log("weight2",bird.weight)
     this.vy+=this.weight;
    this.vy+=.03;
 //this makes the objects  keep falling down or decrases its y axis
//run this in a loop
this.y+=this.vy;
console.log("vy3",bird.vy)
    console.log("weight3",bird.weight)
//add onto the object's vertical position so it can fall dowm
    }
    if(this.y<0+this.height){
     this.y=0+this.height;
     //prevents the objects from jumping off the canvas 
     this.vy=0;
     console.log("vy4",bird.vy)
    console.log("weight4",bird.weight)
    }

    if(spacePressed&&this.y>this.height*3) this.flap();
//makes the charcater jump when space is pressed 


}

draw(){
//ctx.fillStyle="red";
//ctx.fillRect(this.x, this.y, this.width, this.height);
   //draw a square player
   ctx.drawImage(playerSprite, this.x, this.y, this.width, this.height);
   //ctx.draw,Image(playerSprite, 0,0, this.orignalWidth, this.orginalHeight,this.x , this.y, this.width, this.height);
}
// attributes - 1st-image 2,34,5-is rectanglar area that we want to cut of the image , last four elements determine where you want to draw the image
flap(){
    if(bird.death==false&&bird.start==true){
    this.vy-=1.3;
    }
    // object goes up every time it flaps its wings
}
 }
 const bird=new Bird();
//particles creation 
const particlesArray=[];
class Particle{
    constructor() {
      this.x=bird.x; 
      this.y=bird.y; 
      this.size=Math.random()*7+3;
//this randomize the size of the particles(between 3 and 10)
this.speedY= (Math.random()*1)-0.5;
//triplerandomize the numbers between 0.5 and -0.5
this.color="green";
//this.color= "hsla"('+hue+ "100%+50%,0.8)';
}
//updatw is going to calculate  the postion for each particle for each frame of animation 
update(){
this.x-= gamespeed;
//particles move to the left as the game scrolls by 
 this.y+=this.speedY;
//makes the particles move up and down slightly and spread
}
draw(){
    if(bird.death==false&&bird.start==true){
    ctx.fillStyle=this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
    //this draws little circles
    ctx.fill();
    }
}
 }

function handlesParticles() {
particlesArray.unshift(new Particle);
//this takes whatever we pass to it as an attribute and adds it to the beginning of he array we call it on 
for (i=0; i<particlesArray.length; i++){

    particlesArray[i].update();
//upadte method calculates x and y current postion
//and draws a circle in the coornidates you put in update method
particlesArray[i].draw();
//draws the particles 
}
//if the particle array reaches more than 200 remove 20
if(particlesArray.length>200){
    for(let i=0; i<20; i++){
        particlesArray.pop(particlesArray[i]);
        //error here of misspeeling the array name cuase the game to freeze
        //pop removes particles 

    }
}
}

//obstacles
const obstacleArray=[];
const pipe = new Image();
pipe.src='image/flap.png'

const pipe2 = new Image();
pipe2.src='image/pipe2.png'
class Obstacle{
    constructor(){
this.top=(Math.random()*canvas.height/3)+30;
//cretaing obstales on top of obstacles
this.bottom=(Math.random()*canvas.height/3)+30;
//creating obstacles on the bottom of obstacles
//do canvas divide by three to make sure there is pace between the objects 

this.orginalWidth=800;


this.x=canvas.width;
// x position be right on the edge of canvas(guesss at the endpoint)
this.width = this.orginalWidth/13;
//determine how wide the obstacles are 
this.color = 'hsla(' + hue + ',100%,50%,1)';

    }
    draw(){
ctx.fillStyle=this.color;
ctx.drawImage(pipe2,this.x,0,this.width, this.top);
ctx.drawImage(pipe,this.x,canvas.height-this.bottom,this.width,this.bottom)
//creating the top and bottom obstacles 
    }
    update(){
this.x-=gamespeed;
this.draw();

//how the obstcales move
    }
}

function handleObstacles(){
 //trying to create a new obstacle every 50 frames in the game    
if(frame%50===0&&frame!=0){
//if stamtment saying that every time a timeframe hits a number divisible by 50 execute this if statment
//change the number it should be divisible by will increase the distances the obstacles have beetwen each other
obstacleArray.unshift(new Obstacle)
}
for (let i=0; i<obstacleArray.length; i++){
//goes through the entire obstacle array and calls update method
obstacleArray[i].update();

//calling update for each obstacle hence the i 
}
 //removing one obstacle if array is bigger than 20
 if (obstacleArray.length > 20){
     obstacleArray.pop(obstacleArray[0])
 }
}

function death(){
window.addEventListener("keydown", e=>{
    if(e.key=== "p"){
        frame=0;
     console.log("p")
     for (let i=0; i<obstacleArray.length; i++){
        //goes through the entire obstacle array and calls update method
        obstacleArray.pop(obstacleArray[i])
        //calling update for each obstacle hence the i 
        }
    ctx.clearRect(0,0, canvas.width, canvas.height);
     bird.death=false;
     score=0;
     BG.x1=0;
     BG.x2=canvas.width;
     BG.y=0;
     BG.width=canvas.width;
     BG.height=canvas.height;
    bird.x=150
    bird.y=200;
  
   
    gamespeed=2

    }  
  
    
    });

    window.addEventListener("keydown", e=>{
        if(e.key=== "s"){
       bird.start=true;
        gamespeed=2
    
        }  
      
        
        });
}

function animate(){
    death();
    //call death as function right here so when the game restarts it gives me distance between the obstacles before it handle obstacle funcion
// and restarts the game charcter to close the obstacles or in the middle of them
    ctx.clearRect(0,0, canvas.width, canvas.height);
    // this clears the entire canvas between every frame of animation
    handleBackground()
    //since you want thing s like the bird and obstacle to be drawn on top of the background 
    //got to call the background first

    bird.update();
    bird.draw();
    // ctx.fillRect(10,temp,50,50)
    //first two numbers are its coordinates 
    //draws a retangle that represents the player
    handleObstacles();
    handlesParticles();
    ctx.fillStyle = gradient;
    ctx.font = '90px Georgia';
    ctx.strokeText(score, 400, 70);
    ctx.fillText(score, 400, 70);
    handleCollisions()
    if (bird.death||!bird.start) {
       gamespeed=0;

    //frreze the game after you loss
    }else{
        angle+=0.12;
        //slows down the bouncing as you decrease the angle
      frame++;
      //this increases frame count by one for every animation loop cycle 
      hue++;
      //this helps each onstacle have a differnt color
    score++
    
    } 
    console.log("vy",bird.vy)
    console.log("weight",bird.weight)
    if(!bird.start){
        ctx.font='50px Georgia';
    ctx.fillText('Press S to Start',130, canvas.height/2)   
    ctx.font='25px Georgia';
    ctx.fillText('Tap space to fly up Plays like Flappy Bird',100, canvas.height/3)   
    }
    requestAnimationFrame(animate);
  


}
animate();

window.addEventListener('keydown' , function(e) {
// listens to the when you press a key down and records
    //console.log(e.code)
if (e.code==='Space') 
spacePressed=true;

//triple equal means we check for value(kepdown/up) and variable type

});
window.addEventListener('keyup' , function(e) {
    // listens to the when you relase a key and records
        //console.log(e.code)
    if (e.code==='Space') 
    spacePressed=false;
    
    //triple equal means we check for value(kepdown/up) and variable type
    
    });

   
    

    const bang=new Image();
    bang.src='image/fart.png'
function handleCollisions(){
    for(let i=0; i<obstacleArray.length; i++) {
     //this is to check through all the obstacles 
        if(bird.x<obstacleArray[i].x+obstacleArray[i].width&&bird.x+bird.width>obstacleArray[i].x&&
  //adding the obstacles x placment and width to get full range of the obstacles location
  ((bird.y < obstacleArray[i].top && bird.y + bird.height > 0) ||
  (bird.y > canvas.height - obstacleArray[i].bottom &&
      bird.y + bird.height < canvas.height))) {
ctx.drawImage(bang, bird.x-8, bird.y-10, 90, 90);
 // last two varibles are width &height
ctx.font='25px Georgia';
ctx.fillStyle='white'
ctx.fillText('Game Over, your score is: '+ score,160, canvas.height/2-10)
ctx.fillText('Press P to Play Again',160, canvas.height/1.8)
 //creating the game over font
 bird.death=true;
//return true;
}  


    }
 
}

/*document.onkeydown= function (e) {
    // fires an event when a key is pressed on and e  is the name of that event 
    if(e.keyCode === 38){
    console.log(e.code)
    requestAnimationFrame(animate);
}
}
*/
//learn how to restart the game by oressing p later
