import { useRef, useState } from "react";
import { useTaskStore } from "./useTaskStore";
import { TaskItem } from "./TaskItem";

export function ToDoList() {
    const { journals, activeJournalId, addTask, completeTask, removeTask } = useTaskStore();
    const [input, setInput] = useState("");
    const activeJournal = journals.find(journal => journal.id === activeJournalId);

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

    return (
        <div>
            {activeJournal ? (
                <div>
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
                        />
                        <button onClick={() => { addTask(input); setInput(""); }}>Add Task</button>
                    </div>
                    <ul>
                        {activeJournal.tasks.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                completeTask={completeTask}
                                removeTask={removeTask}
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
