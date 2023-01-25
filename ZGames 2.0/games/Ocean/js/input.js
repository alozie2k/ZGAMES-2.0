//this is to handle your inputs that control what the player does

export class InputHandler{
constructor(game){
//passing game object as an argument to the class constructor
this.game=game
//then convert it to a class property 
this.keys=[];
// where we will add keys that are pressed down
//and removing the keys that are realesed 
//this way we can always check if a specific key is pressed by checking the array 
 
window.addEventListener("keydown", e=>{
//console.log(e.key, this.keys);
if((e.key==="ArrowDown"||
e.key==="ArrowUp"||
e.key==="ArrowLeft"||
e.key==="ArrowRight"||
e.key===" "
)

&& this.keys.indexOf(e.key)===-1){
// after && its saying that if key pressed is not yet included in the array
//the value is equal to -1
//in javascript when element has index minus 1 it means its not present in the array
this.keys.push(e.key);
//pushes the key into the array
}else  if(e.key==="d")
this.game.debug!=this.game.debug;
//adding a debug mode for the hitboxes

//making sure the key can only be added to the array once
//so when a user holds down a specific key its not added to the array multiple times

//console.log(e.key, this.keys);

});
//we call event window listner from here because
// the code inside the class constructor is executed automically 
//whenever we create an instance of this class


window.addEventListener('keyup', e=>{
if(e.key==="ArrowDown"||
e.key==="ArrowUp"||
e.key==="ArrowLeft"||
e.key==="ArrowRight"||
e.key===" "
){
this.keys.splice(this.keys.indexOf(e.key),1)
//reoves element from array
// takes in two arguments
//index of the element we want to remove and how many elements to remove at the index
}
//console.log(e.key, this.keys);
});


}
}