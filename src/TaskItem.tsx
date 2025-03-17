import { Task } from "./useTaskStore";

interface TaskItemProps {
    task: Task;
    completeTask: (id: number) => void;
    removeTask: (id: number) => void;
}

export function TaskItem({task, completeTask, removeTask} : TaskItemProps) {
    return (
        <li className = {task.completed ? "selected" : ""}>
            {task.description}
            <button onClick={() => completeTask(task.id)}> ✓ </button>
            <button onClick={() => removeTask(task.id)}> X </button>
        </li>
    );
}

