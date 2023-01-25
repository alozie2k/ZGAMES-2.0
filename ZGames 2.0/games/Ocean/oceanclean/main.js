import './style.css'


import * as THREE from 'three';

			//import Stats from './jsm/libs/stats.module.js';

			//import { GUI } from 'three/jsm/libs/lil-gui.module.min.js';
			import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
			import { Water } from 'three/examples/jsm/objects/Water.js';
			import { Sky } from 'three/examples/jsm/objects/Sky.js';
      import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
   //  import TextSprite from '@seregpie/three.text-sprite';
     //https://github.com/SeregPie/THREE.TextSprite
	 //have to do npm i @seregpie/three.text-sprite first

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

		//	let container, stats;
			let camera, scene, renderer;
			let controls, water, sun;
      //mesh;
const loader=new GLTFLoader();
//loader instance  that loads your 3D Model 

function random(min, max) {
	return Math.random() * (max - min) + min;
  }
  //giving us random numbers between the min and max numbers

  /*
  const loader2 =new THREE.FontLoader()
loader2.load('fonts/BEJITA ExtBd_Regular',function(font:THREE.Font){
const geometry= new THREE.textGeometry('Hi./n How are you',{
font:font,
size:6,
height:2
})

const textMesh = new THREE.Mesh(geometry, [
	new THREE.MeshPhongMaterial({ color: 0xad4000 }), // front
	new THREE.MeshPhongMaterial({ color: 0x5c2301 }) // side
])
textMesh.castShadow=true
textMesh.position.y+=15
textMesh.position.z-=40
textMesh.position.x-=8
textMesh.rotation.y-=.50
});
*/
class Boat{
  constructor(){
//loader.load("assets/boat/scene.gltf", function(gltf){
//since its already in side a class we dont eant to use finction(gltf) becuase it creates a new context
  //console.log(gltf)
  loader.load("assets/boat/scene.gltf", (gltf)=>{
scene.add(gltf.scene)
//adds the object to the canvas  
gltf.scene.scale.set(150,150,150)

//cant see the object at first because its under the water
// so you set the object to a visible postion
gltf.scene.position.set(5,5,55)
//x,y,z
gltf.scene.rotation.y=1.5

this.boat=gltf.scene
//so whenever we call this.boat we will acess the whole gltf above
 
this.speed={
  vel:0,
  //velocity
  rot:0
  //rotation
}

})
// the function() part is a callback function which recives the loaded gltf 
  }

  stop(){
    this.speed.vel = 0
    this.speed.rot = 0
  }
  //stops the boat from moving when keys are relased

  //handle methods
  update(){
if(this.boat){
 // this.boat.rotation.y-=0.01
  //this rotates the boat anytime the animate function is called
  // /it makes the boat move around in circles 
this.boat.rotation.y-=this.speed.rot
this.boat.translateX(this.speed.vel)
//transalte makes it move up and down in the direction the front part of the boat is pointing at

}
    // u do if this.boat  to make the gtlf is defined and oaded
    //because a while for the gltf model to load and if we call update methid immidetaly the boat will be hard to find 
  }
}

const boat=new Boat()
//how we call the Boat function and show the boat on the 3d canvas
/*
class Gold{
constructor(){
loader.load("assets/gold/scene.gltf", (gltf)=>{
	scene.add(gltf.scene)
	gltf.scene.scale.set(10,10,10)
gltf.scene.position.set(random(-200,200),0,(-200,200))
this.gold=gltf.scene
})
}
}

let gold=new Gold()
*/
class Gold{
	constructor(_scene){
		//(_scene) passing the gltf model 
	  scene.add( _scene )
	  _scene.scale.set(10, 10, 10)
	  if(Math.random() > .6){
		_scene.position.set(random(-100, 100), -.5, random(-100, 100))
	  }else{
		_scene.position.set(random(-500, 500), -.5, random(-1000, 1000))
	  }
  
	  this.gold = _scene
	}
  }
  //a load model function
  async function loadModel(url){
	return new Promise((resolve, reject) => {
	  loader.load(url, (gltf) => {
		  //loading the url and when its loaded 
		  //it resolves the gltf
		resolve(gltf.scene)
	  })
	})
  }
  
  let boatModel = null
  async function createGold(){
	if(!boatModel){
	  boatModel = await loadModel("assets/gold/scene.gltf")
	}
	return new Gold(boatModel.clone())
	//every time we call the new Gold function 
	//we dont want to use the same model we want to create a clone of that model
	// so we add .clone to boat model
  }
  
