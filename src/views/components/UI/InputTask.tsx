import React, {useState} from 'react';
import classes from "./InputTask.module.scss";

interface InputTaskProps {
    id: string
    title: string
    onDone: (id: string) => void
    onEdited: (id: string, title: string) => void
    onRemoved: (id: string, deletedAt: number) => void
}

export const InputTask: React.FC<InputTaskProps> = ({
                                                        id,
                                                        title,
                                                        onDone,
                                                        onEdited,
                                                        onRemoved,
                                                    }) => {

    const [checked, setChecked] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [value, setValue] = useState(title)
    return (
        <div className={classes.inputTask}>
            <label className={classes.inputTaskLabel}>
                <input
                    className={classes.inputTaskCheckbox}
                    type='checkbox'
                    disabled={isEditMode}
                    checked={checked}
                    onChange={(evt) => {
                        setChecked(evt.target.checked)
                        if (evt.target.checked) {
                            onDone(id)
                        }
                    }}
                />
                {isEditMode ?
                    (<input
                        className={classes.inputTaskEditTitle}
                        value={value}
                        onChange={evt => {
                            setValue(evt.target.value)
                        }
                        }

                    />) :
                    <h3 className={classes.inputTaskTitle}>{title}</h3>
                }
            </label>
            { isEditMode ?
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
    );
};


