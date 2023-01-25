//import utils from './utils.js'




const mouse = {
    // eslint-disable-next-line no-restricted-globals
  x: canvas.clientWidth / 2,
  // eslint-disable-next-line no-restricted-globals
  y: canvas.clientHeight / 2
}


const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

let mouseDown= false
addEventListener('mousedown', () => {
  
   mouseDown=true
  
  })


addEventListener('mouseup', () => {
  
   mouseDown=false
  
  })

/
// eslint-disable-next-line no-restricted-globals
addEventListener('resize', () => {
// eslint-disable-next-line no-restricted-globals
  init()
  //call init in here to make sure when your retting the particles anytime you resize 

})

// Objects
class Particle {
  constructor(x1, y1, radius, color) {
    this.x1 = x1
    this.y1 = y1
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x1, this.y1, this.radius, 0, Math.PI * 2, false)
    c.shadowColor = this.color
    //setting it to how big you want the glow to be
    //how you make the stars/particles  glow
    c.shadowBlur=15
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
  }
}



// Implementation
let particles
//defining particles outside the init function
function init() {
  particles = []
  //initializing particle as an array within it 

  for (let i = 0; i < 600; i++) {
    const canvasWidth=canvas.width+300
    const canvasHeight=canvas.height+300
    const x1=Math.random()*canvasWidth-canvasWidth/2;
    //cleaner to create variable first and put that varible inside Partciles construct
   //times canvas width makes sure we get a value between zero and canvas.width
   const y1=Math.random()*canvasHeight-canvasHeight/2;
  const radius=2*Math.random()
  const color=colors[Math.floor(Math.random() * colors.length)]
  //math.floor rounds the number
   particles.push(new Particle(x1,y1,radius,color))
  // console.log(particles)
  }
}
//to push objects in a array and render them out to their canvas 

 
let radians=0
// Animation Loop
let alpha=1
//use let when you want to edit a value 
function animate() {
 

  c.clearRect(0, 0, canvas.width, canvas.height)
//clear rect clears the canvas anytime we are running through the animation loop


c.fillStyle=`rgba(10,10,10,${alpha})`
//${} is a template literal which allows you to insert a varibale in a string
//have to use backticks instead of qoutes
c.fillRect(0, 0, canvas.width, canvas.height)

//c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  
   c.save()
   c.translate(canvas.width/2, canvas.height/2)
   c.rotate(radians)
   //rotates the canvas
   //(raidans)
   particles.forEach(particle => {
    particle.update()
    })
   c.restore()
   

   radians+=0.001
   if(mouseDown&&alpha>=0.01){
     alpha-=0.01
     //creates light trails
   }else if (!mouseDown&&alpha<1){
     alpha+=0.01
   }

  // Loop through the dots array and project every dot
  for (let i = 0; i < dots.length; i++) {
    dots[i].project();
  }
  
  // Sort dots array based on their projected size
  dots.sort((dot1, dot2) => {
    return dot1.sizeProjection - dot2.sizeProjection;
  });

   for (var i = 0; i < dots.length; i++) {
    dots[i].draw();
  }
 window.requestAnimationFrame(animate)
}


/*
function afterResize () {
  width = canvas.offsetWidth;
  height = canvas.offsetHeight;
  if (window.devicePixelRatio > 1) {
    canvas.width = canvas.clientWidth * 2;
    canvas.height = canvas.clientHeight * 2;
    c.scale(2, 2);
  } else {
    canvas.width = width;
    canvas.height = height;
  }
  PROJECTION_CENTER_X = width / 2;
  PROJECTION_CENTER_Y = height / 2;
  PERSPECTIVE = width * 0.8;
  GLOBE_RADIUS = Math.min(width, height) * 0.4;
  DOTS_AMOUNT = Math.min(width, height);
  
  createDots(); // Reset all dots
}

// Variable used to store a timeout when user resized its screen
let resizeTimeout;
// Function called right after user resized its screen
function onResize () {
  // Clear the timeout variable
  resizeTimeout = window.clearTimeout(resizeTimeout);
  // Store a new timeout to avoid calling afterResize for every resize event
  resizeTimeout = window.setTimeout(afterResize, 500);
}
window.addEventListener('resize', onResize);

// Populate the dots array with random dots

*/
// Render the scene
createDots();
init()
window.requestAnimationFrame(animate)
