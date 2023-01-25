import {Dust,Fire,Splash} from "./particles.js"
// import particles/js here since particles will be closely associated with  the player states

const states={
  //enum object 
  //these objects pair values and names of each state(helps code readability)  
SITTING:0,
RUNNING:1,
JUMPING:2,
FALLING:3,
ROLLING:4,
DIVING:5,
HIT:6
}

class State{
    constructor(state,game){
        this.state=state;//this converts the argument to a class property
       //constructor will take a single constructor will take in an argument called state
       //which will be a simple line of text with the name of the state such as sit or run
       
        //each state will have its own class 
        //so you can give each state a different entry method(like enter()) to set the player up when it enters that particular state 
    //handle give them a different handle method that will react to the different user inputs depending on which sate the player is in at that moment in time 
    //for example when the player is on the running state  and i  press down and want to switch to the sitting state but when the player is in a jumping state this causes a downward attack
   this.game=game;
   //to use and access the constructors and objects in the game file you need to acesss the game constructer in run.js
}
}


export class Sitting extends State{
//this stops the game from scrolling as the player sits down
constructor(game
    //player
    ){
//takes a reference player object as argument  so it can acess properties on the player class

//later on I  replace game with player since game stil contain player inside it
super("SITTING",game)
//Give the this.state value the value of sitting
//pass game into super since its expected in the state constructor(shown in line 26)

//this.player=player
//when extending a class you have call super before calling this.player or this keyword
}
enter(){
    this.game.player.frametime=0;
this.game.player.frameX=0;
this.game.player.sizer=1.1
this.game.player.maxframes=4;
this.game.player.image=player2

//this.player.frameX=0;
//this.player.maxframes=4;
//this.player.image=player2
//use to need to acess player to use those object but now we are acessing game for them
// so instead of just .player its game.player
}

handleInput(input){
    //takes input as an argument
    // which will keep checking if the correct key is pressed and will switch a player to a diffrent state when that happens 
//like when we press up arrow key it will switch to jumping state 


if(input.includes("ArrowLeft")||input.includes('ArrowRight')){
// reacts to certain inputs and swithces states on the inp}uts its allowed to react too
//sitting state would react to left or right to switch to running state
this.game.player.setState(states.RUNNING,1.3);
// the second argument value pass is game speed
}else if(input.includes(' ')&&this.game.player.charge){
    this.game.player.setState(states.ROLLING,2);   
}


}

}



export class Running extends State{
    //this stops the game from scrolling as the player sits down
    constructor(game){
    //takes a reference player object as argument  so it can acess properties on the player class
    super("RUNNING",game)
    //Give the this.state value the value of sitting
  
    //this.player=player
    //when extending a class you have call super before calling this.player or this keyword
    }
    enter(){
        this.game.player.frametime=0;
        this.game.player.frameX=0;
        this.game.player.sizer=1.1
        this.game.player.maxframes=6;
        this.game.player.image=player3
    
    
    }
    
