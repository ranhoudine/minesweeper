const floorDivision = (a, b) => Math.floor(a / b)


const getTimeString = (time) => {
    const seconds = (floorDivision(time, 100)) % 60
    const minutes = (floorDivision(time, 100 * 60)) % 60
    const centiseconds = time % 100

    return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0') + ':' + centiseconds.toString().padStart(2, '0')
}

export {getTimeString};