import { useEffect, useRef, useState } from "react";
import { Task } from "./useTaskStore";

interface TaskItemProps {
    task: Task;
    completeTask: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, description: string) => void;
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

    return (
        <li className={task.completed ? "selected" : ""}>
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

