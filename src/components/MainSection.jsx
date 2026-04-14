import { useContext } from "react";
import NotesCard from "./NotesCard";
import Searchbar from "./Searchbar";
import { NotesContext } from "../context/NotesContext";

export default function MainSection() {
    const { notes } = useContext(NotesContext);

    return (
        <main className="flex-1 p-6 space-y-4 bg-gray-50 dark:bg-gray-950 h-full overflow-y-auto transition-colors duration-300">
            {/* Search */}
            <Searchbar />

            {/* Notes */}
            <div className="space-y-4">
                {/* Card */}
                {notes.map((note) => (
                    <NotesCard
                        title={note.title}
                        descriptionPreview={note.descriptionPreview}
                        tags={note.tags}
                        lastEdited="5 hours ago"
                    />
                ))}
            </div>
        </main>
    );
}
