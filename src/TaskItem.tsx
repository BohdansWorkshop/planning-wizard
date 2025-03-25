import { useEffect, useRef, useState } from "react";
import { Task, TaskPriority } from "./useTaskStore";

interface TaskItemProps {
    task: Task;
    completeTask: (id: string) => void;
    removeTask: (id: string) => void;
    editTask: (id: string, description: string, priority: TaskPriority) => void;
}

export function TaskItem({ task, completeTask, removeTask, editTask }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(task.description);
    const [selectedPriority, setPriority] = useState<TaskPriority>(task.priority);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

    const handleEditSave = () => {
        if (editedDescription.trim()) {
            editTask(task.id, editedDescription, selectedPriority);
        } else {
            setEditedDescription(task.description);
            setPriority(task.priority);
        }
        setIsEditing(false);
    }

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriority(e.target.value as TaskPriority);
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleEditSave();
        }
        else if (e.key === "Escape") {
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditedDescription(task.description);
        setPriority(task.priority);
        setIsEditing(false);
    };

    return (
        <li className={`task-item ${task.completed ? "completed" : ""} ${task.priority.toLowerCase()}`}>
            {
                isEditing
                    ? (
                        <div>
                            <input ref={inputRef} type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} onKeyDown={handleKeyDown} />
                            <select value={selectedPriority} onChange={handlePriorityChange}>
                                <option value={TaskPriority.LOW}>Low</option>
                                <option value={TaskPriority.MEDIUM}>Medium</option>
                                <option value={TaskPriority.HIGH}>High</option>
                            </select>
                            <button onClick={handleEditSave}> Save </button>
                            <button onClick={handleCancel}> Cancel </button>
                        </div>
                    )
                    : (
                        <>
                            <span onClick={() => setIsEditing(true)}>{task.description}</span>
                            <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
                            <button onClick={() => completeTask(task.id)}> ✓ </button>
                            <button onClick={() => removeTask(task.id)}> X </button>
                        </>
                    )
            }
        </li>
    );
}

