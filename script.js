//Highscore text and its value
const highScore = document.querySelector(`.highScoreTxt`);
let highScoreValue = document.querySelector(`.highScoreValue`);

//Score and its value
const scoreTxT = document.querySelector(`.scoreTxt`);
//scoreDisplay=ScoreValue
let scoreDisplay = document.querySelector(".scoreValue");

//grid=snakeGame
let grid = document.querySelector(".snake-game");
//Play button and replay button
let playGame = document.querySelector(`.startGame`);
//popup=.replayGame that needs to be chnaged to PlayGame
let snakeGame = document.querySelector(".replayGame");
//playAgain=.reStartGame (the button)
let playAgain = document.querySelector(".reStartGame");

// Arrow btns box

const arrowBox = document.querySelector(`.arrowBtnsBox`);
//All arrow btnws
const arrowUp = document.querySelector(`.upBtn`);
const arrowDown = document.querySelector(`.downBtn`);
const arrowLeft = document.querySelector(`.leftBtn`);
const arrowRight = document.querySelector(`.rightBtn`);

//You lost text

const loseMsg = document.querySelector(`.loseMsgTxt`);

/* ------------------------- */
//Leave as it is
let width = 25;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;
let score = 0;

/* -------------------------- */

//This is arrow box you see on the screen.
//When pressed down the arrow-keys chagnes color to green and also scale down
//To mimic animation
document.addEventListener(`keydown`, function (event) {
  console.log(event.key);
  if (event.key === `ArrowUp`) {
    arrowUp.style.transform = `scale(0.8)`;
    arrowUp.style.background = `rgb(11, 236, 86)`;
  } else if (event.key === `ArrowDown`) {
    arrowDown.style.transform = `scale(0.8)`;
    arrowDown.style.background = `rgb(11, 236, 86)`;
  } else if (event.key === `ArrowLeft`) {
    arrowLeft.style.transform = `scale(0.8)`;
    arrowLeft.style.background = `rgb(11, 236, 86)`;
  } else if (event.key === `ArrowRight`) {
    arrowRight.style.transform = `scale(0.8)`;
    arrowRight.style.background = `rgb(11, 236, 86)`;
  }
});
//When realesed  the arrow-keys chagnes color and scale back to riginal
//To mimic animation
document.addEventListener(`keyup`, function (event) {
  console.log(event.key);
  if (event.key === `ArrowUp`) {
    arrowUp.style.transform = `scale(1)`;
    arrowUp.style.background = `rgb(208, 255, 0)`;
  } else if (event.key === `ArrowDown`) {
    arrowDown.style.transform = `scale(1)`;
    arrowDown.style.background = `rgb(208, 255, 0)`;
  } else if (event.key === `ArrowLeft`) {
    arrowLeft.style.transform = `scale(1)`;
    arrowLeft.style.background = `rgb(208, 0, 255)`;
  } else if (event.key === `ArrowRight`) {
    arrowRight.style.transform = `scale(1)`;
    arrowRight.style.background = `rgb(208, 0, 255)`;
  }
});
//Function to set the body to random colors when the snake eats a apple.
function getRandomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(` + r + `,` + g + `,` + b + `)`;
}
/* ----------------------------------------- */
//From now on the code will be inspired by
//https://www.freecodecamp.org/news/how-to-build-a-snake-game-in-javascript/
//I have made some changes to match my code over.
//All in all the page functions as I wanted (read the word doc)

//Play again button that activates another fucntion
playAgain.addEventListener(`click`, reStartGameOnClick);

//Function to reset and restart the game, while leaving High Score alone.
function reStartGameOnClick() {
  document.body.style.background = `white`;
  score = 0;
  grid.innerHTML = "";
  playGame.style.display = `none`;
  loseMsg.style.display = `none`;

  grid.focus();
  window.addEventListener(
    `keydown`,
    function (e) {
      if ([`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`].includes(e.key)) {
        e.preventDefault();
      }
    },
    false
  );
  document.addEventListener("keyup", control);
  createBoard();
  startGame();
  control();
}

//Function to start game at the loaded page
function startGameOnClick() {
  playGame.style.display = `none`;
  grid.focus();
  window.addEventListener(
    `keydown`,
    function (e) {
      if ([`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`].includes(e.key)) {
        e.preventDefault();
      }
    },
    false
  );
  document.addEventListener("keyup", control);
  createBoard();
  startGame();
  control();
}

playGame.addEventListener("click", startGameOnClick);

//createboard function
function createBoard() {
  snakeGame.style.display = "none";
  for (let i = 0; i < 625; i++) {
    // Create 625 squares
    let div = document.createElement("div");
    grid.appendChild(div);
  }
}

// startgame function
function startGame() {
  let squares = document.querySelectorAll(".snake-game div");
  randomApple(squares);
  direction = 1;
  scoreDisplay.innerHTML = score;
  intervalTime = 1000;
  currentSnake = [2, 1, 0];
  currentIndex = 0;
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  interval = setInterval(moveOutcome, intervalTime);
}

function moveOutcome() {
  let squares = document.querySelectorAll(".snake-game div");
  if (checkForHits(squares)) {
    if (score >= highScoreValue.textContent) {
      highScoreValue.textContent = score;
    }
    snakeGame.style.display = "flex";
    playAgain.style.display = `block`;
    loseMsg.style.display = `block`;

    return clearInterval(interval);
  } else {
    moveSnake(squares);
  }
}

function moveSnake(squares) {
  let tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);
  // movement ends here
  eatApple(squares, tail);
  squares[currentSnake[0]].classList.add("snake");
}

function checkForHits(squares) {
  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width <= 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains("snake")
  ) {
    return true;
  } else {
    return false;
  }
}

function eatApple(squares, tail) {
  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    currentSnake.push(tail); // Add a new part to the tail of the snake
    squares[tail].classList.add("snake"); // Add the 'snake' class to the new part
    randomApple(squares);
    score++;
    scoreDisplay.textContent = score;
    clearInterval(interval);
    intervalTime = intervalTime * speed;
    interval = setInterval(moveOutcome, intervalTime);
    document.body.style.background = getRandomColor(); //Random color generator not AI
  }
}

function randomApple(squares) {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}

//Updated the code, changed from e.keycode to e.key and according name of the keys wanted
function control(e) {
  if (e.key === `ArrowRight`) {
    direction = 1; // right
  } else if (e.key === `ArrowUp`) {
    direction = -width; //if we press the up arrow, the snake will go ten divs up
  } else if (e.key === `ArrowLeft`) {
    direction = -1; // left, the snake will go left one div
  } else if (e.key === `ArrowDown`) {
    direction = +width; // down the snake head will instantly appear 10 divs below from the current div
  }
}

/* ----------------------------------------- */
