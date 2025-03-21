import { create } from "zustand";

export interface Task {
    id: number;
    description: string;
    completed: boolean;
}

export interface Journal {
    id: number;
    name: string;
    tasks: Task[];
}

interface TaskStore {
    journals: Journal[];
    activeJournalId: number | null;
    addJournal: (name: string) => void;
    editJournalName: (id: number, name: string) => void;
    removeJournal: (id: number) => void;
    setActiveJournal: (id: number) => void;
    addTask: (description: string) => void;
    completeTask: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, description: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    journals: [],
    activeJournalId: null,

    addJournal: (name: string) => {
        if (!name.trim()) return;
        set((state) => ({
            journals: [...state.journals, { id: Date.now(), name, tasks: [] }]
        }));
    },
    editJournalName: (id: number, name: string) => {
        if (!name.trim()) return;
        set((state) => ({
            journals: state.journals.map((journal) => journal.id === id ? { ...journal, name } : journal)
        }))
    },
    removeJournal: (id: number) => {
        set((state) => ({
            journals: state.journals.filter((journal) => journal.id !== id),
            activeJournalId: state.activeJournalId === id ? null : state.activeJournalId
        }));
    },
    setActiveJournal: (id: number) => {
        set({ activeJournalId: id });
    },
    addTask: (description: string) => {
        if (!description.trim()) return;
        set((state) => ({
            journals: state.journals.map((journal) =>
                journal.id === state.activeJournalId
                    ? { ...journal, tasks: [...journal.tasks, { id: Date.now(), description, completed: false }] }
                    : journal
            )
        }));
    },
    completeTask: (id: number) => {
        set((state) => ({
            journals: state.journals.map((journal) =>
                journal.id === state.activeJournalId
                    ? { ...journal, tasks: journal.tasks.map((task) => task.id === id ? { ...task, completed: true } : task) }
                    : journal)
        }));
    },

    removeTask: (id: number) => {
        set((state) => ({
            journals: state.journals.map((journal) =>
                journal.id === state.activeJournalId
                    ? { ...journal, tasks: journal.tasks.filter((task) => task.id !== id) }
                    : journal)
        }));
    },

    editTask: (id: number, description: string) => {
        if (!description.trim())
            return;

        set((state) => ({
            journals: state.journals.map((journal) =>
                journal.id === state.activeJournalId
                    ? { ...journal, tasks: journal.tasks.map((task) => task.id === id ? { ...task, description } : task) }
                    : journal
            )
        }));
    }
}));