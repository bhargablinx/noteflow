import { useContext, useEffect, useState } from "react";
import NotesCard from "../components/NotesCard";
import Searchbar from "../components/Searchbar";
import { NotesContext } from "../context/NotesContext";

export default function Layout1({ onSelectNote }) {
    const { notes } = useContext(NotesContext);
    const [tick, setTick] = useState(0);

    function getTimeAgo(dateString) {
        const now = new Date();
        const past = new Date(dateString);

        const diffInSeconds = Math.floor((now - past) / 1000);

        if (diffInSeconds < 60) return "Just now";

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hr ago`;

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays} day(s) ago`;

        return past.toLocaleDateString(); // fallback
    }

    // Auto-update every minute
    useEffect(() => {
        const interval = setInterval(() => {
            setTick((prev) => prev + 1);
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="flex-1 p-6 space-y-4 bg-gray-50 dark:bg-gray-950 h-full overflow-y-auto transition-colors duration-300">
            {/* Search */}
            <Searchbar />

            {/* Notes */}
            <div className="space-y-4">
                {/* Card */}
                {notes.map((note, index) => (
                    <NotesCard
                        key={note.id}
                        index={index}
                        title={note.title}
                        content={note.content}
                        tags={note.tags}
                        lastEdited={getTimeAgo(note.lastEdited)}
                        onClick={() => onSelectNote(note)}
                    />
                ))}
            </div>
        </main>
    );
}
