import './styles/Highscores.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { getTimeString, getServiceURL } from '../../utils/utils'


export default function Highscores() {
    const [highscores, setHighscores] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const baseURL = getServiceURL()

    useEffect(() => {
        axios.get(baseURL + '/highscores').then((response) => {
            setHighscores(response.data);
        }).catch((error) => {
            setErrorMessage(error);
        })
    }, [])

    
    const displayHighscores = () => {
        if (highscores) {
            return highscores.map((highscoresEntry) =>
                <tr>
                    <td>{highscoresEntry.name}</td>
                    <td> {getTimeString(highscoresEntry.time)}</td>
                </tr>
            )
        }
    }

    return (
        <div className="Highscores">
            <h1> Highscores</h1>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Time</th>
                </tr>
                {displayHighscores()}
            </table>
        </div>
    )
}