import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { NotesContext } from "../context/NotesContext";

export default function Header() {
    const { theme, setTheme } = useContext(ThemeContext);
    const { notes, setNotes, setSelectedNoteId } = useContext(NotesContext);

    const handleCreateNote = () => {
        const newNote = {
            id: Date.now(),
            title: "",
            content: "",
            tags: [],
            lastEdited: new Date().toISOString(),
        };

        setNotes((prev) => [newNote, ...prev]);
        setSelectedNoteId(newNote.id);
    };

    const handleSaveNote = (note) => {
        setNotes((prev) => [note, ...prev]);
        console.log(notes);
    };

    const toggleTheme = () => {
        theme == "light" ? setTheme("dark") : setTheme("light");
        const html = document.querySelector("html");
        html.classList.remove("light", "dark");
        html.classList.add(theme);
        console.log(theme);
    };

    return (
        <div>
            <header
                className="flex items-center justify-between px-6 py-4 
                bg-white dark:bg-gray-900 
                shadow-sm dark:shadow-gray-800/30 
                border-b border-gray-200 dark:border-gray-800 
                transition-colors duration-300"
            >
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Noteflow
                </h1>
                <div className="flex items-center gap-[30px]">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        onClick={handleCreateNote}
                    >
                        + Create Note
                    </button>

                    <i
                        className={`fa-solid ${
                            theme === "light"
                                ? "fa-sun text-yellow-400"
                                : "fa-moon text-gray-800"
                        } text-2xl cursor-pointer`}
                        onClick={toggleTheme}
                    ></i>
                </div>
            </header>
        </div>
    );
}
