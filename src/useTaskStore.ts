import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';

export enum TaskPriority {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High"
}

export interface Task {
    id: string;
    description: string;
    priority: TaskPriority;
    completed: boolean;
}

export interface Journal {
    id: string;
    name: string;
    tasks: Task[];
}

type Filter = "all" | "completed" | "incomplete";
type Sort = "default" | "alphabetical" | "status" | "priority";

interface TaskStore {
    journals: Journal[];
    activeJournalId: string | null;
    filter: Filter;
    sort: Sort;
    addJournal: (name: string) => void;
    editJournalName: (id: string, name: string) => void;
    removeJournal: (id: string) => void;
    setActiveJournal: (id: string) => void;
    addTask: (description: string, priority: TaskPriority) => void;
    completeTask: (id: string) => void;
    removeTask: (id: string) => void;
    editTask: (id: string, description: string) => void;
    setFilter: (filter: Filter) => void;
    setSort: (sort: Sort) => void;
}

// TODO: create separate store for tasks and journals;
// use zustand-persist to save state to local storage
export const useTaskStore = create<TaskStore>((set) => ({
    journals: [],
    activeJournalId: null,
    filter: "all",
    sort: "default",

    addJournal: (name: string) => {
        if (!name.trim()) return;
        set((state) => ({
            journals: [...state.journals, { id: uuidv4(), name, tasks: [] }]
        }));
    },
    editJournalName: (id: string, name: string) => {
        if (!name.trim()) return;
        set((state) => ({
            journals: state.journals.map((journal) => journal.id === id ? { ...journal, name } : journal)
        }))
    },
    removeJournal: (id: string) => {
        set((state) => ({
            journals: state.journals.filter((journal) => journal.id !== id),
            activeJournalId: state.activeJournalId === id ? null : state.activeJournalId
        }));
    },
    setActiveJournal: (id: string) => {
        set({ activeJournalId: id });
    },
    addTask: (description: string, priority: TaskPriority) => {
        if (!description.trim()) return;
        set((state) => ({
            journals: state.journals.map((journal) =>
                journal.id === state.activeJournalId
                    ? { ...journal, tasks: [...journal.tasks, { id: uuidv4(), description, priority: priority, completed: false }] }
                    : journal
            )
        }));
    },
    completeTask: (id: string) => {
        set((state) => ({
            journals: state.journals.map((journal) =>
                journal.id === state.activeJournalId
                    ? { ...journal, tasks: journal.tasks.map((task) => task.id === id ? { ...task, completed: true } : task) }
                    : journal)
        }));
    },

    removeTask: (id: string) => {
        set((state) => ({
            journals: state.journals.map((journal) =>
                journal.id === state.activeJournalId
                    ? { ...journal, tasks: journal.tasks.filter((task) => task.id !== id) }
                    : journal)
        }));
    },

    editTask: (id: string, description: string) => {
        if (!description.trim())
            return;

        set((state) => ({
            journals: state.journals.map((journal) =>
                journal.id === state.activeJournalId
                    ? { ...journal, tasks: journal.tasks.map((task) => task.id === id ? { ...task, description } : task) }
                    : journal
            )
        }));
    },

    setFilter: (filter: Filter) => set({ filter }),
    setSort: (sort: Sort) => set({ sort })

}));
