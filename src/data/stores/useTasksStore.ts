import create from "zustand";
import {generateId} from '../helpers'
import {devtools} from "zustand/middleware";

interface Task {
    id: string;
    title: string;
    timer: number;
    createdAt: number;
    deletedAt?:number;

}

interface TasksStore {
    tasks: Task[]
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string, deletedAt: number) => void;
    updateTimer: (id: string, timer: number) => void;
}




const currentTasks = (JSON.parse(window.localStorage.getItem('tasks') || '[]'))

export const useTasksStore = create<TasksStore>()(devtools ((set, get) => ({
    tasks: currentTasks,
    createTask: (title) => {
        const {tasks} = get()
        const newTask = {
            id: generateId(),
            title,
            timer: 0,
            createdAt: Date.now(),
        }
        set({
            tasks: [newTask].concat(tasks),

        })
        window.localStorage.setItem('tasks', JSON.stringify([newTask].concat(tasks)))
    },
    updateTask: (id: string, title: string) => {
        const {tasks} = get()
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title,
            }))
        })
        window.localStorage.setItem('tasks', JSON.stringify(tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title,
            }))
        ))
    },
    removeTask: (id) => {
        const {tasks} = get()
        set({
            tasks: tasks.filter((task) => task.id !== id)
        })
        window.localStorage.setItem('tasks', JSON.stringify( tasks.filter((task) => task.id !== id)
         ))
    },
    updateTimer: (id:string, timer: number) => {
        const {tasks} = get()
        set({
            tasks: tasks.map((task) => ({
                ...task,
                timer: task.id === id ? timer : task.timer,
            }))
        })
        console.log('qwe')
        window.localStorage.setItem('tasks', JSON.stringify(tasks.map((task) => ({
                ...task,
                timer: task.id === id ? timer : task.timer,
            }))
        ))
    },


})))