    handleInput(input){
        //takes input as an argument
        // which will keep checking if the correct key is pressed and will switch a player to a diffrent state when that happens 
    //like when we press up arrow key it will swithc to jumping state 
    

this.game.particles.push(new Dust(this.game,this.game.player.x+this.game.player.width*0.5-20,this.game.player.y+this.game.player.height-20));


//adding particles to the player in running state
//dust expects game, and the player's x and y as arguments

   // if(input.includes("ArrowDown")){
    // reacts to certain inputs and swithces states on the inp}uts its allowed to react too
    //sitting state would react to left or right to switch to running state
  //  this.game.player.setState(states.SITTING,0);
   // console.log(this.game.player.y)
     if(input.includes("ArrowUp")){
        this.game.player.setState(states.JUMPING,1)
    }else if(input.includes(" ")&&this.game.player.charge){
        this.game.player.setState(states.ROLLING,2);   
    }
    


    }
    
    }


    export class Jumping extends State{
        //this stops the game from scrolling as the player sits down
        constructor(game){
        //takes a reference player object as argument  so it can acess properties on the player class
        super("JUMPING",game)
        //Give the this.state value the value of sitting
        
        //this.player=player
        //when extending a class you have call super before calling this.player or this keyword
        }
        enter(){
        if(this.game.player.onGround())
        this.game.player.vy-=24;
     //  console.log("jump",this.game.player.y)
        this.game.player.frametime=0;
        this.game.player.frameX=0;
        this.game.player.sizer=1.1
        this.game.player.maxframes=2;
        this.game.player.image=player4

        
        }
        
        handleInput(input){
            //takes input as an argument
            // which will keep checking if the correct key is pressed and will switch a player to a diffrent state when that happens 
        //like when we press up arrow key it will swithc to jumping state 
    if(this.game.player.vy>this.game.player.weight){
        this.game.player.setState(states.FALLING,1)

        }else if(input.includes(' ')&&this.game.player.charge){
            this.game.player.setState(states.ROLLING,2);   
        }else if(input.includes('ArrowDown')&&this.game.player.charge){
            this.game.player.setState(states.DIVING,0);   
        }
        
        
        }
    }

        export class Falling extends State{
            //this stops the game from scrolling as the player sits down
            constructor(game){
            //takes a reference player object as argument  so it can acess properties on the player class
            super("FALLING",game)
            //Give the this.state value the value of sitting
            
            
            //this.player=player
            //when extending a class you have call super before calling this.player or this keyword
            }
            enter(){
           this.game.player.frametime=0;
           this.game.player.frameX=0;
           this.game.player.sizer=1.1
           this.game.player.maxframes=3;
           this.game.player.image=player5
           //console.log("fall",this.player.y)
            
            }
            
            handleInput(input){
                //takes input as an argument
                // which will keep checking if the correct key is pressed and will switch a player to a diffrent state when that happens 
            //like when we press up arrow key it will swithc to jumping state 
            if(this.game.player.y>=360){
            this.game.player.setState(states.RUNNING,1.3)
           // console.log(this.player.y)
    }else if(input.includes('ArrowDown')&& this.game.player.charge){
        this.game.player.setState(states.DIVING,0);   
    }
            
        }
    }
        export class Rolling extends State{
            //this stops the game from scrolling as the player sits down
            constructor(game){
            //takes a reference player object as argument  so it can acess properties on the player class
            super("ROLLING",game)
            //Give the this.state value the value of sitting
            
            
            //this.player=player
            //when extending a class you have call super before calling this.player or this keyword
            }
            enter(){
          this.game.player.charger=true;
          this.game.player.frametime=0;
           this.game.player.frameX=0;
           this.game.player.sizer=1.1
           this.game.player.maxframes=2;
           this.game.player.image=roll;
          // console.log("fall",this.player.y)
            
            }
            
            handleInput(input){
                //takes input as an argument
                // which will keep checking if the correct key is pressed and will switch a player to a diffrent state when that happens 
            //like when we press up arrow key it .playerwill swithc to jumping state 
            
        
           if(this.game.player.blueflame){
            this.game.particles.push(new Fire(this.game,this.game.player.x+this.game.player.width*0.5-70,this.game.player.y+this.game.player.height-140));
            }
            if(!this.game.player.charge){
                this.game.player.charger=false;
                this.game.player.setState(states.RUNNING,1.3)
            }
            
            if(!input.includes(' ')&&this.game.player.y>=360){
            this.game.player.charger=false;
            this.game.player.setState(states.RUNNING,1.3)
            }else if(!input.includes(' ')&&!this.game.player.y>=360){
                this.game.player.charger=false;
                this.game.player.setState(states.FALLING,1)
            }else if(input.includes(' ')&&input.includes('ArrowUp')&&this.game.player.y>=360){
                this.game.player.vy-=23
            }else if(input.includes('ArrowDown')&&this.game.player.y!=360){
                this.game.player.setState(states.DIVING,0);   
            }
            
        
            }
        }
        export class Diving extends State{
            //this stops the game from scrolling as the player sits down
            constructor(game){
            //takes a reference player object as argument  so it can acess properties on the player class
            super("DIVING",game)
            //Give the this.state value the value of sitting
            
            
            //this.player=player
            //when extending a class you have call super before calling this.player or this keyword
            }
            enter(){
          this.game.player.frametime=0;
           this.game.player.frameX=0;
           this.game.player.sizer=1.1
           this.game.player.maxframes=2;
           this.game.player.image=roll;
          this.game.player.vy=10;
            

            }
            
            handleInput(input){
                //takes input as an argument
                // which will keep checking if the correct key is pressed and will switch a player to a diffrent state when that happens 
            //like when we press up arrow key it .playerwill swithc to jumping state 
            if(this.game.player.blueflame){
            this.game.particles.unshift(new Fire(this.game,this.game.player.x+this.game.player.width*0.5-70,this.game.player.y+this.game.player.height-140));
            }
            
            if(this.game.player.y>=360){
                this.game.player.charger=false;
            this.game.player.setState(states.RUNNING,1.3)
           
           for(let i=0; i<30; i++){
               //use a for loop to create a splash of 30 particles
            this.game.particles.unshift(new Splash(this.game,this.game.player.x-20,this.game.player.y-50));
        //put game particles here so it only shows it after you hit the ground and go back to running state
       //use unshift to add one particle to the beginning of the array
           }
   
    }else if(input.includes(' ')&&this.game.player.y>=360&&this.game.player.charge){
                this.game.player.setState(states.ROLLING,2)
        }
            
        
            }
        }

        export class Hit extends State{
            //this stops the game from scrolling as the player sits down
            constructor(game){
            //takes a reference player object as argument  so it can acess properties on the player class
            super("HIT",game)
            //Give the this.state value the value of sitting
            
            
            //this.player=player
            //when extending a class you have call super before calling this.player or this keyword
            }
            enter(){
            this.game.player.frametime=0;
           this.game.player.frameX=0;
           this.game.player.maxframes=2;
           this.game.player.sizer=.5
           this.game.player.image=sonichit;
   
            

            }
            
            handleInput(input){
              
            if(this.game.player.frametime>=2&&this.game.player.y>=360){
            this.game.player.setState(states.RUNNING,1.3)
    }else if(this.game.player.frametime>=2&&!this.game.player.y>=360){
                this.game.player.setState(states.FALLING,2)
        }
            
        
            }
        }

        
      