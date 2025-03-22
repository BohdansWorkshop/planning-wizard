import { useEffect, useRef, useState } from "react";
import { Journal, useTaskStore } from "./useTaskStore";

interface JournalItemProps {
    journal: Journal;
    setActiveJournal: (id: string) => void;
    removeJournal: (id: string) => void;
}

export function JournalItem({ journal, setActiveJournal, removeJournal }: JournalItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(journal.name);
    const { editJournalName } = useTaskStore();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

    const handleNameClick = () => {
        setIsEditing(true);
    };

    const handleEditBlur = () => {
        if (editedName.trim()) {
            editJournalName(journal.id, editedName);
        } else {
            setEditedName(journal.name);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleEditBlur();
        }
    };

    return (
        <div className="journal-item">
            {isEditing ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onBlur={handleEditBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            ) : (
                    <h2 onClick={() => setActiveJournal(journal.id)}>
                        <span onClick={handleNameClick}> {journal.name} </span>
                        <button onClick={(e) => { e.stopPropagation(); removeJournal(journal.id) }}> X </button>
                        <button onClick={(e) => { e.stopPropagation(); setActiveJournal(journal.id) }}>Manage Tasks</button>
                    </h2>
            )
            }
        </div>
    );
}  