export class UI{
constructor(game){
//needs a refrence to the current game object
this.game=game;
this.fontSize=30;
this.fontFamily="Helvetica"

//lives 
this.liveImage=head
}
draw(context){
context.save();
context.shadowOffsetX=2;
context.shadowOffsetY=2;
context.shadowColor='white';
context.shadowBlur=0;
//gives text a white highlight
    context.font=this.fontSize+"px"+this.fontFamily;
    context.textAlign="left"
    context.fillStyle=this.game.fontColor
//score
context.fillText('Score:' + this.game.score, 20, 50);


//lives
for(let i=0; i<this.game.lives; i++){
    context.drawImage(this.liveImage,30*i+10,85,25,25)
    //x-coor , y-coor,width and height
    //hortizontal x poistion times i give u mutiple lives images
    // bigger the x postion the more space there is between the images
    //plus 25 pushes the images's x more to the right(bigger the number the more to the right it goes)
}


if(this.game.gameOver){
context.textAlign='center'
context.font=this.fontSize*1.3+'px '+this.fontFamily
context.fillText('Game Over', this.game.width*0.5,this.game.height*0.5);
context.fillText('Press P to Play Again', this.game.width*0.5,(this.game.height*0.5)+50);
}


context.restore();
//this means all the setting will ony affect the code between save and restore
//so it will only be applied to the text not player or enemy
context.save();
if(!this.game.player.charge){
context.shadowOffsetX=2;
context.shadowOffsetY=2;
context.shadowColor='white';
context.shadowBlur=0;
    context.textAlign='left'
    context.font=this.fontSize/2+'px '+this.fontFamily
    context.fillStyle='red'
    context.fillText('Attack needs to charge', 90,50);
    }
 context.restore();

 context.save();
 context.shadowOffsetX=2;
context.shadowOffsetY=2;
context.shadowColor='white';
context.shadowBlur=0;
//gives text a white highlight
context.font=this.fontSize*.5+"px"+this.fontFamily;
context.textAlign="left"
context.fillStyle=this.game.fontColor
context.restore();
context.fillText('↓     '+'↑      '+'←            '+'→           '+'space     '+'↓ space'  , 10, 20);
context.fillText('sit  '+'jump '+'run left   '+'run right    '+'attack    '+'diving attack', 10, 35);
}

}