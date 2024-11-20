// Collect The Square game

// Get a reference to the canvas DOM element
var canvas = document.getElementById('canvas');
// Get the canvas drawing context
var context = canvas.getContext('2d');

// Your score
var score = 0;

// Properties for your square
var x = 50; // X position
var y = 100; // Y position
var sideLength = 50; // Length of each side of the square
var speed = sideLength; // Distance to move each frame


// FLags to track which keys are pressed
var down = false;
var up = false;
var right = false;
var left = false;

// Properties for the target square
var targetX = 0;
var targetY = 0;
var targetLength = 25;

// Determine if number a is within the range b to c (exclusive)
function isWithin(a, b, c) {
  return (a > b && a < c);
}

// Countdown timer (in seconds)
var countdown = 30;
var speedTimer = 0;


// ID to track the setTimeout
var id = null;
var speedLapse = null;

//array de posiciones de la cola
const snakePosition = [[x, y], [3, 6],[14, 9]];

// Listen for keydown events
canvas.addEventListener('keydown', function(event) {
  event.preventDefault();
  console.log(event.key, event.keyCode);
  switch(event.keyCode){
    case 40:    // DOWN
      allFalse();
      down = true;
      break;

    case 38:   // UP
      allFalse();
      up = true;
      break;

    case 37:   // LEFT
      allFalse();
      left = true;
      break;

    case 39:  // RIGHT
      allFalse();
      right = true;
      break;

    default:
      break;
  }
  // if (event.keyCode === 40) { // DOWN
  //   allFalse();
  //   down = true;
  // }
  // if (event.keyCode === 38) { // UP
  //   allFalse();
  //   up = true;
  // }
  // if (event.keyCode === 37) { // LEFT
  //   allFalse();
  //   left = true;
  // }
  // if (event.keyCode === 39) { // RIGHT
  //   allFalse();
  //   right = true;
  // }
});

//so all directions get disabled
function allFalse(){
  down = false;
  up = false;
  left = false;
  right = false;
}

// Listen for keyup events
// canvas.addEventListener('keyup', function(event) {
//   event.preventDefault();
//   console.log(event.key, event.keyCode);
//   if (event.keyCode === 40) { // DOWN
//     down = false;
//   }
//   if (event.keyCode === 38) { // UP
//     up = false;
//   }
//   if (event.keyCode === 37) { // LEFT
//     left = false;
//   }
//   if (event.keyCode === 39) { // RIGHT
//     right = false;
//   }
// });

// Show the start menu
function menu() {
  erase();
  context.fillStyle = '#000000';
  context.font = '36px Arial';
  context.textAlign = 'center';
  context.fillText('Collect the Square!', canvas.width / 2, canvas.height / 4);
  context.font = '24px Arial';
  context.fillText('Click to Start', canvas.width / 2, canvas.height / 2);
  context.font = '18px Arial'
  context.fillText('Use the arrow keys to move', canvas.width / 2, (canvas.height / 4) * 3);
  // Start the game on a click
  canvas.addEventListener('click', startGame);
}

// Start the game
function startGame() {
	// Reduce the countdown timer ever second
  id = setInterval(function() {
    // countdown--;
  }, 1000)
  speedLapse = setInterval(function() {
    speedTimer++;
  }, 700)

  //start moving to right
  right = true;

  // Stop listening for click events
  canvas.removeEventListener('click', startGame);
  // Put the target at a random starting point
	moveTarget();
  // Kick off the draw loop
  draw();
}

// Show the game over screen
function endGame() {
	// Stop the countdown
  clearInterval(id);
  // Display the final score
  erase();
  context.fillStyle = '#000000';
  context.font = '24px Arial';
  context.textAlign = 'center';
  context.fillText('Final Score: ' + score, canvas.width / 2, canvas.height / 2);
}

// Move the target square to a random position
function moveTarget() {
  targetX = Math.round(Math.random() * (canvas.width - targetLength));
  targetY = Math.round(Math.random() * (canvas.height - targetLength));
}

//actualiza las posiciones de la cola
function updateSnake(){
  for(let i = snakePosition.length-1; i > 0; i--){
    snakePosition[i][0] = snakePosition[i-1][0];
    snakePosition[i][1] = snakePosition[i-1][1];
  }
  snakePosition[0][0] = x;
  snakePosition[0][1] = y;
}

// Clear the canvas
function erase() {
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, 600, 400);
}

//Draw all Squares in position
function drawSquares(){
  for(let i = 0; i < snakePosition.length ; i++){
    context.fillStyle = '#FF0000';
    context.fillRect(snakePosition[i][0], snakePosition[i][1], sideLength, sideLength);
  }
}

// The main draw loop
function draw() {
  erase();
//   console.log(canvas.width)  600
//   console.log(canvas.height) 400
  // Move the square

  // console.log(speedTimer)
  if(speedTimer>0){
    if(down || up || right || left){
      if (down) {
        y += speed;
      }
      else if (up) {
        y -= speed;
      }
      else if (right) {
        x += speed;
      }
      else if (left) {
        x -= speed;
      }
      speedTimer = 0;
      updateSnake();
    }
   
  }

    

   
    
  
  // Keep the square within the bounds
  if (y + sideLength > canvas.height) {
    y = canvas.height - sideLength;
  }
  if (y < 0) {
    y = 0;
  }
  if (x < 0) {
    x = 0;
  }
  if (x + sideLength > canvas.width) {
    x = canvas.width - sideLength;
  }
  
  //Collisions
  // Collide with the target
  if (isWithin(targetX, x, x + sideLength) || isWithin(targetX + targetLength, x, x + sideLength)) { // X
    if (isWithin(targetY, y, y + sideLength) || isWithin(targetY + targetLength, y, y + sideLength)) { // Y
      // Respawn the target
      moveTarget();
      // Increase the score
      score++;
    }
  }
  // Draw the square
  drawSquares();

  console.log("update snake")
  // Draw the target 
  context.fillStyle = '#00FF00';
  context.fillRect(targetX, targetY, targetLength, targetLength);
  // Draw the score and time remaining
  context.fillStyle = '#000000';
  context.font = '24px Arial';
  context.textAlign = 'left';
  context.fillText('Score: ' + score, 10, 24);
  context.fillText('Time Remaining: ' + countdown, 10, 50);
  // End the game or keep playing
  if (countdown <= 0) {
    endGame();
  } else {
    window.requestAnimationFrame(draw);
  }
}

// Start the game
menu();
canvas.focus();
