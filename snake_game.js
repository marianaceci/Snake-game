//declare global variables to track game board size
const LINE_PIXEL_COUNT = 40
const TOTAL_PIXEL_COUNT = LINE_PIXEL_COUNT**2

//track scores to display to user
let totalFoodEaten = 0
let totalDistanceTraveled = 0

//shorten reference to game board
const gameContainer = document.getElementById('gameContainer')

//generate the game board
const createGameBoardPixels = () => {
    for(let i = 1; i <= TOTAL_PIXEL_COUNT; i++){
        gameContainer.innerHTML = `${gameContainer.innerHTML} <div class = 'gameBoardPixel' id = 'pixel${i}'></div>`
    }
}

//shorten references to game pixels
const gameBoardPixel = document.getElementsByClassName('gameBoardPixel')

let currentFoodPosition = 0 //initial value

//create the randomly generated food items in the game board
const createFood = () => {
    gameBoardPixel[currentFoodPosition].classList.remove('food') //removes the food from its current position

    currentFoodPosition = Math.floor(Math.random()*TOTAL_PIXEL_COUNT) //generates a random number inside the board

    gameBoardPixel[currentFoodPosition].classList.add('food')
}

//start setting up snake behavior
const LEFT_DIR = 37 //code for that key
const UP_DIR = 38
const RIGHT_DIR = 39
const DOWN_DIR = 40

//initial direction for the snake
let snakeCurrentDirection = RIGHT_DIR

//make sure the user input is valid and change snake direction variable
const changeDirection = newDirectionCode => {
    if(newDirectionCode == snakeCurrentDirection) return;

    if(newDirectionCode == LEFT_DIR && snakeCurrentDirection !== RIGHT_DIR){
        snakeCurrentDirection = newDirectionCode
    } else if(newDirectionCode == UP_DIR && snakeCurrentDirection !== DOWN_DIR){
        snakeCurrentDirection = newDirectionCode
    } else if(newDirectionCode == RIGHT_DIR && snakeCurrentDirection !== LEFT_DIR){
        snakeCurrentDirection = newDirectionCode
    } else if(newDirectionCode == DOWN_DIR && snakeCurrentDirection !== UP_DIR){
        snakeCurrentDirection = newDirectionCode
    }
}

//inital snake position to the center of the game board
let currentHeadPosition = TOTAL_PIXEL_COUNT/2

//set initial length
let snakeLength = 200













