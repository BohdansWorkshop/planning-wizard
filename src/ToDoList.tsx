import { useRef, useState } from "react";
import { TaskPriority, useTaskStore } from "./useTaskStore";
import { TaskItem } from "./TaskItem";

export function ToDoList() {
    const { journals, activeJournalId, filter, sort, addTask, completeTask, removeTask, editTask, setFilter, setSort } = useTaskStore();
    const [input, setInput] = useState("");
    const [selectedPriority, setPriority] = useState<TaskPriority>(TaskPriority.LOW);
    const activeJournal = journals.find(journal => journal.id === activeJournalId);

    const filteredTasks = activeJournal?.tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "incomplete") return !task.completed;
        return true;
    }) ?? [];

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sort === "alphabetical") return a.description.localeCompare(b.description);
        if (sort === "status") return Number(a.completed) - Number(b.completed);
        if (sort === "priority") return Number(a.priority) - Number(b.priority);
        return 0;
    })

    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(() => activeJournal?.name);
    const { editJournalName } = useTaskStore();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleNameClick = () => {
        setIsEditing(true);
    };

    const handleEditBlur = () => {
        if (!activeJournal || !editedName) return;
        if (editedName.trim()) {
            editJournalName(activeJournal.id, editedName);
        } else {
            setEditedName(activeJournal.name);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleAddTask();
        }
    };

    const handleAddTask = () => {
        addTask(input, selectedPriority); // Додаємо пріоритет при створенні задачі
        setInput("");
    };

    return (
        <div>
            {activeJournal ? (
                <div>
                    <div>
                        <label>Filter:</label>
                        <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
                            <option value="all">All</option>
                            <option value="completed">Completed</option>
                            <option value="incomplete">Incompleted</option>
                        </select>

                        <label>Sort:</label>
                        <select value={sort} onChange={(e) => setSort(e.target.value as any)}>
                            <option value="default">Default</option>
                            <option value="alphabetical">A-Z</option>
                            <option value="status">Status</option>
                            <option value="priority">Priority</option>
                        </select>
                    </div>
                    {isEditing ? (
                        <div>
                            <input
                                ref={inputRef}
                                type="text"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                                onBlur={handleEditBlur}
                            />
                            <button onClick={() => handleEditBlur()}> ✓ </button>
                        </div>
                    ) : (
                        <h2 onClick={handleNameClick}>
                            <span>{activeJournal.name}</span>
                        </h2>
                    )}
                    <div>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown} 
                        />

                        <select value={selectedPriority} onChange={(e) => setPriority(e.target.value as any)}>
                            <option value={TaskPriority.LOW}>Low</option>
                            <option value={TaskPriority.MEDIUM}>Medium</option>
                            <option value={TaskPriority.HIGH}>High</option>
                        </select>
                        <button onClick={handleAddTask}>Add Task</button>
                    </div>
                    <ul>
                        {sortedTasks.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                completeTask={completeTask}
                                removeTask={removeTask}
                                editTask={editTask}
                            />
                        ))}
                    </ul>
                </div>

            ) : (
                <p>Select a journal to manage tasks.</p>
            )}
        </div>
    );
}
