import React, {useEffect, useState} from 'react';
import classes from "./TaskTimer.module.scss";


interface TimerTaskProps {
    id: string,
    timer: number,
    updateTimer: (id: string, timer: number) => void
}

export const TaskTimer: React.FC<TimerTaskProps> = (
    {
        id,
        timer,
        updateTimer
    }
) => {

    const [isRunningTimer, setIsRunningTimer] = useState(false)
    const [ticks, setTicks] = useState(timer)


    const [seconds, setSeconds] = useState(ticks)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0);
    const [message, setMessage] = useState('')
    const [updater, setUpdater] = useState(0)


    useEffect(() => {

        if (!isRunningTimer) {
            return
        }
            let timeStart = setInterval(() => {
                setTicks(ticks => ticks + 1)

            }, 1000)
            let updateLocale = setInterval(() => {
                setUpdater(updater => updater +1)
            }, 10000)



        return () => {
            clearInterval(timeStart)
            clearInterval(updateLocale)
        }

    }, [isRunningTimer])

    useEffect(()=>{
        if (ticks < 60) {
            setSeconds(ticks)
            setMessage(`${seconds} seconds`)
        } else if (ticks < 3600) {
            if(ticks%60==0) {
                setMinutes( Math.floor(ticks / 60))
                setSeconds(0)
                setMessage(`${minutes} min, ${seconds} sec`)

            } else {
                setMinutes( Math.floor(ticks / 60))
                setSeconds(ticks - 60 * minutes)
                setMessage(`${minutes} min, ${seconds} sec`)}
        } else {
            if(ticks%60==0) {
                setHours(Math.floor(ticks / 3600))
                setMinutes(Math.floor((ticks - 3600 * hours) / 60))
                setSeconds(0)
                setMessage(`${hours} h, ${minutes} min and ${seconds} sec`)
            } else {
                setHours(Math.floor(ticks / 3600))
                setMinutes(Math.floor((ticks - 3600 * hours) / 60))
                setSeconds(ticks - 60 * minutes - 3600 * hours)
                setMessage(`${hours} h, ${minutes} min and ${seconds} sec`)
            }
        }
    },[ticks, minutes, seconds, hours])


    useEffect(() => {
        updateTimer(id, ticks)
    },[updater]);


    return (
        <div className={classes.TaskTimer}>
            <div className={classes.TaskTimerMessage}>{message}</div>
            {isRunningTimer?
                (<button
                    className={classes.TaskTimerPause}
                    aria-label='Start'
                    onClick={() => {
                        setIsRunningTimer(!isRunningTimer)
                        updateTimer(id, ticks)
                    }}
                />):
                (<button
                    className={classes.TaskTimerStart}
                    aria-label='Start'
                    onClick={() => {
                        setIsRunningTimer(!isRunningTimer)
                        updateTimer(id, ticks)
                    }}
                />)
                        }


            <button
                className={classes.TaskTimerStop}
                aria-label='Stop'
                onClick={() => {
                    setTicks(0)
                    updateTimer(id, 0)
                }}
            />
        </div>
    )
}


