import create from "zustand";
import {generateId} from '../helpers'

interface Task {
    id: string;
    title: string;
    createdAt: number;
    //deletedAt?:number
}

interface TasksStore {
    tasks: Task[]
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string, deletedAt: number) => void;
}


export const useTasksStore = create<TasksStore>((set, get) => ({
    tasks: [
        {
            id: 'asdjadadfskldas',
            title: 'Тестовая таска' ,
            createdAt: 2232323
        }
    ],
    createTask: (title) => {
        const {tasks} = get()
        const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now(),
        }
        set({
            tasks: [newTask].concat(tasks),
        })

    },
    updateTask: (id: string, title: string) => {
        const {tasks} = get()
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title,
            }))
        })

    },
    removeTask: (id) => {
        const {tasks} = get()
        set({
            tasks: tasks.filter((task) => task.id !== id)
        })
    }
}))

export {}