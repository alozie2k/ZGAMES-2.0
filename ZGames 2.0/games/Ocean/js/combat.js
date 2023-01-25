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

const canvas =document.getElementById('canvas1')
const c=canvas.getContext('2d')

canvas.width =800
canvas.height=500
const gravity=0.7;

c.beginPath();
c.strokeStyle = "red";
c.fillRect(20, 20, 150, 100);

const background=new Sprite({
    position: {
        x:0,
        y:0
    },
    imageSrc:'image/cage.jpg',
    //dot means your starting from the js directory and going outside of it 
scale:1.7
})

const player=new Fighter({
position:{
  x:0,
  y:0  
},
velocity: {
    x:0,
    y:0   
},
offset:{
 x:0,
 y: 0  
},
imageSrc:'image/idle.png',
framesMax:4,
//framesmax is the max number of images in the animations/one big animation image
scale: 1.3,


sprites:{
    idle:{
        imageSrc:  'image/idle.png ',
        framesMax:4,
        offset:{
            x:0,
            y: 40
           },
           scale:1.1,
           framesHold:25,
    },
    run:{
        imageSrc:  'image/running.png ',
        framesMax:3,
        framesHold:15,
        scale: 1.3,
        offset:{
            x:0,
            y: -10
           }
    },
    jump:{
        imageSrc:  'image/jump.png ',
        framesMax:1,
       scale:1.5
    },
    fall:{
        imageSrc:"image/falling.png",
        framesMax:1,
        scale: .4
    },
     attack1:{
        imageSrc:"image/attack.png",
        framesMax:3,
        scale: .7,
        framesHold:12,
        offset:{
            x:0,
            y: -8
           }
        },
        takeHit:{
            imageSrc:"image/phit.png",
            framesMax:1,
            framesHold:40,
            scale:1.8,
            offset:{
                x:0,
                y: 0
               }
        },
        death:{
            imageSrc:"image/pdeath.png",
            framesMax:4,
            framesHold:5,
            scale:1.3,
            }
    },
    attackBox:{
        offset:{
            x:60,
            y:50
        },
        width:100,
        height:50,
    
}


})

console.log(player)

const keys={
a:{
pressed:false
},
d:{
    pressed:false
    },
    w:{
        pressed:false
        },
        ArrowLeft:{
            pressed:false
        },
        ArrowRight:{
            pressed:false
        }
}
let lastKey
const enemy=new Fighter({
    position:{
        x:400,
        y:100  
      },
      velocity: {
          x:0,
          y:0    
      }, 
      offset:{
        x:-50,
        y: 0  
       },
       imageSrc:'image/cookiestance.png',
       framesMax:3,
       //framesmax is the max number of images in the animations/one big animation image
       scale: .8,
       
       
       sprites:{
           idle:{
               imageSrc:  'image/cookiestance.png ',
               framesMax:3,
               scale: .8,
               offset:{
                x:0,
                y: 0
               },
               framesHold:25,
           },
           run:{
               imageSrc:  'image/cookierun.png ',
               framesMax:3,
               framesHold:15,
              scale:.8,
              offset:{
                x:0,
                y: 0
               }
           },
           jump:{
               imageSrc:  'image/cookiejump.png ',
               framesMax:1,
               scale: 1.3
               
              
           },
           fall:{
               imageSrc:"image/cookiedown.png",
               framesMax:1,
              scale:1.3
           },
            attack1:{
               imageSrc:"image/cookieattack.png",
               framesMax:3,
               scale:.6,
               framesHold:12,
               offset:{
                x:0,
                y: 0
               }
           },
           takeHit:{
            imageSrc:"image/hit.png",
            framesMax:1,
            framesHold:40,
            scale:1.3,
            offset:{
                x:0,
                y: -10
               }
             },
             death:{
                imageSrc:"image/death.png",
                framesMax:4,
                framesHold:5,
                scale:.9
                }
        },
        attackBox:{
            offset:{
                x:-20,
                y:65
            },
            width:100,
            height:50,
        }
        //creating the location of our attack box and its size
        //make sure it covers the full range of the sprites attack image
  })
 
