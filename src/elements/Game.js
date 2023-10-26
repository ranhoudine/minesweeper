import Board from './Board';
import Stopwatch from './Stopwatch';
import AddHighscore from './pages/AddHighscore'
import './styles/Game.css'
import { useEffect, useState } from 'react';
import { revealNeighboringTiles, get2DIndex, calculateSurroundingMines, get1DIndex, calculateSurroundingFlags } from '../utils/ArrayFunctions';
import { useNavigate } from 'react-router-dom';

let totalTilesRevealed = 0

export default function Game({ boardSize, numberOfMines }) {

    // state related constants
    const [force, setForce] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [didPlayerWin, setDidPlayerWin] = useState(false);
    const [gameArray, setGameArray] = useState(initializeBoard(boardSize, numberOfMines, boardSize));
    const [numOfRevealedTiles, setNumOfRevealedTiles] = useState(0);
    const [endGameMessage, setEndGameMessage] = useState('');
    const [time, setTime] = useState(0);


    const navigate = useNavigate();

    // game related constants
    const numberOfNonMineTiles = boardSize ** 2 - numberOfMines;
    const playerWonMessage = 'You won! 🤩';
    const playerLostMessage = 'You lost! 😵';


    const handleStopTime = (time) => {
        setTime(time);
    }

    useEffect(() => {
        if (isGameOver) {
            doGameOver()
        }
        if (numOfRevealedTiles === numberOfNonMineTiles) {
            setDidPlayerWin(true);
            setIsGameOver(true);
        }
    }, [isGameOver, numOfRevealedTiles, force])

    const rightClickHandler = (buttonIndex) => {
        let [i, j] = get2DIndex(buttonIndex, boardSize)
        if (!gameArray[i][j].isRevealed) {
            gameArray[i][j].isFlagged = !gameArray[i][j].isFlagged
            const nextGameArray = gameArray.map(x => x) // copying gameArray in order to trigger a new render
            setGameArray(nextGameArray)
        }
    }
    const leftClickHandler = (buttonIndex) => {
        let [i, j] = get2DIndex(buttonIndex, boardSize);
        if (isGameOver) {
            return
        }
        else {
            revealTile(gameArray, i, j)
        }
    }

    const bothButtonsHandler = (buttonIndex) => {
        let [row, col] = get2DIndex(buttonIndex, boardSize)
        const numSurroundingFlags = calculateSurroundingFlags(gameArray, buttonIndex)
        if (numSurroundingFlags === gameArray[row][col].numSurroundingMines) {
            revealSurroundingTiles(gameArray, row, col)
        }
    }
    const doGameOver = () => {
        if (didPlayerWin) {
            setEndGameMessage(playerWonMessage);
        }
        else {
            setEndGameMessage(playerLostMessage);
        }
    }


    return (
        <div className="Game" >
            <Board size={boardSize}
                numOfMines={numberOfMines}
                leftClickHandler={leftClickHandler}
                gameArray={gameArray}
                isGameOver={isGameOver}
                rightClickHandler={rightClickHandler}
                bothButtonsHandler={bothButtonsHandler}>
            </Board>
            <Stopwatch isActive={!isGameOver} handleStopTime={handleStopTime}></Stopwatch>
            <p>{endGameMessage}</p>
            {isGameOver && didPlayerWin
                ?
                <div className='SaveScore' onClick={() => navigate('/add-highscore', {
                    replace: true,
                    state: { time }
                })}>Save Score</div>
                :
                ''
            }
        </div>
    )

    function revealTile(gameArray, row, col) {
        if (gameArray[row][col].hasMine) {
            gameArray[row][col].isRevealed = true
            setIsGameOver(true)
            return
        }
        const [nextGameArray, totalRevealedTiles] = revealNeighboringTiles(gameArray, row, col)
        setNumOfRevealedTiles(totalRevealedTiles)
        
    }

    function revealSurroundingTiles(gameArray, row, col) {
        const shouldRevealTile = (row, col) => {
            return !gameArray[row][col].isRevealed && !gameArray[row][col].isFlagged
        }

        if (row > 0 && col > 0 && shouldRevealTile(row - 1, col - 1)) {
            revealTile(gameArray, row - 1, col - 1)
        }
        if (row > 0 && shouldRevealTile(row - 1, col)) {
            revealTile(gameArray, row - 1, col)
        }
        if (row > 0 && col < boardSize - 1 && shouldRevealTile(row - 1, col + 1)) {
            revealTile(gameArray, row - 1, col + 1)
        }
        if (row < boardSize - 1 && col > 0 && shouldRevealTile(row + 1, col - 1)) {
            revealTile(gameArray, row + 1, col - 1)
        }
        if (row < boardSize - 1 && shouldRevealTile(row + 1, col)) {
            revealTile(gameArray, row + 1, col)
        }
        if (row < boardSize - 1 && col < boardSize - 1 && shouldRevealTile(row + 1, col + 1)) {
            revealTile(gameArray, row + 1, col + 1)
        }
        if (col > 0 && shouldRevealTile(row, col - 1)) {
            revealTile(gameArray, row, col - 1)
        }
        if (col < boardSize - 1 && shouldRevealTile(row, col + 1)) {
            revealTile(gameArray, row, col + 1)
        }
    }
}


function initializeBoard(size, numOfMines, boardSize) {
    let board = Array(size);
    const selectedButtons = getRandomIndices(size, numOfMines);  // these are the buttons that'll have mines
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row[j] = { isRevealed: false, hasMine: false, index: get1DIndex(i, j, boardSize), isFlagged: false };
        }
        board[i] = row;
    }
    for (let i = 0; i < selectedButtons.length; i++) {
        const [k, j] = get2DIndex(selectedButtons[i], size);
        board[k][j].hasMine = true;
    }

    setSurroundingMines(board, boardSize);

    return board;
}

function getRandomIndices(size, numOfMines) {
    let range = Array(size * size).fill(0);
    for (let i = 0; i < size * size; i++) {
        range[i] = i;
    }
    let j = 0;
    let randomRange = []
    for (let i = 0; i < numOfMines; i++) {
        j = Math.floor(Math.random() * (range.length));
        randomRange.push(range[j]);
        range.splice(j, 1);  // deletes the jth entry of the array
    }
    return randomRange;
}

function setSurroundingMines(board, boardSize) {
    for (let t = 0; t < boardSize ** 2; t++) {
        let [i, j] = get2DIndex(t, boardSize)
        board[i][j].numSurroundingMines = calculateSurroundingMines(board, t)
    }
}


function doGameOver() { }
export { Game }