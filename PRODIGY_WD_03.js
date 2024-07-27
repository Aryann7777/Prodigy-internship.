const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] !== '' || !isGameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        displayResult(`Player ${currentPlayer} wins!`);
        isGameActive = false;
        return;
    }

    if (gameState.every(cell => cell !== '')) {
        displayResult('Game is a draw!');
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}


function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}


function displayResult(message) {
    setTimeout(() => {
        alert(message);
        resetGame();
    }, 100);
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
