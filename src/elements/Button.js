import './styles/Button.css';
import { useEffect, useState } from 'react';
import { get2DIndex} from '../utils/ArrayFunctions';
import {calculateSurroundingMines} from '../utils/ArrayFunctions'
import { BOARD_SIZE } from '../App';
export default function Button({ hasMine, buttonIndex, leftClickHandler, gameArray, isRevealed, isGameOver}) {
    const [flagged, setFlagged] = useState(false);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const numSurroundingMines = getSurroundingMines(gameArray, buttonIndex);
    const leftClick = () => {
        if (!flagged) { // a button cannot be clicked if its flagged
            leftClickHandler(buttonIndex);
        }
    }
    const rightClick = (event) => {
        event.preventDefault();
        if (!isRevealed && !isGameOver) {
            setFlagged(!flagged);
        }
    }
    const getBackgroundColor = () => {
        if (flagged) {
            return { 'backgroundColor': 'lightblue' };
        }
        if (isRevealed && hasMine) {  // todo change that
            return { 'backgroundColor': 'lightsalmon' };
        }
        if (isRevealed) {
            return { 'backgroundColor': 'white' };
        }
        if (isMouseOver && !isGameOver) {
            return {'backgroundColor':'darkgray'};
        }
        return {'backgroundColor': 'lightgray'};
    }
    return <div
        className="Button"
        onClick={() => leftClick()}
        onMouseEnter={() => { setIsMouseOver(true) }}
        onMouseLeave={() => { setIsMouseOver(false) }}
        onContextMenu={rightClick}
        style={getBackgroundColor()}> 
            {(isRevealed && numSurroundingMines > 0 && !hasMine && !flagged)? numSurroundingMines : ''}
    </div>;
}

function getSurroundingMines(board, buttonIndex) {
    let [i,j] = get2DIndex(buttonIndex, BOARD_SIZE);
    return board[i][j].surroundingMines;
}
