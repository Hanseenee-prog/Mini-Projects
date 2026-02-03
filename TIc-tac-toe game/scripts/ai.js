import { INITIAL_BOARD, WINNING_COMBINATIONS } from "./constants.js";
import { checkWinnerInternal } from "./helpers.js";

/**
 * MAIN ENTRY POINT
 * Returns the index (0-8) of the computer's choice.
 */
export function getComputerMove(difficulty) {
    if (difficulty === "easy") return getRandomMove(INITIAL_BOARD);
    if (difficulty === "medium") return getTacticalMove(INITIAL_BOARD); 
    if (difficulty === "hard") return getBestMoveMinimax(INITIAL_BOARD);
}

// HELPER: Finds a spot to complete a 3-in-a-row
function findWinningSpot(board, player) {
    for (const combo of WINNING_COMBINATIONS) {
        const [a, b, c] = combo;
        const values = [board[a], board[b], board[c]];
        
        // If we have 2 of the player's mark and 1 empty spot
        const playerCount = values.filter(v => v === player).length;
        const emptyCount = values.filter(v => v === null).length;

        if (playerCount === 2 && emptyCount === 1) {
            // Return the index of the empty spot
            if (board[a] === null) return a;
            if (board[b] === null) return b;
            if (board[c] === null) return c;
        }
    }
    return null;
}

// LEVEL 1: EASY (Random)
function getRandomMove(board) {
    const available = [];
    board.forEach((cell, index) => {
        if (cell === null) available.push(index);
    });
    
    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
}

// LEVEL 2: MEDIUM (Tactical)
function getTacticalMove(board) {
    // 1. Can I win right now?
    const winningMove = findWinningSpot(board, "o");
    if (winningMove !== null) return winningMove;

    // 2. Do I need to block the human?
    const blockingMove = findWinningSpot(board, "x");
    if (blockingMove !== null) return blockingMove;

    // 3. Take center if available (Strategic)
    if (board[4] === null) return 4;

    // 4. Otherwise, random
    return getRandomMove(board);
}

// LEVEL 3: HARD (Minimax)
function getBestMoveMinimax(board) {
    let bestScore = -Infinity;
    let move = null;

    // Loop through all empty spots
    for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
            board[i] = "o"; // Make a move
            let score = minimax(board, 0, false); // Check outcome
            board[i] = null; // Undo move

            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

// The Recursive Minimax Function
function minimax(board, depth, isMaximizing) {
    let result = checkWinnerInternal(board);
    
    if (result === 'tie') return 0;
    
    // If result is an array (truthy), someone won
    if (result) {
        // Look at the board to see WHO won based on the combo
        const winner = board[result[0]]; 
        if (winner === "o") return 10 - depth; // Computer wins
        if (winner === "x") return depth - 10; // Human wins
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = "o";
                let score = minimax(board, depth + 1, false);
                board[i] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = "x";
                let score = minimax(board, depth + 1, true);
                board[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}
