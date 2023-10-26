import Game from './elements/Game';
import Header from './elements/Header'
import Footer from './elements/Footer'
import Home from './elements/pages/Home'
import Highscores from './elements/pages/HighScores'
import AddHighscorePage from './elements/pages/AddHighscore';
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const BOARD_SIZE = 20;
const NUMBER_OF_MINES = 40;
export default function App() {


    return ( 
        <> <Header title="Minesweeper"></Header>
        <div className="MainContent">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home boardSize={BOARD_SIZE} numberOfMines={NUMBER_OF_MINES}/>}></Route>
                <Route path="/minesweeper" element={<Game boardSize={BOARD_SIZE} numberOfMines={NUMBER_OF_MINES}/>}></Route>
                <Route path="/highscores" element={<Highscores/>}></Route>
                <Route path="/add-highscore" element={<AddHighscorePage/>}></Route>
            </Routes>
        </BrowserRouter>
        </div>
        <Footer name="Ran Houdine"></Footer>
        </>);
}

export {BOARD_SIZE, NUMBER_OF_MINES, App}