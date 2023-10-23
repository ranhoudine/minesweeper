import { useEffect, useState } from 'react'
import './styles/Stopwatch.css'


const floorDivision = (a, b) => Math.floor(a / b)
export default function Stopwatch({ isActive, handleStopTime }) {
    const [time, setTime] = useState(0)
    useEffect(() => {
        let interval = null
        if (isActive) {
            interval = setInterval(() => setTime(time + 1), 10)  // this counts centiseconds

        } else {
            handleStopTime(time);
            clearInterval(interval)
        }
        return () => { clearInterval(interval) }
    }, [isActive, time])

    useEffect(() => {
        if (!isActive) {
            handleStopTime(time);
        }
    }, [isActive])

    const seconds = (floorDivision(time, 100)) % 60
    const minutes = (floorDivision(time, 100 * 60)) % 60
    const centiseconds = time % 100

    return (
        <div className="Stopwatch">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}:{centiseconds.toString().padStart(2, '0')}
        </div>
    )
}