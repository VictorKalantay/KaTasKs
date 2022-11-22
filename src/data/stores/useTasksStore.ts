import create from "zustand";


interface Task {
    id: string
    title: string
    createdAt:number
    deletedAt?:number
}
interface TasksStore {
    tasks: []
    createTask: (title: string) => void
    updateTask: (id: string, title: string) => void
    removeTask: (id: string, deletedAt: number) => void
}


const useTasksStore = create()

export {}