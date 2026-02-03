import { WINNING_COMBINATIONS } from "./constants.js";

// HELPER: Checks for a winner inside the simulation
export function checkWinnerInternal(board) {
    for (const combo of WINNING_COMBINATIONS) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) return combo;
    }

    if (!board.includes(null)) return 'tie';
    return null;
}

export function lockDifficulty(difficultySelect) {
    difficultySelect.disabled = true;
    difficultySelect.style.opacity = "0.5";
    difficultySelect.style.cursor = "not-allowed";
}

export function unlockDifficulty(difficultySelect) {
    difficultySelect.disabled = false;
    difficultySelect.style.opacity = "1";
    difficultySelect.style.cursor = "pointer";
}