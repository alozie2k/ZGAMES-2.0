
//creating images 
class Sprite{
    constructor ({position, imageSrc, scale=1,framesMax=1,minus=0, framesHold=40,offset={x:0,y:0}},sprites){
    // {} to make the varibles be passed as single argument so the order they would be called doesnt matter
    //scale=1 means that scale equaals one by deflaut and you can change scale in the background constructet/object/ other object classes
    //sames with frames 2
    //set oofset to an x of 0 and y of 0 by default(can change it in the object contructers like player or enemy)
    this.position=position
    //refrence to the x and y vauled called in player
    this.height=150
    this.width=50
    this.image= new Image()
    // go swicth between the different spries(like idle or run) by setting this.image to whatever sprite you want to go to
    // setting image equal to a new image source in order to switch inbetween sprites by creating a new javascript image based on those sprites
    //will help you switch between animation sprites\
    //do this by creating a new javascript image based of those sprite then switch to that new sprite image we just created
    this.image.src=imageSrc
   
    this.scale=scale
    //to scale images
    this.framesMax=framesMax
    //the amount of frames in an image 
    this.framesCurrent=0
    this.framesElapsed=0
    //how many frames have we elasped through in our whole animation 
    this.framesHold=framesHold
    //how many frmaes should we go through before we actually change framescurrent and loop through the animation
    // meaning for every 5th frame we do the animation loop(this helps the animation look a lot smoother and go through a lot slower) 
    this.minus=minus
    this.offset=offset
   
    }  
      draw(){
    c.drawImage(
      this.image, 
     this.framesCurrent* (this.image.width/this.framesMax)+this.minus ,
      //how it starts at the new frame(x) of the picture for each animation loop/ this is the x
     0,
     //y
      //where  do you want to start cropping the image(x,y)
  
     this.image.width/this.framesMax,
      this.image.height,
      //crop width(how much you want to crop after the x postion) and height
      //crop location arguments
      this.position.x-this.offset.x,
      this.position.y-this.offset.y,
      //offset helps move the image away from the extra padding that is around the image
      //for example if you wanted to move the image more to top left corner of the padding its in
      //used this for example to get object to touch the floor of your game
      this.image.width/this.framesMax*this.scale,
      //divide by 5 to make sure it doesnt strech the image due to the crop width and is dependent on the amount of frames in an image
      this.image.height*this.scale)
         
    
    }
    animateFrames() {
      this.framesElapsed++
  
      if (this.framesElapsed % this.framesHold === 0) {
        // this how it check how many frames have gone by each animation loop
        if (this.framesCurrent < this.framesMax - 1) {
          //minus 1 becuase framesmax is set equal to 1 not zero
          this.framesCurrent++
        } else {
          this.framesCurrent = 0
          //helps go through all the frames in the pic anf go back to the orginal pic after it reahces the last image and restrts the loop again
        }
      }
    }
    //better to put repeated code into functions 
      update(){
        this.draw()
        this.animateFrames()
    
    
    }
    }
    
    //creating our player 
    class Fighter extends Sprite{
      //you extend too the sprite class so the fighter class can use some of the value from sprite that it doesnt have like images
       //extend takes all the methods within sprite class
       //if they have the some methods that are the same they will overwrite themselves
     //also extends and uses the draw method in sprite class
       constructor ({
         position,
         velocity, 
         color='red', 
         imageSrc,
         scale=1,
         sprites,
         framesMax=1,
         framesHold=40,
         minus=0,
         offset={x:0,y:0}, 
         attackBox={offset:{},width:undefined,height:undefined}
        })
       {
        // {} to make the varibles be passed as single argument so the order they would be called doesnt matter
        super({
          position,
          imageSrc,
          scale,
          framesMax,
          offset,
          framesHold,
          minus,
          sprites
        })
        //lets you use methods from the parent constructer(which is sprite)/lets uou use the properties you set values to in the constructer class
        //aka super to decalre what values/methods you want to use from the parent constructer
        
        
        //refrence to the x and y vauled called in player
        this.velocity=velocity 
        this.height=150
        this.width=50
        this.lastKey
        this.attackBox={
            position:{
        x:this.position.x,
        y:this.position.y
        // give the enemy and player seperate coornidates
            },
            offset:attackBox.offset,
            //offset:offset,
            //same as the other offset
            width: attackBox.width,
            height:attackBox.height,
        }
        this.color=color
        this.isAttacking
        //by default its equal to flase
        this.health=100
        //whats going to decrease the health
        this.framesCurrent=0
        this.framesElapsed=0
       // this.framesHold=40
        //cant pass the thrre frames in the super constructer because your trying to pass thing in the parent constructer that isnt set inside it aka isnt set in ({})
     this.dead=false
     this.play=true
      this.sprites=sprites
   
      //loop through each object in the object of sprite/in the sprite 
      //goal for this loop is to create an image property dynamically that is going to be equal to the new image object
      for (const sprite in this.sprites){
        sprites[sprite].image=new Image()
       //select our main sprite object(sprites) then we refrenced which onject we want to grab with (const sprite)/object key(so when we are refrence sprite we are either refrencing idle or run)
        // referencing the key of the object like idle or run
      //.image means your adding a new property to it 
      //setting this equal to a new javascript image
      sprites[sprite].image.src=sprites[sprite].imageSrc
    //setting the image src youe adding to the image source of one of the sprite keys like idle/run image src
    //sets  everything up
  }
    console.log(this.sprites)
      }  
          /* draw(){
        
             c.fillStyle=this.color
            c.fillRect(this.position.x,this.position.y ,this.width ,this.height)
            //50 pixels wode and 150 pixels tall
         if(this.isAttacking){
             //only shows the attackbox is space/attack buttomn is pressed
            
             c.fillStyle="green"
            c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height)
            //draw attackbox
         }
        }*/


          update(){
        this.draw()
       if (!this.dead) 
       this.animateFrames()
     




        this.attackBox.position.x=this.position.x+this.attackBox.offset.x
        this.attackBox.position.y=this.position.y+this.attackBox.offset.y
        // do this so attackbox postion updates manulaay based of the parent and is directly link to this.postion on top
        //update the attackbox position 
        //add offset so the postion of the attack is dymanic to the enemys postion and doesnt affect the other player's attackbox
     
     //   c.fillRect(this.attackBox.position.x, this.attackBox.position.y,this.attackBox.width,this.attackBox.height)
      //recereating are  attack box(and making it visble) after drawing are sprites
      
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        //this makes sure the player doesnt fall of the screen 
        //as velocity has to be set at zero at one point to stop the player from falling 
        if(this.position.y+this.height+this.velocity.y>=canvas.height-105){
         this.velocity.y=0
         //stop the object from falling off canvas   
        this.position.y=245
        //get rid of the small little gap that made that switch from fall sprite to idle sprite glithcy
        }else
        this.velocity.y+=gravity 
        // this makes sure the player touches the end of the canvas
         
     // console.log(this.position.y)
     //use this to find where to set the postion of the object so its touching the grounf
      }
  
      
       attack(){
        if( this.health>0){
        this.isAttacking=true
        this.switchSprite('attack1')
        setTimeout(()=>{
        this.isAttacking=false
        },3000)
        console.log(this.image.width)
        console.log("hi")
      }
      else{
        this.switchSprite('death')
      }
      }
    
          //attack method 
          //time method takes the arrow function as the first argument and time(100)as the second argument
        //time is in miliseconds 
        //set a certain timemark until attack is back to false



takeHit(){
  this.health -= 20
  this.switchSprite('takeHit')
  if (this.health <= 0) {
    this.switchSprite('death')
  } else this.switchSprite('takeHit')
  
}

death(){

this.dead=false
this.play=false
console.log(this.dead)
this.switchSprite('idle')
this.play=true
//go back to play is true after switching to idle so the death sprite animation work properly
}

        switchSprite(sprite){
          //this function here is for overriding the idle switch function for the functionality of other sprite forms like attack death or take a hit
         
          if (this.image === this.sprites.death.image&&this.play==true) {
           
            if (this.framesCurrent === this.sprites.death.framesMax - 1&&this.play==true)
           this.dead = true  
            return
          }
         // prevents the player from doing anything else after death
         //could add a something to the statment that resets the player and its health 

         
          if (
            this.image === this.sprites.attack1.image
            &&
            this.framesElapsed  < 42
          )
            return
        //going to return any of the following code if you hit spacebar and change the sprite to attack sprite
       // the code after && makes sure it stops the attack animation and continues the case sprite animation(aka stop the attack animation from infintely looping)
       //  after the attack animation goes through it once by checking when framecurrent excccceds framesmax
       //framemax-1 because frames current starts at 0 and framesmax starts at 1
       
       if (
        this.image === this.sprites.takeHit.image
        &&
        this.framesElapsed  < 41
      )
        return
        //this means if we arent attacking but are getting hit we dont want to run the other switch case statements until frames eslapsed passses a certain number
       
       switch(sprite){
            case 'idle':
              if (this.image !== this.sprites.idle.image) {
                this.framesElapsed=0
                this.image = this.sprites.idle.image
                this.framesMax = this.sprites.idle.framesMax
                this.offset = this.sprites.idle.offset
                this.scale = this.sprites.idle.scale
                this.framesHold = this.sprites.idle.framesHold
                //player.scale=1.3
               // enemy.scale=.8
                this.framesCurrent=0
              //want to make sure the frames start right back over to the first frame when switching frames to avoid werid animations
              }
              break
              
            case 'run':
              if (this.image !== this.sprites.run.image) {
                this.framesElapsed=0
                this.image = this.sprites.run.image
                this.framesMax = this.sprites.run.framesMax
                this.framesHold = this.sprites.run.framesHold
                //player.scale=1.3
                //use scale to give a player shrinking powers 
                this.scale = this.sprites.run.scale
                this.offset = this.sprites.run.offset
             this.framesCurrent=0
              }
              break
              
            case 'jump':
              if (this.image !== this.sprites.jump.image) {
                this.framesElapsed=0
                this.image = this.sprites.jump.image
                this.framesMax = this.sprites.jump.framesMax
                this.scale = this.sprites.jump.scale
                this.framesCurrent=0
                
              }
                break 
                case 'fall':
                  if (this.image !== this.sprites.fall.image) {
                    this.framesElapsed=0
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.scale = this.sprites.fall.scale
                    this.framesCurrent=0
                  }
                    break 
                    case 'attack1':
                      if (this.image !== this.sprites.attack1.image) {
                      this.framesElapsed=0
                        this.image = this.sprites.attack1.image
                        this.framesMax = this.sprites.attack1.framesMax
                        this.scale = this.sprites.attack1.scale
                        this.offset = this.sprites.attack1.offset
                        this.framesHold = this.sprites.attack1.framesHold
                        this.framesCurrent=0
                      }
                        break 
                        case 'takeHit':
                          if (this.image !== this.sprites.takeHit.image) {
                            this.framesElapsed=0
                            this.image = this.sprites.takeHit.image
                            this.framesMax = this.sprites.takeHit.framesMax
                            //this.scale = this.sprites.takeHit.scale
                            this.framesHold = this.sprites.takeHit.framesHold
                            this.scale = this.sprites.takeHit.scale
                            this.offset = this.sprites.takeHit.offset
                            this.framesCurrent=0
                          }
                          break
                          case 'death':
                            if (this.image !== this.sprites.death.image) {
                            this.framesElapsed=0
                              this.image = this.sprites.death.image
                              this.framesMax = this.sprites.death.framesMax
                              this.scale = this.sprites.death.scale
                              this.framesHold = this.sprites.death.framesHold
                              
                              //this.offset = this.sprites.takeHit.offset
                              this.framesCurrent=0
                            }
                            break
              //switchcase

          }
         
        }
        


        }
    