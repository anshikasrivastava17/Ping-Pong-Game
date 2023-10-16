//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context; 

//players (bats' variables for the ball)
let playerWidth = 10;
let playerHeight = 50;
let playerVelocityY = 0;

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

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

     //draw initial player1
     context.fillStyle="skyblue";  //fill color of bat as blue
     context.fillRect(player1.x, player1.y, playerWidth, playerHeight); //make the bat as a rect
     // x y coordinates for position and dimensions for height width of bat

     requestAnimationFrame(update);
}

