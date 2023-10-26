import Button from './Button';
import './styles/Board.css'
export default function Board({ gameArray, leftClickHandler, isGameOver, rightClickHandler, bothButtonsHandler}) {
    const renderButton = (button) => {
        return (
            <Button hasMine={button.hasMine}
                buttonIndex={button.index}
                isRevealed={button.isRevealed}
                leftClickHandler={leftClickHandler}
                rightClickHandler={rightClickHandler}
                bothButtonsHandler={bothButtonsHandler}
                gameArray={gameArray}
                isFlagged={button.isFlagged}
                isGameOver={isGameOver}></Button>
        );
    }
    const renderRow = (row) => {
        return (<div className='Row'>{row.map(button => renderButton(button))}</div>);
    }

    const renderBoard = (gameArray) => {
        return (<>
            {gameArray.map(row => renderRow(row))}
        </>)
    }
    return (<div className="Board">
        {renderBoard(gameArray)}
    </div>);
}

