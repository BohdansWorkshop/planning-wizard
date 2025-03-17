import { create } from "zustand";

export interface Task {
    id: number;
    description: string;
    completed: boolean;
}

interface TaskStore {
    tasks: Task[];
    addTask: (description: string) => void;
    completeTask: (id: number) => void;
    removeTask: (id: number) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    addTask: (description: string) => {
        if (!description.trim()) return;
        set((state) => ({
            tasks: [...state.tasks, { id: Date.now(), description, completed: false }]
        }));
    },
    completeTask: (id: number) => {
        set((state) => ({
            tasks: state.tasks.map((task) => task.id === id ? {...task, completed: true} : task)
        }));
    },
    removeTask: (id: number) => {
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id)
        }));
    }

}));