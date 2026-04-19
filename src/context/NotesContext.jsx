import { createContext, useState, useEffect } from "react";
import { demoNotes } from "../demoNotes";

export const NotesContext = createContext(null);

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState(() => {
        const stored = localStorage.getItem("notes");
        return stored ? JSON.parse(stored) : demoNotes;
    });
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [flashNoteIndex, setFlashNoteIndex] = useState(null);

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    return (
        <NotesContext.Provider
            value={{
                notes,
                setNotes,
                flashNoteIndex,
                setFlashNoteIndex,
                selectedNoteId,
                setSelectedNoteId,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};
