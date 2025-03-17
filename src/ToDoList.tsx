import { useState } from "react";
import { useTaskStore } from "./useTaskStore";
import { TaskItem } from "./TaskItem";

export default function TodoList() {
    const { tasks, addTask, completeTask, removeTask } = useTaskStore();
    const [input, setInput] = useState<string>("");

    return (
        <div>
            <h1> Bullet Journal</h1>
            <div>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <button onClick={() => { addTask(input); setInput(""); }}>+</button>
            </div>
            <ul>
                {tasks.map(x => (
                    <TaskItem key={x.id} task={x} completeTask={completeTask} removeTask={removeTask} />
                ))};
            </ul>
        </div>
    );
}