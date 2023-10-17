//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context; 

//players (bats' variables for the ball)
let playerWidth = 10;
let playerHeight = 50;
let playerVelocityY = 0;  //to make bats move up nd down; only velocityY needed bcoz paddle can go up nd down

let player1 = {  //object
    x : 10,
    y : boardHeight/2,
    width: playerWidth,
    height: playerHeight,
    velocityY : 0
}

let player2 = {
    x : boardWidth - playerWidth - 10, //initial 10 used up by prev player
    y : boardHeight/2,
    width: playerWidth,
    height: playerHeight,
    velocityY : 0
}

//ball
let ballWidth = 10;
let ballHeight = 10;
let ball = {            //ball object
    x : boardWidth/2,  //to centre it horizontally nd vertically
    y : boardHeight/2,
    width: ballWidth,
    height: ballHeight,
    velocityX : 1,  //moving left & right
    velocityY : 2   //moving up & down
}


window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

     //draw initial player1
     context.fillStyle="skyblue";  //fill color of bat as blue
     context.fillRect(player1.x, player1.y, playerWidth, playerHeight); //FOR PLAYER 1 only : make the bat as a rect
     // x y coordinates for position and dimensions for height width of bat

     requestAnimationFrame(update); //func to update positions of bat, when it goes up y coordinates - and vice versa
     document.addEventListener("keyup", movePlayer);
}

function update(){
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);
    //player1
    context.fillStyle="skyblue";  //fill color of bat as blue

    //  player1.y += player1.velocityY;
    //not doing this bcoz it stretches it across the screen without clearing canvas; 
    //also even if canvas is clean it crosses the screen so need a check for that.
    //So dont directly update player1. Update it only if it is in bounds
    let nextPlayer1Y = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, playerWidth, playerHeight);



    //player2 - make bat for 2nd player
    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, playerWidth, playerHeight);
    // player2.y += player2.velocityY;  
    
}

function outOfBounds(yPosition) {  //func to check bounds so paddle doesnt cross the screen
    //returns true or false
    return (yPosition < 0 || yPosition + playerHeight > boardHeight);
}


function movePlayer(e) {
    //player1
    if (e.code == "KeyW") {  //up means y coordinate decreasing for a board that starts from 0/1
        player1.velocityY = -3;
    }

    else if (e.code == "KeyS") {
        player1.velocityY = 3;
    }

     //player2
     if (e.code == "ArrowUp") {
        player2.velocityY = -3;
    }
    else if (e.code == "ArrowDown") {
        player2.velocityY = 3;
    }
}