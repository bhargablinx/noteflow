import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import CreateNoteModal from "./CreateNoteModal";

export default function Header() {
    const { theme, setTheme } = useContext(ThemeContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notes, setNotes] = useState([]); // Temporary

    const handleSaveNote = (note) => {
        setNotes((prev) => [note, ...prev]);
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
                        className="bg-blue-600 hover:bg-blue-700
                            text-white px-4 py-2 rounded-lg
                            transition-colors duration-200"
                        onClick={() => setIsModalOpen(true)}
                    >
                        + Create Note
                    </button>
                    {theme == "light" ? (
                        <i
                            onClick={toggleTheme}
                            class="fa-solid fa-sun text-2xl text-white cursor-pointer"
                        ></i>
                    ) : (
                        <i
                            onClick={toggleTheme}
                            class="fa-solid fa-moon text-2xl text-black cursor-pointer"
                        ></i>
                    )}
                </div>
            </header>

            {/* Modal */}
            <CreateNoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveNote}
            />
        </div>
    );
}
