import { useContext, useEffect, useState } from "react";
import { NotesContext } from "../context/NotesContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../reducers/themeSlice";

export default function Header() {
    const theme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch();
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

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    return (
        <div>
            <header
                className="flex items-center justify-between 
    px-3 py-3 sm:px-4 md:px-6 md:py-4
    bg-white dark:bg-gray-900 
    shadow-sm dark:shadow-gray-800/30 
    border-b border-gray-200 dark:border-gray-800 
    transition-colors duration-300"
            >
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Noteflow
                </h1>

                <div className="flex items-center gap-2 sm:gap-3 md:gap-6">
                    <button
                        className="bg-emerald-600 hover:bg-emerald-700 text-white 
        px-2 py-1 text-sm 
        sm:px-3 sm:py-1.5 sm:text-sm 
        md:px-4 md:py-2 md:text-base 
        rounded-lg transition-colors duration-200 whitespace-nowrap"
                        onClick={handleCreateNote}
                    >
                        + Create
                        <span className="hidden sm:inline"> Note</span>
                    </button>

                    <button
                        className={`fa-solid ${
                            theme !== "light"
                                ? "fa-sun text-yellow-400"
                                : "fa-moon text-gray-800"
                        } text-lg sm:text-xl md:text-2xl cursor-pointer`}
                        onClick={handleToggleTheme}
                    ></button>
                </div>
            </header>
        </div>
    );
}