restart2=true

if(restart2=true){
decreaseTimer()
}

function animate(){

window.requestAnimationFrame(animate)
//console.log('player')
//use console log to check if youur animate function is working 
c.fillStyle="white"
//call fillstyle so the game doesnt use the color you called in sprite as a background 
c.fillRect(0,0,canvas.width,canvas.height)
//this makes sure the rect sprites dont strech towards the whole canvas

background.update()
//draw it before you draw the players and the sprite so its drawn as a background and not on top of them

player.update()
enemy.update()

c.textAlign='left'
c.font='12px Georgia'
c.fillStyle='red'
c.fillText('P1 Keys', 40,120);
c.fillText('a  ←', 40,140);
c.fillText('w  ↑', 40,155);
c.fillText('d  →', 40,175);
c.fillText('space  attack', 40,195);

c.fillText('P2 Keys', 750,120);
c.fillText('←  left', 745,140);
c.fillText('↑  jump', 745,155);
c.fillText('→  right', 745,175);
c.fillText('↓  attack', 745,195);


enemy.velocity.x=0
player.velocity.x=0
//thiis makes sure the players dont move forever

//player.image=player.sprites.idle.image
//always sets it to this defualt image when no buttons are being pressed
//player.switchSprite('idle')
//using switch case statments to switch between the  diffrent sprite images in sprite for better code(and so each sprite  of its unique variables is set to them like framesMax)

if (keys.a.pressed&&player.lastKey==='a'&&player.position.x>-25){
    player.velocity.x=-5
   
    player.switchSprite('run')
   // player.image=player.sprites.run.image
    //player.image refer to this. image in the sp   rite constructer
} else if (keys.d.pressed&&player.lastKey==='d'&&player.position.x<685){
    player.velocity.x=5
    player.switchSprite('run')
    //player.image=player.sprites.run.image
}else{
    player.switchSprite('idle')
    //so it only switches back to idle wgen not pressing a or d
}

if (player.velocity.y < 0) {
player.switchSprite('jump')
//player.image=player.sprites.jump.image
    //player.framesMax=player.sprites.jump.frameMax
//setting the framesMax of jumping sprite
    //jumping
}else if(player.velocity.y >0){
    player.switchSprite('fall')
   // console.log(player.position.y)
//to check the location of the player when he was falling

    //player's base y should be zero
}


if (keys.ArrowLeft.pressed&&enemy.lastKey==='ArrowLeft'&&enemy.position.x>0){
    enemy.velocity.x=-5
    enemy.switchSprite('run')
} else if (keys.ArrowRight.pressed&&enemy.lastKey==='ArrowRight'&&enemy.position.x<710){
    enemy.velocity.x=5
    enemy.switchSprite('run')
}else{
    enemy.switchSprite('idle')
}



if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump')
    
    }else if(enemy.velocity.y >0){
        enemy.switchSprite('fall')
    } 

//detect collsion
if (
rectangularCollision({
rectangle1:player,
rectangle2:enemy
}) && 
player.isAttacking &&player.framesCurrent===2
//making sure the function only plays if the player is attacking and sprite is in its last attack frame
) {//else statment

enemy.takeHit()
player.isAttacking=false
//enemy.health-=20

//document.querySelector('#coverage').style.width=enemy.health+'%'
//this selects the enemy health div/element and shrinks it(by 20%)anytime the player hits the enemey
gsap.to('#coverage', {
    width:enemy.health+'%'
        })
}

if(player.isAttacking&&player.framesCurrent==2){
player.isAttacking=false
}
//sets isAttacking to false if the player misses the enemy
//so the enemy's health isnt subtracted when the player isnt attacking



if (
    rectangularCollision({
    rectangle1:enemy,
    rectangle2:player
    }) && 
   enemy.isAttacking&&enemy.framesCurrent===2
    ) {//else statment
    player.takeHit()
    enemy.isAttacking=false
   // player.health-=20
    //document.querySelector('#coverage1').style.width=player.health+'%'
   //decrase players health without using an animation
    gsap.to('#coverage1', {
width:player.health+'%'
    })
//gsap cdn is an animation library
}
    //doing this allows you easily make if statments that account for the emnemy and players attackbox


    if(enemy.isAttacking&&enemy.framesCurrent==2){
        enemy.isAttacking=false
        }

