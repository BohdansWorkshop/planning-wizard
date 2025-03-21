import { useRef, useState } from "react";
import { Journal, useTaskStore } from "./useTaskStore";

interface JournalItemProps {
    journal: Journal;
    setActiveJournal: (id: number) => void;
    removeJournal: (id: number) => void;
}

export function JournalItem({ journal, setActiveJournal, removeJournal }: JournalItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(journal.name);
    const {editJournalName} = useTaskStore();
    const inputRef = useRef<HTMLInputElement>(null);
    
    const handleNameClick = () => {
        setIsEditing(true);
    };

    const handleEditBlur  = () => {
        if (editedName.trim()) {
            editJournalName(journal.id, editedName);
        }else{
            setEditedName(journal.name);
        }
        setIsEditing(false);
        
    };

    return (
        <div className="journal-item">
            {isEditing ? (
                <div>
                <input 
                ref={inputRef}
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onBlur = {handleEditBlur} />
                </div>
            ) : (
            <h2 onClick = {() => setActiveJournal(journal.id)}>
                <span onClick={handleNameClick}> {journal.name} </span> 
            <button onClick = {() => removeJournal(journal.id)}> X </button> 
            <button onClick={() => setActiveJournal(journal.id)}>Manage Tasks</button>
            </h2>
            )
        }
        </div>
    );
}  