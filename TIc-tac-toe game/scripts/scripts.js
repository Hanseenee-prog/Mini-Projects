import { 
    PLAYER_X, 
    PLAYER_O, 
    INITIAL_BOARD, 
} from "./constants.js";

import { getComputerMove } from "./ai.js";
import { checkWinnerInternal, lockDifficulty, unlockDifficulty } from "./helpers.js";

const statusText = document.querySelector('.status');
const difficultySelect = document.getElementById('difficulty');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');

// GAME STATE VARIABLES
let isPlayerX = true;         // Tracks strictly whose turn it is (X or O)
let currentMarker = PLAYER_X; // The SVG to draw
let gameOver = false;
let humanPlaysX = false;      // We start false, so the first reset flips it to true (Human = X)
let aiTimeout = null;         // Store timer ID to cancel it on reset

function initGame() {
    const savedDifficulty = localStorage.getItem('ticTacToeDifficulty');
    if (savedDifficulty) difficultySelect.value = savedDifficulty;

    cells.forEach((cell, index) => {
        cell.dataset.index = index;
        cell.addEventListener('click', handleCellClick);
    });

    difficultySelect.addEventListener('change', (e) => {
        localStorage.setItem('ticTacToeDifficulty', e.target.value);
    });

    resetButton.addEventListener('click', resetGame);
    
    // Start the first game
    resetGame();
}

function handleCellClick(e) {
    if (gameOver) return;

    // Prevent human from clicking if it's AI's turn
    if (humanPlaysX && !isPlayerX) return;
    if (!humanPlaysX && isPlayerX) return;

    lockDifficulty(difficultySelect); // prevent selecting if game starts

    const clickedCell = e.target.closest('.cell');
    const index = clickedCell.dataset.index;

    if (
        INITIAL_BOARD[index] === "x" || 
        INITIAL_BOARD[index] === "o" || 
        clickedCell.innerHTML !== ""
    ) return;

    // Human makes their move
    makeMove(index);

    gameOver = checkWinner();

    // Trigger AI if game isn't over
    if (!gameOver) {
        statusText.innerText = "Computer is thinking...";
        // Clear any existing timer before setting a new one
        if (aiTimeout) clearTimeout(aiTimeout);
        aiTimeout = setTimeout(triggerComputerMove, 600);
    }
}

function triggerComputerMove() {
    if (gameOver) return;
    
    const difficulty = difficultySelect.value;
    
    // Tell the AI who it is playing as (if Human is X, AI is O)
    const aiSymbol = humanPlaysX ? "o" : "x";
    const aiIndex = getComputerMove(difficulty, aiSymbol);

    if (aiIndex !== null && aiIndex !== undefined) {
        makeMove(aiIndex);
        if (!gameOver) {
            statusText.innerText = humanPlaysX ? 'Your Turn (X)' : 'Your Turn (O)';   
        }
    }
}

function makeMove(index) {
    const clickedCell = cells[index];

    // Update the UI
    clickedCell.innerHTML = currentMarker;
    clickedCell.classList.add(isPlayerX ? "cell-x" : "cell-o");

    // Update the data tracking array
    INITIAL_BOARD[index] = isPlayerX ? "x" : "o";

    // Switch turns
    isPlayerX = !isPlayerX;
    currentMarker = isPlayerX ? PLAYER_X : PLAYER_O;  

    checkWinner();
}

function checkWinner() {
    let isDraw = false;
    let result = checkWinnerInternal(INITIAL_BOARD);

    if (result === "tie") isDraw = true; 
    else if (!result) return false;
    else {
        // Someone won
        const winnerSymbol = INITIAL_BOARD[result[0]];
        const isHumanWinner = (humanPlaysX && winnerSymbol === "x") || 
                              (!humanPlaysX && winnerSymbol === "o");
        
        statusText.textContent = isHumanWinner ? "You Win!" : "Computer Wins!";
        endGame(winnerSymbol, result);
        return true;
    }

    if (isDraw) {
        statusText.textContent = "It's a draw";
        // Clear timer so reset doesn't overlap
        if (aiTimeout) clearTimeout(aiTimeout);
        aiTimeout = setTimeout(resetGame, 2000); 
        return true;
    }

    return false;
}

function endGame(winner, combo) {
    gameOver = true;
    // Highlight winning cells
    combo.forEach(index => {
        cells[index].style.backgroundColor = winner === "x" ? 'rgba(255, 45, 85, 0.2)' : 'rgba(0, 210, 255, 0.2)';
    });
}

function resetGame() {
    // Stop any pending ai moves
    if (aiTimeout) clearTimeout(aiTimeout);

    gameOver = false;
    
    // Toggle Sides: If Human was X, Human becomes O.
    humanPlaysX = !humanPlaysX; 
    
    // Reset Turn: X always goes first in Tic Tac Toe
    isPlayerX = true; 
    currentMarker = PLAYER_X;
    
    // Clear Board Data
    INITIAL_BOARD.fill(null);

    // Unlock the difficulty
    unlockDifficulty(difficultySelect);

    // Clear UI
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('cell-x', 'cell-o');
        cell.style.backgroundColor = '';
    });

    // Determine who starts
    if (humanPlaysX) {
        statusText.innerText = "Your Turn (X)";
    } else {
        statusText.innerText = "Computer's Turn (X)";
        // If Human is O, AI is X. X goes first.
        aiTimeout = setTimeout(triggerComputerMove, 500);
    }
}

// Start the game
initGame();