import React, {useState, useCallback} from 'react';
import classes from "./InputPlus.module.scss";

interface InputPlusProps {
    onAdd: (title: string) => void
}

export const InputPlus: React.FC<InputPlusProps> = ({onAdd}) => {
    const [inputValue, setInputValue] = useState('')
    const addTask = useCallback(() => {
        onAdd(inputValue)
        setInputValue('')
    }, [inputValue])
    return (
        <div className={classes.inputPlus}>
            <input
                className={classes.inputPlusField}
                type='text'
                placeholder='Type here...'
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value)
                }}
                onKeyDown={(e)=>{
                    if(e.key === 'Enter') {
                        addTask()
                    }
                }}
            />
            <button
                onClick={addTask}
                aria-label={'Add Task'}
                className={classes.inputPlusButton}
            />
        </div>
    );
};


