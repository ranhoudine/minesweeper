import Queue from './Queue'
import { BOARD_SIZE } from '../App'

class ArrayCell {
    constructor(row, col) {
        this.row = row
        this.col = col
    }
}
let totalRevealedTiles = 0
function createKey(i, j) {
    return i.toString() + ',' + j.toString();
}
function revealNeighboringTiles(board, i, j) {
    // scans the neigboring tiles in a BFS-fashion, revealing all tiles with no surrounding mines.
    const enqueuedAlready = (i, j) => {
        const key = createKey(i, j);
        return history[key];
    }
    const shouldStepInTile = (row, col) => { return !board[row][col].hasMine && !board[row][col].isRevealed && !enqueuedAlready(row, col) }
    const step = (row, col) => {
        q.enqueue(new ArrayCell(row, col));
        history[createKey(row, col)] = true;
    }

    let numberOfRevealedTiles = 0;

    let history = {};
    let q = new Queue();
    step(i, j)
    while (!q.isEmpty()) {
        let currentNode = q.dequeue()
        let row = currentNode.row
        let col = currentNode.col
        board[row][col].isRevealed = true
        numberOfRevealedTiles++;
        if (board[row][col].numSurroundingMines > 0) {
            continue
        }
        if (row > 0) {
            if (col > 0 && shouldStepInTile(row - 1, col - 1)) {
                step(row - 1, col - 1);
            }
            if (shouldStepInTile(row - 1, col)) {
                step(row - 1, col);
            }
            if (col < BOARD_SIZE - 1 && shouldStepInTile(row - 1, col + 1)) {
                step(row - 1, col + 1);
            }
        }
        if (row < BOARD_SIZE - 1) {
            if (col > 0 && shouldStepInTile(row + 1, col - 1)) {
                step(row + 1, col - 1);
            }
            if (shouldStepInTile(row + 1, col)) {
                step(row + 1, col);
            }
            if (col < BOARD_SIZE - 1 && shouldStepInTile(row + 1, col + 1)) {
                step(row + 1, col + 1);
            }
        }
        if (col > 0 && shouldStepInTile(row, col - 1)) {
            step(row, col - 1);
        }
        if (col < BOARD_SIZE - 1 && shouldStepInTile(row, col + 1)) {
            step(row, col + 1);
        }

    }
    totalRevealedTiles += numberOfRevealedTiles

    return [board, totalRevealedTiles]



}

function calculateSurroundingMines(board, buttonIndex) {
    let [row, col] = get2DIndex(buttonIndex, BOARD_SIZE)
    let numSurroundingMines = 0
    if (row > 0 && col > 0 && board[row - 1][col - 1].hasMine) {
        numSurroundingMines++
    }
    if (row > 0 && board[row - 1][col].hasMine) {
        numSurroundingMines++
    }
    if (row > 0 && col < BOARD_SIZE - 1 && board[row - 1][col + 1].hasMine) {
        numSurroundingMines++
    }
    if (row < BOARD_SIZE - 1 && col > 0 && board[row + 1][col - 1].hasMine) {
        numSurroundingMines++
    }
    if (row < BOARD_SIZE - 1 && board[row + 1][col].hasMine) {
        numSurroundingMines++
    }
    if (row < BOARD_SIZE - 1 && col < BOARD_SIZE - 1 && board[row + 1][col + 1].hasMine) {
        numSurroundingMines++
    }
    if (col > 0 && board[row][col - 1].hasMine) {
        numSurroundingMines++
    }
    if (col < BOARD_SIZE - 1 && board[row][col + 1].hasMine) {
        numSurroundingMines++
    }
    return numSurroundingMines
}

function calculateSurroundingFlags(board, buttonIndex) {
    let [row, col] = get2DIndex(buttonIndex, BOARD_SIZE)
    let numSurroundingFlags = 0
    if (row > 0 && col > 0 && board[row - 1][col - 1].isFlagged) {
        numSurroundingFlags++
    }
    if (row > 0 && board[row - 1][col].isFlagged) {
        numSurroundingFlags++
    }
    if (row > 0 && col < BOARD_SIZE - 1 && board[row - 1][col + 1].isFlagged) {
        numSurroundingFlags++
    }
    if (row < BOARD_SIZE - 1 && col > 0 && board[row + 1][col - 1].isFlagged) {
        numSurroundingFlags++
    }
    if (row < BOARD_SIZE - 1 && board[row + 1][col].isFlagged) {
        numSurroundingFlags++
    }
    if (row < BOARD_SIZE - 1 && col < BOARD_SIZE - 1 && board[row + 1][col + 1].isFlagged) {
        numSurroundingFlags++
    }
    if (col > 0 && board[row][col - 1].isFlagged) {
        numSurroundingFlags++
    }
    if (col < BOARD_SIZE - 1 && board[row][col + 1].isFlagged) {
        numSurroundingFlags++
    }
    return numSurroundingFlags
}

function get2DIndex(buttonIndex, rowLength) {
    let row = Math.floor(buttonIndex / rowLength);
    let indexInRow = buttonIndex % rowLength;
    return [row, indexInRow];
}

function get1DIndex(row, col, rowLength) {
    return rowLength * row + col;
}

export { revealNeighboringTiles, calculateSurroundingMines, get2DIndex, get1DIndex, calculateSurroundingFlags };
