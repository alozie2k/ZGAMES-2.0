function rectangularCollision({
    rectangle1, rectangle2
    //have to pass in an argument to make sure you have a player.attackbox and enemy .postion to reference
    }){
    
        //detect our collision
    return(
        rectangle1.attackBox.position.x+rectangle1.attackBox.width>=rectangle2.position.x
        //x gets the leftside of the attack box and width gives the right hand side that add ups to the right side location of the attackbox
        //emeny x gets the left side postion of the players body
        // with coolosion your trying to find if the right side of the attack box is greater than the left side of the enemies body    
        &&rectangle1.attackBox.position.x<=rectangle2.position.x+rectangle2.width
        //aslo got to make sure that when the player goes past the attackbox it doesnt still count it as an attack
        //so got to detect if the right side of the attack box is less than equal to the right side of the player,
        //so gotta check if the left side of the player passes the right side of the other player body 
        &&rectangle1.attackBox.position.y+rectangle1.attackBox.height>=rectangle2.position.y
        &&player.attackBox.position.y<=rectangle2.position.y+rectangle2.height
        //also got to make sure when a player jump it doesnt count as an attackbox
        &&rectangle1.isAttacking&&rectangle1.health>0
        //make sure that it only registers the player has been hit once
    )
    }
    
    let tier=false
    function determineWinner({ player, enemy, timerId }) {
        clearTimeout(timerId)
        //stops the settimeoutloop
        document.querySelector('#displayText').style.display = 'flex'
        if (player.health === enemy.health) {
          document.querySelector('#displayText').innerHTML = 'Tie  Press P to Play Again'
        tier=true
        } else if (player.health > enemy.health) {
          document.querySelector('#displayText').innerHTML = 'Player 1 Wins Press P to Play Again'
        } else if (player.health < enemy.health) {
          document.querySelector('#displayText').innerHTML = 'Player 2 Wins Press P to Play Again'
        }
      }
    
    
      var timer=60
    var timerId
   
    function decreaseTimer(){
    // is used to decrase the number in timer by one
  console.log(timer)
    timerId=setTimeout(decreaseTimer,1000)
    //this creates a loop for our function that activates every 1000 miliseconds/every 1 second
    // set timeid equal to the settimeout so each time its called it returns a value/number that we can use through timer id

    if(timer>0){
    timer--
    //if timer isnt less than zero subtract it by one
    
    document.querySelector('#timer').innerHTML = timer
    //user innerhtml to access the html in the div id  and set equal to the timer value
    }
    if(timer===0){
        determineWinner({ player, enemy, timerId })
    //document.querySelector('#displayText').innerHTML = 'Tie'
    }
    
    
    }