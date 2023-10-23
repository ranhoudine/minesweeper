import './styles/Footer.css';


function Footer({ name }) {

    return (
        <footer>
            <div className="Links">
                <a href="/minesweeper">Play</a>
                <a href="/">Home</a>
                <a href='/highscores'>Highscores</a>
            </div>
            <p>Created by {name} ©</p>
        </footer>

    )
}

export default Footer;