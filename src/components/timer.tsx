'use client'
import React from 'react';
import {CountdownCircleTimer} from 'react-countdown-circle-timer'

interface TimerProps {
    time: 300;
    onComplete: () => void;
}
const Timer: React.FC<TimerProps> = ({time, onComplete}) =>{
    const gradientColors: [string, number?][]=[['tomato', 0], ['orange', 1], ['gold']]
    const gradientColor = (['#004777', '#F78801', '#A30000', '#A30000'])
    return(
        <CountdownCircleTimer isPlaying duration ={time} onComplete = {onComplete} colors = {['#004777', '#F78801', '#A30000', '#A30000']} colorsTime={[7, 5, 2, 0]}>
            {({remainingTime})=>(
                <div className = "timer">
                    <div>{remainingTime}</div>
                </div>
            )}
        </CountdownCircleTimer>
    )
}

export default Timer