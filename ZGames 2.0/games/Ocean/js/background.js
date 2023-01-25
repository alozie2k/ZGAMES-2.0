class Layer{
constructor(
game,
width,
height,
//needs access to the game object amd its width and height
 speedModifier,
 image
 //each layer will have a differnt image 
){
this.game=game;
this.width=width;
this.height=height;
this.speedModifier=speedModifier;
this.image=image
this.x=0
this.y=0
}
update(){
if(this.x< -this.width)
//this means it has scrolled all the behind the left edge of the game area
this.x=0;
//this resets the background image
else 
this.x-=this.game.speed*this.speedModifier;
// this makes the the images move at differnt speeds and slides the image across the x-axis
}
draw(context){
//need to pass context as an argument to specify which canvas element we want to draw on 
context.drawImage(this.image, this.x,this.y,this.width, this.height);
context.drawImage(this.image, this.x+this.width,this.y,this.width, this.height);
//th second draw background images  draws them side to side with each other so there isnt a white space once the image is complety slide through
//aka feels in the gap that shows before the first image has a chance to reset
}
}

export class Background{
   constructor(game){
      this.game=game
      this.width=1667;
      this.height=500;
      this.layer5image =layer5;
      this.layer4image =layer4;
      this.layer3image =layer3;      
      this.layer2image =layer2;
      this.layer1image =layer1;
this.layer1=new Layer(this.game,this.width,this.height,.8,this.layer1image)
//this.layer2=new Layer(this.game,this.width,this.height,1,this.layer2image)
//this.layer3=new Layer(this.game,this.width,this.height,1,this.layer3image)
//this.layer4=new Layer(this.game,this.width,this.height,1,this.layer4image)
this.layer5=new Layer(this.game,this.width,this.height,2,this.layer5image)
///the second to last value the speedModifer helps move values at different speeds 
      this.backgroundLayers=[this.layer1,this.layer5];
//holds all background layers 
   } 
   update(){
    this.backgroundLayers.forEach(layer=>{
     layer.update();
    }) 
    //for each layer object in the array 
    // i call its associated update methid(from layer update)

   }
   draw(context){
    this.backgroundLayers.forEach(layer=>{
        layer.draw(context);
       }) 
   }
}