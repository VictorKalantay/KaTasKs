import React, {useEffect, useRef, useState} from 'react';
import classes from "./InputTask.module.scss";
import Klipartz from '../../../assets/icons/klipartz.png'
import {TaskTimer} from "./TaskTimer";


interface InputTaskProps {
    id: string
    title: string
    timer: number
    onDone: (id: string, deletedAt: number) => void
    onEdited: (id: string, title: string) => void
    onRemoved: (id: string, deletedAt: number) => void
    updateTimer: (id: string, timer: number) => void
}


export const InputTask: React.FC<InputTaskProps> = ({
                                                        id,
                                                        title,
                                                        timer,
                                                        onDone,
                                                        onEdited,
                                                        onRemoved,
                                                        updateTimer

                                                    }) => {

    const [checked, setChecked] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [isTimeMode, setIsTimeMode] = useState(false)
    const [value, setValue] = useState(title)


    const editTitleInputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (isEditMode) {
            editTitleInputRef?.current?.focus()
        }
    }, [isEditMode])


    return (
        <div className={classes.inputTask}>
            <img className={classes.inputTaskImage} src={Klipartz} alt={'qqq'}/>
            <div className={classes.inputTaskLabel}>
                <input
                    className={classes.inputTaskCheckbox}
                    type='checkbox'
                    disabled={isEditMode}
                    checked={checked}
                    onChange={(evt) => {
                        setChecked(evt.target.checked)
                        if (evt.target.checked) {
                            onDone(id, Date.now())
                        }
                    }}
                />
                {isEditMode ?
                    (<input
                        className={classes.inputTaskEditTitle}
                        value={value}
                        ref={editTitleInputRef}
                        onChange={evt => {
                            setValue(evt.target.value)
                        }
                        }
                        onKeyDown={(evt) => {
                            if (evt.key === 'Enter') {
                                onEdited(id, value)
                                setIsEditMode(false)
                            }
                        }
                        }

                    />) :
                    <h3 className={classes.inputTaskTitle}>{title}</h3>
                }
                <button
                    className={classes.inputTaskTime}
                    aria-label='Time...'
                    onClick={() => {
                        setIsTimeMode(!isTimeMode)

                    }}
                />

                {isEditMode ?
                    (<button
                        className={classes.inputTaskSave}
                        aria-label='Save...'
                        onClick={() => {
                            onEdited(id, value)
                            setIsEditMode(false)

                        }}
                    />) :
                    (<button
                        className={classes.inputTaskEdit}
                        aria-label='Edit..'
                        onClick={() => {
                            setIsEditMode(true)

                        }}
                    />)
                }
                <button
                    className={classes.inputTaskRemove}
                    aria-label='Remove..'
                    onClick={() => {

                        if (window.confirm('Are you sure?')) {
                            onRemoved(id, Date.now())
                        }
                    }}
                />


            </div>
            <div className={
                isTimeMode? classes.inputTaskTimeModeOn : classes.inputTaskTimeModeOff
            }>
                <TaskTimer

                id={id}
                timer={timer}
                updateTimer={updateTimer}
            />
            </div>


        </div>
    );
}


