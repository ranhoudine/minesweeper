import Board from './Board';
import Stopwatch from './Stopwatch';
import AddHighscore from './pages/AddHighscore'
import './styles/Game.css'
import { useEffect, useState } from 'react';
import { revealNeighboringTiles, get2DIndex, calculateSurroundingMines } from '../utils/ArrayFunctions';
import { useNavigate } from 'react-router-dom';



export default function Game({ boardSize, numberOfMines }) {

    // state related constants
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
        if (isGameOver && !didPlayerWin) {
            navigate('/highscores');
        }
    }, [])

    useEffect(() => {
        if (isGameOver) {
            doGameOver()
        }
        if (numOfRevealedTiles === numberOfNonMineTiles) {
            setDidPlayerWin(true);
            setIsGameOver(true);
        }
    }, [numOfRevealedTiles, isGameOver])

    const leftClickHandler = (buttonIndex) => {
        let [i, j] = get2DIndex(buttonIndex, boardSize);
        if (isGameOver || gameArray[i][j].isRevealed) {
            return
        }
        if (gameArray[i][j].hasMine) {
            gameArray[i][j].isRevealed = true;
            setIsGameOver(true);
        }
        else {
            const [nextGameArray, numberOfNewlyRevealedTiles] = revealNeighboringTiles(gameArray, i, j);
            setGameArray(nextGameArray)
            setNumOfRevealedTiles(numOfRevealedTiles + numberOfNewlyRevealedTiles);
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
                isGameOver={isGameOver}>
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
    );
}


function initializeBoard(size, numOfMines, boardSize) {
    let board = Array(size);
    const selectedButtons = getRandomIndices(size, numOfMines);  // these are the buttons that'll have mines
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row[j] = { isRevealed: false, hasMine: false, index: i * size + j };
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
        board[i][j].surroundingMines = calculateSurroundingMines(board, t)
    }
}
function doGameOver() { }
export { Game }