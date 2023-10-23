const Queue = require('./Queue')

const BOARD_SIZE = 10

class arrayCell {
    constructor(row, col){
        this.row = row
        this.col = col
    }
}
function revealNeighboringMines(board, i, j) {
    const q = new Queue()
    q.enqueue(new arrayCell(i, j))

    while (!q.isEmpty()) {
        let currentNode = q.dequeue()
        let row = currentNode.row
        let col = currentNode.col
        board[row][col].isRevealed = true
        if (row > 0 ) {
            if (col > 0 && !board[row-1][col-1].hasMine && !board[row-1][col-1].isRevealed){
                q.enqueue(new arrayCell(row-1, col-1))
            }
            if (!board[row-1][col].hasMine && !board[row-1][col].isRevealed) {
                q.enqueue(new arrayCell(row-1, col))
            }
            if (col < BOARD_SIZE -1 && !board[row-1][col+1] && !board[row-1][col+1].isRevealed) {
                q.enqueue(new arrayCell(row-1, col+1))
            }
        }
        if (row < BOARD_SIZE - 1) {
            if (col > 0 && !board[row+1][col-1].hasMine && !board[row+1][col-1].isRevealed){
                q.enqueue(new arrayCell(row+1, col-1))
            }
            if (!board[row+1][col].hasMine && !board[row+1][col].isRevealed) {
                q.enqueue(new arrayCell(row+1, col))
            }
            if (col < BOARD_SIZE -1 && !board[row+1][col+1].hasMine && !board[row+1][col+1].isRevealed) {
                q.enqueue(new arrayCell(row+1, col+1))
            }
        }
        if (col > 0 && !board[row][col-1].hasMine && !board[row][col-1].isRevealed){
            q.enqueue(new arrayCell(row, col-1))
        }
        if (col < BOARD_SIZE - 1 && !board[row][col+1].hasMine && !board[row][col+1].isRevealed) {
            q.enqueue(new arrayCell(row, col+1))
        }
    }
    return board
}

