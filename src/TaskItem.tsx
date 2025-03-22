import { useEffect, useId, useRef, useState } from "react";
import { Task } from "./useTaskStore";

interface TaskItemProps {
    task: Task;
    completeTask: (id: string) => void;
    removeTask: (id: string) => void;
    editTask: (id: string, description: string) => void;
}

export function TaskItem({ task, completeTask, removeTask, editTask }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(task.description);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

    const handleEditBlur = () => {
        if (editedDescription.trim()) {
            editTask(task.id, editedDescription);
        } else {
            setEditedDescription(task.description);
        }
        setIsEditing(false);
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleEditBlur();
        }
    };
    const priorityClass = task.priority.toLowerCase();
    return (
        <li className={`task-item ${task.completed ? "completed" : ""} ${priorityClass}`}>
            {
                isEditing
                    ? (
                        <input ref={inputRef} type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} onBlur={handleEditBlur} onKeyDown={handleKeyDown} />
                    )
                    : (
                        <>
                            <span onClick={() => setIsEditing(true)}>{task.description}</span>
                            <button onClick={() => completeTask(task.id)}> ✓ </button>
                            <button onClick={() => removeTask(task.id)}> X </button>
                        </>
                    )
            }
        </li>
    );
}

