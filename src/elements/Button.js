import './styles/Button.css';
import { useEffect, useState } from 'react';
import { get2DIndex } from '../utils/ArrayFunctions';
import { calculateSurroundingMines } from '../utils/ArrayFunctions'
import { BOARD_SIZE } from '../App';

const bothButtons = 3
export default function Button({ hasMine, buttonIndex, leftClickHandler, gameArray, isRevealed, isGameOver, isFlagged, rightClickHandler, bothButtonsHandler }) {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const numSurroundingMines = getSurroundingMines(gameArray, buttonIndex);
    const leftClick = () => {
        if (!isFlagged && !isRevealed) { // a button cannot be clicked if its flagged or revealed already
            leftClickHandler(buttonIndex);
        }
    }
    const rightClick = (event) => {
        event.preventDefault()
        rightClickHandler(buttonIndex)
    }

    const mouseDown = (mouseEvent) => {
        if (bothButtonsAreDown(mouseEvent) && isRevealed) {
            bothButtonsHandler(buttonIndex)
        }
    }
    const getBackgroundColor = () => {
        if (isFlagged) {
            return { 'backgroundColor': 'lightblue' };
        }
        if (isRevealed && hasMine) {  // todo change that
            return { 'backgroundColor': 'lightsalmon' };
        }
        if (isRevealed) {
            return { 'backgroundColor': 'white' };
        }
        if (isMouseOver && !isGameOver) {
            return { 'backgroundColor': 'darkgray' };
        }
        return { 'backgroundColor': 'lightgray' };
    }
    return <div
        className="Button"
        onClick={leftClick}
        onMouseEnter={() => { setIsMouseOver(true) }}
        onMouseLeave={() => { setIsMouseOver(false) }}
        onContextMenu={rightClick}
        onMouseDown={mouseDown}
        style={getBackgroundColor()}>
        {(isRevealed && numSurroundingMines > 0 && !hasMine && !isFlagged) ? numSurroundingMines : ''}
    </div>;
}

function getSurroundingMines(board, buttonIndex) {
    let [i, j] = get2DIndex(buttonIndex, BOARD_SIZE);
    return board[i][j].numSurroundingMines;
}

function bothButtonsAreDown(mouseEvent) {
    return mouseEvent.buttons === 3
}