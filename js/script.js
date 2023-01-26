// Constants to easily switch between x and o and to use throughout my script without having to duplicate x and o everywhere
const xClass = 'x'
const oClass = 'o'
// Multi-dimensional array for winning combinations horizontally, vertically, diagonally
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
// Want to select all the Cells
const cellElements = document.querySelectorAll('[data-cell]');
// Getting Board to apply hover effect
const board = document.getElementById('board')
// For winning end of game results
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
// To Show winner effect
const winningMessageElement = document.getElementById('winningMessage')
// Button to reset the game
const resetButton = document.getElementById('reset')
// To check for whose turn it is
let oTurn;
// Event listener to reset game
resetButton.addEventListener('click', startGame)
// Call StartGame Function to initiate the game and hover
startGame()
// Function to start game and set hover effect
function startGame() {
    // Set oTurn to false to show hover effect
    oTurn = false
    // Loop(select) Cell elements to set up utilizing ES6
    cellElements.forEach(cell => {
        cell.classList.remove(xClass)
        cell.classList.remove(oClass)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    // Call Hover Function so that it is applied at the beginning
    setBoardHoverState()
    winningMessageElement.classList.remove('show')
}

// Creating callback function
function handleClick(e) {
    console.log('clicked')
    // Getting the clicked on Cell
    const currentCell = e.target
    // Constant Current class boolean
    const currentClass = oTurn ? oClass : xClass
    // Place the Mark
    placeMark(currentCell, currentClass)
    // Check for Win and Draw
    if(checkWin(currentClass)) {
        console.log('winner')
        endGame(false)
    }
    else if(isDraw()) {
        endGame(true)
    }
    // Check for Draw
    // Switch Turns
    switchTurns()
    // Apply Hover States, after I switch turns so that I know which current play turn it is and so that this effect if based on whose turn it currently is
    setBoardHoverState()
}
function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerText = 'Draw!'
    }
    else{
        // Checking for current winner
    winningMessageTextElement.innerHTML = `${oTurn ? "O's" : "X's"} Wins!`
    }
    // Applying winner effect message
    winningMessageElement.classList.add('show')
}
// Draw Function - This function returns true
function isDraw() {
    // Check to see if every Cell is filled
    return [...cellElements].every( cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(oClass)
    })
}
// Place Mark Function
function placeMark(currentCell, currentClass) {
    currentCell.classList.add(currentClass)
}
// Switch Turns Function
function switchTurns() {
    oTurn = !oTurn
}
// Apply Hover State Function
function setBoardHoverState() {
    // Remove both classes
    board.classList.remove(xClass)
    board.classList.remove(oClass)
    // Check for whose turn it is currently
    if(oTurn) {
        // Add Circle/o class
        board.classList.add(oClass)
    }
    // Else add x class
    else {
        board.classList.add(xClass)
    }
}
// Function to check for win
function checkWin(currentClass) {
    // using .some() will return true if any combination is true
    return winningCombinations.some(combo => {
        // Then I want to check if the winningCombination has all of the same class in its Cells
        return combo.every(index => {
            // Then check the winning cellElements indexes classes for all the same current class
            return cellElements[index].classList.contains(currentClass)
        })
    })
}