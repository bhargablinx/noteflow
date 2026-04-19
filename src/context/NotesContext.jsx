import { createContext, useState } from "react";

export const NotesContext = createContext(null);

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [flashNoteIndex, setFlashNoteIndex] = useState(null);

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
