export class FloatingMessage{
 constructor(value,x,y,targetX,targetY) {
this.value=value;
this.x=x;
this.y=y
this.targetX=targetX;
this.targetY=targetY;
//target postion where the object is heading
this.markedforDeletion=false;
this.timer=0
 }  
 update(){
    this.x+=(this.targetX-this.x)*0.03;
    this.y+=(this.targetY-this.y)*0.03;
    this.timer++
    if(this.timer>100)
    this.markedforDeletion=true;
 }
 draw(context){
context.font='Helvetica'
context.fillStyle='white'
context.fillText(this.value,this.x,this.y);
context.fillStyle='black'
context.fillText(this.value,this.x+2,this.y+2);
 //creating a shadow text effect by drawing the same text twice but with differnt colors
//then incease the postions by 2
}

 

}