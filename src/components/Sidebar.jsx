import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

export default function Sidebar() {
    const { notes, flashNoteIndex, setFlashNoteIndex } =
        useContext(NotesContext);

    const notesTitle = notes.map((note) => note.title);

    return (
        <aside
            className="
    hidden md:block
    w-56 lg:w-64
    bg-gray-100 dark:bg-gray-900 
    h-full 
    p-3 sm:p-4
    transition-colors duration-300
    overflow-y-auto
  "
        >
            <ul className="space-y-1 sm:space-y-2">
                {notesTitle.map((title, index) => (
                    <li
                        key={index}
                        onClick={() => {
                            setFlashNoteIndex(index);

                            setTimeout(() => {
                                setFlashNoteIndex(null);
                            }, 1000);
                        }}
                        className="
          p-2 sm:p-2.5
          rounded-lg 
          cursor-pointer 
          hover:bg-gray-200 dark:hover:bg-gray-800 
          text-gray-800 dark:text-gray-200 
          transition-colors duration-200
          truncate
        "
                    >
                        {title}
                    </li>
                ))}
            </ul>
        </aside>
    );
}
