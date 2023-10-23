import { useState } from 'react'
import './styles/Home.css'
export default function Home({ boardSize, numberOfMines }) {
    const [isMouseOverPlayButton, setIsMouseOverPlayButton] = useState(false)
    const getPlayButtonBackgroundColor = () => {
        if (isMouseOverPlayButton) {
            return { 'backgroundColor': 'lightgray' };
        } else {
            return { 'backgroundColor': 'rgb(243, 239, 239)' };
        }
    }
    return (
        <>
            <div className="Home">
                <p> This is a minesweeper game developed in React</p>
                <p> The board is a {boardSize}x{boardSize} grid with {numberOfMines} mines.
                    The tiles are marked as follows:</p>
                <p><button className='Button' style={{ 'backgroundColor': 'lightGray' }}></button> - a regular unrevealed tile</p>
                <p><button className='Button' style={{ 'backgroundColor': 'lightsalmon' }}></button> - a revealed tile with a mine</p>
                <p><button className='Button' style={{ 'backgroundColor': 'lightblue' }}></button> - a flagged tile</p>
                <a className='PlayButton'
                    onMouseEnter={() => { setIsMouseOverPlayButton(true) }}
                    onMouseLeave={() => { setIsMouseOverPlayButton(false) }}
                    style={getPlayButtonBackgroundColor()}
                    href='/minesweeper'>Play</a>
            </div>
        </>
    )
}