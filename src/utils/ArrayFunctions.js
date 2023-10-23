import Queue from './Queue'
import { BOARD_SIZE } from '../App'

class ArrayCell {
    constructor(row, col) {
        this.row = row
        this.col = col
    }
}

function createKey(i, j) {
    return i.toString() + ',' + j.toString();
}
function revealNeighboringTiles(board, i, j) {
    // scans the neigboring tiles in a BFS-fashion, revealing all tiles with no surrounding mines.
    const enqueuedAlready = (i, j) => {
        const key = createKey(i, j);
        return history[key];
    }
    const shouldStepInTile = (row, col) => {return !board[row][col].hasMine && !board[row][col].isRevealed && !enqueuedAlready(row, col);}
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
        if (board[row][col].surroundingMines > 0) {
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
    return [board, numberOfRevealedTiles]



}

function calculateSurroundingMines(board, buttonIndex) {
    let [i, j] = get2DIndex(buttonIndex, BOARD_SIZE);
    let numSurroundingMines = 0;
    if (i === BOARD_SIZE - 1 && j === BOARD_SIZE - 1) { // bottom right corner
        if (board[i - 1][j - 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i - 1][j].hasMine) {
            numSurroundingMines++;
        }
        if (board[i][j - 1].hasMine) {
            numSurroundingMines++;
        }
        return numSurroundingMines;
    }
    if (i === 0 && j === BOARD_SIZE - 1) { // top right corner
        if (board[i + 1][j].hasMine) {
            numSurroundingMines++;
        }
        if (board[i + 1][j - 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i][j - 1].hasMine) {
            numSurroundingMines++;
        }
        return numSurroundingMines;
    }
    if (i === 0 && j === 0) { // top left corner
        if (board[i + 1][j].hasMine) {
            numSurroundingMines++;
        }
        if (board[i + 1][j + 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i][j + 1].hasMine) {
            numSurroundingMines++;
        }
        return numSurroundingMines;
    }
    if (i === BOARD_SIZE - 1 && j === 0) { // bottom left corner
        if (board[i - 1][j].hasMine) {
            numSurroundingMines++;
        }
        if (board[i - 1][j + 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i][j + 1].hasMine) {
            numSurroundingMines++;
        }
        return numSurroundingMines;
    }
    if (j === BOARD_SIZE - 1) { // right column
        if (board[i - 1][j].hasMine) {
            numSurroundingMines++;
        }
        if (board[i - 1][j - 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i][j - 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i + 1][j - 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i + 1][j].hasMine) {
            numSurroundingMines++;
        }
        return numSurroundingMines;
    }
    if (j === 0) { // left column
        if (board[i - 1][j].hasMine) {
            numSurroundingMines++;
        }
        if (board[i - 1][j + 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i][j + 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i + 1][j + 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i + 1][j].hasMine) {
            numSurroundingMines++;
        }
        return numSurroundingMines;
    }
    if (i === BOARD_SIZE - 1) { // bottom row
        if (board[i - 1][j].hasMine) {
            numSurroundingMines++;
        }
        if (board[i - 1][j - 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i - 1][j + 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i][j - 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i][j + 1].hasMine) {
            numSurroundingMines++;
        }
        return numSurroundingMines;
    }
    if (i === 0) { // top row
        if (board[i][j + 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i][j - 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i + 1][j - 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i + 1][j + 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i + 1][j].hasMine) {
            numSurroundingMines++;
        }
        return numSurroundingMines;
    }
    else { // rest of board
        if (board[i][j + 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i][j - 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i + 1][j].hasMine) {
            numSurroundingMines++;
        }
        if (board[i - 1][j].hasMine) {
            numSurroundingMines++;
        }
        if (board[i + 1][j + 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i + 1][j - 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i - 1][j + 1].hasMine) {
            numSurroundingMines++;
        }
        if (board[i - 1][j - 1].hasMine) {
            numSurroundingMines++;
        }
        return numSurroundingMines;
    }
}


function get2DIndex(buttonIndex, rowLength) {
    let row = Math.floor(buttonIndex / rowLength);
    let indexInRow = buttonIndex % rowLength;
    return [row, indexInRow];
}

export { revealNeighboringTiles, calculateSurroundingMines, get2DIndex };
