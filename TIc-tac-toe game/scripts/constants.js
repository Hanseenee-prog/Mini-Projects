// The markers used on the board
export const PLAYER_X = `
    <svg viewBox="0 0 100 100" class="cell-content">
        <line x1="10" y1="10" x2="90" y2="90" stroke="#ff2d55" stroke-width="8" stroke-linecap="round"/>
        <line x1="90" y1="10" x2="10" y2="90" stroke="#ff2d55" stroke-width="8" stroke-linecap="round"/>
    </svg>
`;

export const PLAYER_O = `
    <svg viewBox="0 0 100 100" class="cell-content">
        <circle cx="50" cy="50" r="40" stroke="#00d2ff" stroke-width="8" fill="none"/>
    </svg>
`;

// The 8 ways to win: 3 rows, 3 columns, 2 diagonals
// These represent the index positions in your 9-slot array (0-8)
export const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initial state of the game board (9 empty slots)
export const INITIAL_BOARD = [null, null, null, null, null, null, null, null, null];