if (enemy.health <= 0 ){
enemy.switchSprite('death')
}

if (player.health <= 0 ){
    player.switchSprite('death')
    }

if (enemy.health <= 0 || player.health <= 0) {
determineWinner({ player, enemy, timerId })
      }
//end the game base off players health
/*
//detect our collision
if(player.attackBox.position.x+player.attackBox.width>=enemy.position.x
//x gets the leftside of the attack box and width gives the right hand side that add ups to the right side location of the attackbox
//emeny x gets the left side postion of the players body
// with coolosion your trying to find if the right side of the attack box is greater than the left side of the enemies body    
&&player.attackBox.position.x<=enemy.position.x+enemy.width
//aslo got to make sure that when the player goes past the attackbox it doesnt still count it as an attack
//so got to detect if the right side of the attack box is less than equal to the right side of the player,
//so gotta check if the left side of the player passes the right side of the other player body 
&&player.attackBox.position.y+player.attackBox.height>=enemy.position.y&&player.attackBox.position.y<=enemy.position.y+enemy.height
//also got to make sure when a player jump it doesnt count as an attackbox
&&player.isAttacking){
player.isAttacking=false;
//make sure that it only registers the player has been hit once
console.log("go")
}
*/

    
}
animate()

window.addEventListener('keydown', (event) => {
    if(player.dead||enemy.dead||timer===0){
    switch(event.key){
        case "p":
        tier=false
        restart=true
        restart2=false
        console.log(restart2)
        player.health=100
        enemy.health=100
        document.querySelector('#coverage1').style.width=100+'%'
        document.querySelector('#coverage').style.width=100+'%'
        player.position.x=0
        enemy.position.x=400
        document.querySelector('#displayText').style.display = 'none'
        player.death()
        enemy.death()
        timer=60
        decreaseTimer()      
        break
    }
}
    })

window.addEventListener('keydown', (event) => {
    if(!player.dead&&!enemy.dead&&!tier===true){
switch(event.key){
//controls for player 2
case "ArrowRight":
keys.ArrowRight.pressed=true
enemy.lastKey="ArrowRight"
//do enemy.lastkey so it doesnt intefere with the player 1 keys
break;

case "ArrowLeft":
keys.ArrowLeft.pressed=true
enemy.lastKey="ArrowLeft"
//do enemy.lastkey so it doesnt intefere with the player 1 keys
break;

case "ArrowUp":
if(enemy.position.y>150)
enemy.velocity.y=-20
//do enemy.lastkey so it doesnt intefere with the player 1 keys
break;

case "ArrowDown":
enemy.attack()
//do enemy.lastkey so it doesnt intefere with the player 1 keys
break;



 case "d":
    keys.d.pressed=true
    player.lastKey="d"
    //this helps track the last key pressed
 break  
 case'a':
keys.a.pressed=true
//these keys make for more fluid movement 
//how fixed the issue of player stopping if u lift up on one of the keys while pressing down 
player.lastKey="a"
break
case "w":
    if(player.position.y>130)
    player.velocity.y=-16
    break  
case " ":
    //empty bar means spacebar
player.attack()
    break
}

    //console.log(event.key)
   // can use this to find the values of the keys pressed on your computer
    }
})

window.addEventListener('keyup', (event) => {
    switch(event.key){
     case "d":
        keys.d.pressed=false
     // this stops the player from moving afrer d is released 
    
     break 
    case'a':
    keys.a.pressed=false
   break 
   case'w':
    keys.w.pressed=false
   break 
    }
    switch(event.key){
        case "ArrowRight":
           keys.ArrowRight.pressed=false
        break 
       case"ArrowLeft":
       keys.ArrowLeft.pressed=false
      break 
      case'ArrowUp':
      break 
       }
    })

