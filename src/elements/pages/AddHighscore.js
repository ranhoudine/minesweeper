import './styles/AddHighscore.css';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
export default function AddHighscorePage() {
    const [errorMessage, setErrorMessage] = useState('');
    const baseURL = 'http://localhost:3001';
    const navigate = useNavigate();
    const { state } = useLocation();
    const time = state.time;
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = document.querySelector('input').value;
        axios.post(baseURL + '/add-highscore', null, {params: { name, time }})
            .then((response) => {
                navigate('/highscores');
            }
            ).catch((error) => {
                setErrorMessage(error);
            });
    }
    return (
        <div className='AddHighscore'>
            <form className='NameForm' onSubmit={handleSubmit}>
                <p> Enter your name to save your score! </p>
                <input name='name' placeholder='Enter your name'></input>
                <button type='submit' >Submit</button>
            </form>
            <p>{errorMessage}</p>
        </div>
    )
}