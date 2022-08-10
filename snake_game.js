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

//start moving snake by comparison, wrap around to toher side of screen if needed
const moveSnake = () => {
    switch(snakeCurrentDirection){
        case LEFT_DIR: //decrease location on the board
            --currentHeadPosition
            const isHeadAtLeft = currentHeadPosition % LINE_PIXEL_COUNT == LINE_PIXEL_COUNT - 1 || currentHeadPosition < 0 //check edge behavior with boolean
            if(isHeadAtLeft) {
                currentHeadPosition = currentHeadPosition + LINE_PIXEL_COUNT
            }
        break;

        case RIGHT_DIR:
            ++currentHeadPosition
            const isHeadAtRight = currentHeadPosition % LINE_PIXEL_COUNT == 0
            if(isHeadAtRight) {
                currentHeadPosition = currentHeadPosition - LINE_PIXEL_COUNT
            }
        break;

        case UP_DIR:
            currentHeadPosition = currentHeadPosition - LINE_PIXEL_COUNT
            const isHeadAtTop = currentHeadPosition < 0
            if(isHeadAtTop) {
                currentHeadPosition = currentHeadPosition + TOTAL_PIXEL_COUNT
            }
        break;

        case DOWN_DIR:
            currentHeadPosition = currentHeadPosition + LINE_PIXEL_COUNT
            const isHeadAtBottom = currentHeadPosition > TOTAL_PIXEL_COUNT -1
            if(isHeadAtBottom) {
                currentHeadPosition = currentHeadPosition - TOTAL_PIXEL_COUNT
            }
        break;
        default:
        break;
    }

    //accessed the correct pixel within the html collection
    let nextSnakeHeadPixel = gameBoardPixel[currentHeadPosition]
    
    //if snake intersect with itself, then the game ends
    //if that pixel already has the body assigned
    if(nextSnakeHeadPixel.classList.contains('snakeBodyPixel')){
        clearInterval(moveSnakeInterval)
        alert(`You have eaten ${totalFoodEaten} food and traveled ${totalDistanceTraveled} blocks.`)
        window.location.reload() //restarts the game
    } 

    //assuming an empty pixel, add snake body styling
    nextSnakeHeadPixel.classList.add('snakeBodyPixel')

    //remove snake styling to keep snake appropriate length
    setTimeout(() => {
        nextSnakeHeadPixel.classList.remove('snakeBodyPixel')
    }, snakeLength)

    //describe what to do if teh snake encounters a food pixel
    if(currentHeadPosition == currentFoodPosition) {
        totalFoodEaten++
        document.getElementById('pointsEarned').innerText = totalFoodEaten
        snakeLength += 100
        createFood()
    }

    //added distance traveled count
    totalDistanceTraveled++
    document.getElementById('blocksTraveled').innerText = totalDistanceTraveled
}

//call initial functions to create board and start game
createGameBoardPixels();
createFood();

//set animation speed
let moveSnakeInterval = setInterval(moveSnake, 100)

addEventListener('keydown', e => changeDirection(e.keyCode))

//adding variables for on-screen buttons
const leftButton = document.getElementById('leftButton')
const rightButton = document.getElementById('rightButton')
const upButton = document.getElementById('upButton')
const downButton = document.getElementById('downButton')

//adding listeners for on-screen buttons
leftButton.onclick = () => changeDirection(LEFT_DIR)
rightButton.onclick = () => changeDirection(RIGHT_DIR)
upButton.onclick = () => changeDirection(UP_DIR)
downButton.onclick = () => changeDirection(DOWN_DIR)






