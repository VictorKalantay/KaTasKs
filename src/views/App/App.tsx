import React from 'react';
import {useTasksStore} from "../../data/stores/useTasksStore";
import classes from './App.module.scss';
import {InputPlus} from "../components/UI/InputPlus";
import {InputTask} from "../components/UI/InputTask";


export const App:React.FC = () => {
   const [
       tasks,
       createTask,
       updateTask,
       removeTask,
       updateTimer
   ] = useTasksStore(state => [
       state.tasks,
       state.createTask,
       state.updateTask,
       state.removeTask,
       state.updateTimer,

   ])

    return (
        <article className={classes.article}>
            <h1 className={classes.articleTitle}>KaTasKs</h1>
            <section className={classes.articleSection}>
                <InputPlus
                onAdd={(title)=> {
                    if(title) {
                      createTask(title)
                    }
                }}/>
            </section>
            <section className={classes.articleSection}>
                {!tasks.length && (<p className={classes.articleText}>You don't have tasks</p>)}
                {
                    tasks.map((task) => (

                    <InputTask

                        key={task.id}
                        id={task.id}
                        title={task.title}
                        timer={task.timer}
                        onDone={removeTask}
                        onEdited={updateTask}
                        onRemoved={removeTask}
                        updateTimer={updateTimer}
                    />
                ))}
            </section>
        </article>
    );
}


