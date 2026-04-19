import { useContext, useEffect } from "react";
import { NotesContext } from "./context/NotesContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Layout1 from "./layout/Layout1";
import Layout2 from "./layout/Layout2";

function App() {
    const { notes, setNotes, selectedNoteId, setSelectedNoteId } =
        useContext(NotesContext);

    const selectedNote = notes.find((n) => n.id === selectedNoteId);

    // When the site first loaded pull from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("notes");

        if (stored) {
            setNotes(JSON.parse(stored));
        } else {
            setNotes([]); // fallback to empty array
        }
    }, []);

    // Whenever notes changes save to localStorage
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <Header />

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <Sidebar className="flex-1" />

                {/* Main Content */}
                <div className="flex-1">
                    {selectedNote ? (
                        <Layout2
                            selectedNote={selectedNote}
                            onBack={() => setSelectedNoteId(null)}
                        />
                    ) : (
                        <Layout1
                            onSelectNote={(note) => setSelectedNoteId(note.id)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