const board = [
    [
      { isRevealed: false, hasMine: false, index: 0 },
      { isRevealed: false, hasMine: false, index: 1 },
      { isRevealed: false, hasMine: false, index: 2 },
      { isRevealed: false, hasMine: false, index: 3 },
      { isRevealed: false, hasMine: false, index: 4 },
      { isRevealed: false, hasMine: false, index: 5 },
      { isRevealed: false, hasMine: false, index: 6 },
      { isRevealed: false, hasMine: false, index: 7 },
      { isRevealed: false, hasMine: false, index: 8 },
      { isRevealed: false, hasMine: false, index: 9 }
    ],
    [
      { isRevealed: false, hasMine: false, index: 10 },
      { isRevealed: false, hasMine: false, index: 11 },
      { isRevealed: false, hasMine: false, index: 12 },
      { isRevealed: false, hasMine: false, index: 13 },
      { isRevealed: false, hasMine: false, index: 14 },
      { isRevealed: false, hasMine: false, index: 15 },
      { isRevealed: false, hasMine: false, index: 16 },
      { isRevealed: false, hasMine: false, index: 17 },
      { isRevealed: false, hasMine: false, index: 18 },
      { isRevealed: false, hasMine: false, index: 19 }
    ],
    [
      { isRevealed: false, hasMine: false, index: 20 },
      { isRevealed: false, hasMine: false, index: 21 },
      { isRevealed: false, hasMine: false, index: 22 },
      { isRevealed: false, hasMine: false, index: 23 },
      { isRevealed: false, hasMine: false, index: 24 },
      { isRevealed: false, hasMine: false, index: 25 },
      { isRevealed: false, hasMine: false, index: 26 },
      { isRevealed: false, hasMine: false, index: 27 },
      { isRevealed: false, hasMine: false, index: 28 },
      { isRevealed: false, hasMine: false, index: 29 }
    ],
    [
      { isRevealed: false, hasMine: false, index: 30 },
      { isRevealed: false, hasMine: false, index: 31 },
      { isRevealed: false, hasMine: false, index: 32 },
      { isRevealed: false, hasMine: false, index: 33 },
      { isRevealed: false, hasMine: false, index: 34 },
      { isRevealed: false, hasMine: false, index: 35 },
      { isRevealed: false, hasMine: false, index: 36 },
      { isRevealed: false, hasMine: false, index: 37 },
      { isRevealed: false, hasMine: false, index: 38 },
      { isRevealed: false, hasMine: false, index: 39 }
    ],
    [
      { isRevealed: false, hasMine: false, index: 40 },
      { isRevealed: false, hasMine: false, index: 41 },
      { isRevealed: false, hasMine: false, index: 42 },
      { isRevealed: false, hasMine: false, index: 43 },
      { isRevealed: false, hasMine: false, index: 44 },
      { isRevealed: false, hasMine: true, index: 45 },
      { isRevealed: false, hasMine: false, index: 46 },
      { isRevealed: false, hasMine: false, index: 47 },
      { isRevealed: false, hasMine: false, index: 48 },
      { isRevealed: false, hasMine: false, index: 49 }
    ],
    [
      { isRevealed: false, hasMine: false, index: 50 },
      { isRevealed: false, hasMine: true, index: 51 },
      { isRevealed: false, hasMine: false, index: 52 },
      { isRevealed: false, hasMine: false, index: 53 },
      { isRevealed: false, hasMine: false, index: 54 },
      { isRevealed: false, hasMine: false, index: 55 },
      { isRevealed: false, hasMine: false, index: 56 },
      { isRevealed: false, hasMine: false, index: 57 },
      { isRevealed: false, hasMine: false, index: 58 },
      { isRevealed: false, hasMine: false, index: 59 }
    ],
    [
      { isRevealed: false, hasMine: false, index: 60 },
      { isRevealed: false, hasMine: true, index: 61 },
      { isRevealed: false, hasMine: true, index: 62 },
      { isRevealed: false, hasMine: false, index: 63 },
      { isRevealed: false, hasMine: false, index: 64 },
      { isRevealed: false, hasMine: false, index: 65 },
      { isRevealed: false, hasMine: false, index: 66 },
      { isRevealed: false, hasMine: false, index: 67 },
      { isRevealed: false, hasMine: false, index: 68 },
      { isRevealed: false, hasMine: false, index: 69 }
    ],
    [
      { isRevealed: false, hasMine: false, index: 70 },
      { isRevealed: false, hasMine: false, index: 71 },
      { isRevealed: false, hasMine: false, index: 72 },
      { isRevealed: false, hasMine: false, index: 73 },
      { isRevealed: false, hasMine: false, index: 74 },
      { isRevealed: false, hasMine: false, index: 75 },
      { isRevealed: false, hasMine: false, index: 76 },
      { isRevealed: false, hasMine: false, index: 77 },
      { isRevealed: false, hasMine: false, index: 78 },
      { isRevealed: false, hasMine: false, index: 79 }
    ],
    [
      { isRevealed: false, hasMine: false, index: 80 },
      { isRevealed: false, hasMine: false, index: 81 },
      { isRevealed: false, hasMine: false, index: 82 },
      { isRevealed: false, hasMine: false, index: 83 },
      { isRevealed: false, hasMine: false, index: 84 },
      { isRevealed: false, hasMine: false, index: 85 },
      { isRevealed: false, hasMine: false, index: 86 },
      { isRevealed: false, hasMine: false, index: 87 },
      { isRevealed: false, hasMine: false, index: 88 },
      { isRevealed: false, hasMine: false, index: 89 }
    ],
    [
      { isRevealed: false, hasMine: false, index: 90 },
      { isRevealed: false, hasMine: false, index: 91 },
      { isRevealed: false, hasMine: false, index: 92 },
      { isRevealed: false, hasMine: false, index: 93 },
      { isRevealed: false, hasMine: false, index: 94 },
      { isRevealed: false, hasMine: true, index: 95 },
      { isRevealed: false, hasMine: false, index: 96 },
      { isRevealed: false, hasMine: false, index: 97 },
      { isRevealed: false, hasMine: false, index: 98 },
      { isRevealed: false, hasMine: false, index: 99 }
    ]
  ]

const printBoard = (board) => {
    for (let i = 0; i < BOARD_SIZE; i++) {
        let row = ''
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j].isRevealed) {
                row += '  '
            }
            else {
                row += '0 '
            }
        }
        console.log(row)
    }
}

printBoard(board)

revealNeighboringMines(board, 8, 5)

console.log('......running script.......')

printBoard(board)