let golds= []
const Gold_COUNT = 100
let golds2=[]



			init();
			animate();

			async function init() {
// needs to be async to add mutiple gold models to the scene to the array

				//container = document.getElementById( 'container' );

				

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				document.body.appendChild( renderer.domElement );
        //accessing the whole body as a canvas element 
				

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
				camera.position.set( 30, 30, 100 );

				//

				sun = new THREE.Vector3();

				// Water

				const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

				water = new Water(
					waterGeometry,
					{
						textureWidth: 512,
						textureHeight: 512,
						waterNormals: new THREE.TextureLoader().load( 'assets/waternormals.jpg', function ( texture ) {

							texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

						} ),
            //look like a flat plain blue without the water texture
            //but turns it to flowly water with it 
						sunDirection: new THREE.Vector3(),
						sunColor: 0xffffff,
						waterColor: 0x001e0f,
						distortionScale: 3.7,
						fog: scene.fog !== undefined
					}
				);

				water.rotation.x = - Math.PI / 2;

				scene.add( water );

				// Skybox

				const sky = new Sky();
				sky.scale.setScalar( 10000 );
				scene.add( sky );

				const skyUniforms = sky.material.uniforms;

				skyUniforms[ 'turbidity' ].value = 10;
				skyUniforms[ 'rayleigh' ].value = 2;
				skyUniforms[ 'mieCoefficient' ].value = 0.005;
				skyUniforms[ 'mieDirectionalG' ].value = 0.8;

				const parameters = {
					elevation: 2,
					azimuth: 180
				};

				const pmremGenerator = new THREE.PMREMGenerator( renderer );

				function updateSun() {

					const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
					const theta = THREE.MathUtils.degToRad( parameters.azimuth );

					sun.setFromSphericalCoords( 1, phi, theta );

					sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
					water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

					scene.environment = pmremGenerator.fromScene( sky ).texture;

				}

				updateSun();

				//

				//const geometry = new THREE.BoxGeometry( 30, 30, 30 );
				//const material = new THREE.MeshStandardMaterial( { roughness: 0 } );

			//	mesh = new THREE.Mesh( geometry, material );
			//	scene.add( mesh );

				//

				controls = new OrbitControls( camera, renderer.domElement );
				controls.maxPolarAngle = Math.PI * 0.495;
				controls.target.set( 0, 10, 0 );
				controls.minDistance = 40.0;
				controls.maxDistance = 200.0;
				controls.update();

				//

			//	stats = new Stats();
			//	container.appendChild( stats.dom );

				// GUI
/*
				const gui = new GUI();

				const folderSky = gui.addFolder( 'Sky' );
				folderSky.add( parameters, 'elevation', 0, 90, 0.1 ).onChange( updateSun );
				folderSky.add( parameters, 'azimuth', - 180, 180, 0.1 ).onChange( updateSun );
				folderSky.open();

				const waterUniforms = water.material.uniforms;

				const folderWater = gui.addFolder( 'Water' );
				folderWater.add( waterUniforms.distortionScale, 'value', 0, 8, 0.1 ).name( 'distortionScale' );
				folderWater.add( waterUniforms.size, 'value', 0.1, 10, 0.1 ).name( 'size' );
				folderWater.open();

				
*/
//adding gold into the array
for(let i = 0; i < Gold_COUNT; i++){
    const gold=await createGold()
    golds.push(gold)
  }




				window.addEventListener( 'resize', onWindowResize );
				window.addEventListener( 'keydown', function(e){
					if(e.key == "ArrowUp"){
					  boat.speed.vel = 1
					}
					if(e.key == "ArrowDown"){
					  boat.speed.vel = -1
					}
					if(e.key == "ArrowRight"){
					  boat.speed.rot = -0.1
					}
					if(e.key == "ArrowLeft"){
					  boat.speed.rot = 0.1
					}
				  })
				  window.addEventListener( 'keyup', function(e){
					boat.stop()
				//	console.log(boat.speed.rot,boat.speed.vel)
				  })
				

			}

		

			
			function isColliding(obj1,obj2)
			{
				return (
				 Math.abs(obj1.position.x - obj2.position.x) < 15 &&
				  //checking if the x distance between the two objects is less than 15
				 Math.abs(obj1.position.z - obj2.position.z) < 15
				//does the same thing with z distance

				 //do not to check the y since ur moving in a vertica; direction
				 )
				//comparing the distance between the two objects
			  }
			  var score=0;
			  
			  window.addEventListener( 'keydown', function(e){
				if(e.key == "s"){
					start=true;
				  
				}
			  })
			
			  function checkCollisions(){
				var truth=10;
				var i=0
				var pos;
			
				if(boat.boat){
				  golds.forEach(gold => {
                   
					if(gold.gold){
					  if(isColliding(boat.boat, gold.gold)){
						scene.remove(gold.gold)
						pos=gold.gold.position.x;
						golds2.forEach(gold2 => {
                         i++
						 if(golds2[i]==pos){
							//console.log("truth:",truth)
							truth=100
						 
						 }
						
						})
						if(start){	
						  if(truth==10){
							golds2.push(gold.gold.position.x)
							score+=216
						  }
						}
						//console.log(boat.boat.position.x,boat.boat.position.z,
						//console.log("gold:",golds2)
						//console.log("goldx:",golds2[i])
						//console.log("goldnum:",i)
						//console.log("truth:",truth)
						//console.log("pos: ",pos)
						//console.log(gold.gold.position.x)
						//console.log("score: ",score)
						//,gold.gold.position.y,gold.gold.position.z)
					
						
					
						//removes the gold for the scene	
						//When a variable is declared using const, it can't be reassigned or redeclared.
						//so make score into a let instead so you can increase score
					
					}
					}
				
				  })
				}

				
function tracker(){

}

			}
			var timer=60
			function restart(){
				timer=60
				score=0
				boat.boat.position.set(5,5,55)
				document.querySelector('#timer').innerHTML = 'Timer: '+ timer
				document.querySelector('#over').innerHTML =""	
				golds2.length=0
				golds.forEach(gold => {
					if(gold.gold){
						  scene.add(gold.gold)  
				//document.querySelector('#displayText').innerHTML = 'Tie'
				}
			})	
			}


