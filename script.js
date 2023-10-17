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

let player1Score = 0;
let player2Score = 0;

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
    // player2.y += player2.velocityY;  
    context.fillRect(player2.x, player2.y, playerWidth, playerHeight);
    


     // ball
     context.fillStyle = "white";
     ball.x += ball.velocityX;
     ball.y += ball.velocityY;
     context.fillRect(ball.x, ball.y, ballWidth, ballHeight);

     if (ball.y <= 0 || (ball.y + ballHeight >= boardHeight)) {  // if ball touches top or bottom of canvas
        ball.velocityY *= -1; //reverse Y direction
    }


        //bounce the ball back
        if (detectCollision(ball, player1)) {
            if (ball.x <= player1.x + player1.width) { //left side of ball touches right side of player 1 (left paddle)
                ball.velocityX *= -1;   // flip x direction
            }
        }
        else if (detectCollision(ball, player2)) {
            if (ball.x + ballWidth >= player2.x) { //right side of ball touches left side of player 2 (right paddle)
                ball.velocityX *= -1;   // flip x direction
            }
        }
    
    
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


function detectCollision(a, b) { //ball hits any of the paddle
    //intersection of 2 rectangles
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner 
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}