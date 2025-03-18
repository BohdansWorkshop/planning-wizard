// JournalList.tsx
import { useTaskStore } from "./useTaskStore";
import { JournalItem } from "./JournalItem";
import { useState } from "react";

export function JournalList() {
    const { journals, addJournal, setActiveJournal, removeJournal } = useTaskStore();
    const [input, setInput] = useState("");

    return (
        <div>
            <h1>Bullet Journal Manager</h1>
            <div>
                <input 
                type="text"
                value ={input}
                onChange={(e) => setInput(e.target.value)}/>
                <button onClick={() => { addJournal(input); setInput(""); }}> + </button>
            </div>
            {journals.map(journal => (
                <JournalItem 
                    key={journal.id} 
                    journal={journal} 
                    setActiveJournal={setActiveJournal} 
                    removeJournal={removeJournal} 
                />
            ))}
        </div>
    );
}
