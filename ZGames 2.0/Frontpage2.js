const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')
// eslint-disable-next-line no-restricted-globals
canvas.width = canvas.clientWidth
// eslint-disable-next-line no-restricted-globals
canvas.height = canvas.clientHeight
if (window.devicePixelRatio > 1) {
  canvas.width = canvas.clientWidth * 2;
  canvas.height = canvas.clientHeight * 2;
  c.scale(2, 2);
}


function getTexture(emoji) {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCanvas.width = 60;
    tempCanvas.height = 80;
    tempCtx.textAlign = 'center';
    tempCtx.textBaseline = 'middle';
    tempCtx.font = '54px serif';
    tempCtx.fillText(emoji, 30, 35);
    return tempCanvas;
  }
  const textures = [getTexture('🎮'), getTexture('🎮'), getTexture('🎮'), getTexture('🎮')];



  let width = canvas.offsetWidth; // Width of the canvas
  let height = canvas.offsetHeight; // Height of the 
  const dots=[]// Store every particle in this array
  // Create 800 new dots
let DOTS_AMOUNT = Math.max(width, height)
const DOT_RADIUS =15;
let PROJECTION_CENTER_X = width / 2; // x center of the canvas
let PROJECTION_CENTER_Y = height / 2; // y center of the canvas

let PERSPECTIVE

//if(width>=420){
PERSPECTIVE = width * 0.8
//}else{
//PERSPECTIVE = canvas.width * 50;   
//}
console.log(canvas.width)
 // The field of view of our 3D scene

 // Radius of the dots
let GLOBE_RADIUS = canvas.width / 2; // Radius of the globe based on the canvas width

class Dot {
  constructor() {
    this.theta = Math.random() * 2 * Math.PI; // Random value between [0, 2Pi]
    this.phi = Math.acos((Math.random() * 2) - 1); // Random value between [0, Pi]
    this.texture = textures[Math.floor(Math.random() * textures.length)];
   
    this.x = 0; // Give a random x position
    this.y = 0; // Give a random y position
    this.z = 0; // Give a random z position

    this.radius = Math.random() * (GLOBE_RADIUS * 0.2) + (GLOBE_RADIUS * 0.8);
    
    this.xProjected = 0; // x coordinate on the 2D world
    this.yProjected = 0; // y coordinate on the 2D world
    this.scaleProjected = 0; // Scale of the element on the 2D world (further = smaller)
   
    TweenMax.to(this, 40, {
      theta: this.theta + Math.PI * 2,
      repeat: -1,
      ease: Power0.easeNone
    });
    

}
  // Project our element from its 3D world to the 2D canvas
  project() {
 
    this.x = this.radius * Math.sin(this.phi) * Math.cos(this.theta);
    this.y = this.radius * Math.cos(this.phi);
    this.z = this.radius * Math.sin(this.phi) * Math.sin(this.theta) + this.radius;
    
    this.scaleProjected = PERSPECTIVE / (PERSPECTIVE + this.z);
    this.xProjected = ((this.x * this.scaleProjected) + PROJECTION_CENTER_X)
   // +canvas.width/2.8;
    this.yProjected = ((this.y * this.scaleProjected) + PROJECTION_CENTER_Y)
    //+canvas.height/2.2;
  }
  // Draw the dot on the canvas
  draw() {
    // We first calculate the projected values of our dot
    c.drawImage(this.texture, this.xProjected - DOT_RADIUS, this.yProjected - DOT_RADIUS, DOT_RADIUS * 2 * this.scaleProjected, DOT_RADIUS * 2 * this.scaleProjected)
  }
 
}

 function createDots(){
 // Loop through the dots array and project every dot

dots.length = 0;
for (let i = 0; i < DOTS_AMOUNT; i++) {
  // Create a new dot and push it into the array
 dots.push(new Dot());
 // console.log(dots)
 // console.log(dots.length)
}
}