var timerId
let start=false

			function Timer(){
				// is used to decrase the number in timer by one
				var end=100
			   
				//this creates a loop for our function that activates every 1000 miliseconds/every 1 second
				// set timeid equal to the settimeout so each time its called it returns a value/number that we can use through timer id
			
			if(start){
				if(timer>0){
				timer--
				//if timer isnt less than zero subtract it by one
				//console.log(timer)
				document.querySelector('#timer').innerHTML = 'Timer: '+ timer
				//user innerhtml to access the html in the div id  and set equal to the timer value
				}
			}
				if(timer===0){
					document.querySelector('#timer').innerHTML ="TIME UP"
					document.querySelector('#over').innerHTML ="PRESS P TO PLAY AGAIN"		
					golds.forEach(gold => {
					if(gold.gold){
						  scene.remove(gold.gold)  
				//document.querySelector('#displayText').innerHTML = 'Tie'
				}
			})
				}
			}

			window.addEventListener( 'keydown', function(e){
				if(e.key == "p"){
					timerId=setTimeout(restart,1000)
				}
			  })


		
		
var sec=0


if(!start){
	document.querySelector('#start').innerHTML = "Press S to Play Game and use Arrows to move around"	
}

			function animate() {
				
				sec++
				requestAnimationFrame( animate );
				render();
		
    
        boat.update()
		 //so  it calls the update functionality 

		checkCollisions()
	
	if(sec%50==0){
		Timer();
	}
	document.querySelector('#cash').innerHTML = "Cash:"+ score

	  // if (boat.boat&& gold.gold){
    //checking that both models have been loaded
 // if(isColliding(boat.boat,gold.gold)){
  // boat and gold replacing obj1 and obj2
// console.log("collide")
   //}
//}
//	stats.update();
}

			function render() {

   /*
				const time = performance.now() * 0.001;

				mesh.position.y = Math.sin( time ) * 20 + 5;
				mesh.rotation.x = time * 0.5;
				mesh.rotation.z = time * 0.51;
*/
				water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
                //how it makes the water move/wavy/animated
				renderer.render( scene, camera );

			}

			/*

			Error-
			[Violation] 'requestAnimationFrame' handler took <N>ms

            [Violation] 'requestAnimationFrame' handler took 1301ms
			I assume that this warning means that the requestAnimationFrame() callback (which is used by OpenFL to render each frame and call Event.ENTER_FRAME listeners) is taking a significantly long time to finish. With this in mind, the fix is to optimize your project’s performance so that frame updates don’t take quite so long.

			*/