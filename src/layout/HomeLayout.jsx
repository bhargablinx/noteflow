import { useContext, useEffect, useMemo, useState } from "react";
import NotesCard from "../components/NotesCard";
import Searchbar from "../components/Searchbar";
import CommandPalette from "../components/CommandPalette";
import { NotesContext } from "../context/NotesContext";
import { getTimeAgo } from "../utils/formatDate";
import { useCommandPalette } from "../hooks/useCommandPalette";
import { highlightText } from "../utils/highlightText";
import { getSnippet } from "../utils/getSnippet";

export default function HomeLayout({ onSelectNote }) {
    const { notes } = useContext(NotesContext);

    const [searchQuery, setSearchQuery] = useState("");

    const filteredNotes = useMemo(() => {
        const q = searchQuery.toLowerCase();

        return notes.filter((note) => {
            return (
                (note.title || "").toLowerCase().includes(q) ||
                (note.content || "").toLowerCase().includes(q) ||
                (note.tags || []).some((tag) => tag.toLowerCase().includes(q))
            );
        });
    }, [notes, searchQuery]);

    const { isPaletteOpen, setIsPaletteOpen, selectedIndex, setSelectedIndex } =
        useCommandPalette(filteredNotes, onSelectNote);

    useEffect(() => {
        setSelectedIndex(0);
    }, [searchQuery]);

    return (
        <main className="flex-1 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 bg-gray-50 dark:bg-gray-950 h-full overflow-y-auto transition-colors duration-300">
            {/* Search */}
            <Searchbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            {/* Notes */}
            <div className="space-y-3 sm:space-y-4">
                {filteredNotes.map((note, index) => (
                    <NotesCard
                        key={note.id}
                        index={index}
                        title={note.title}
                        content={note.content}
                        tags={note.tags}
                        lastEdited={getTimeAgo(note.lastEdited)}
                        onClick={() => onSelectNote(note)}
                        searchQuery={searchQuery}
                        highlightText={highlightText}
                        getSnippet={getSnippet}
                    />
                ))}

                {filteredNotes.length === 0 && (
                    <p className="text-sm text-gray-500 px-1">No notes found</p>
                )}
            </div>

            <CommandPalette
                isOpen={isPaletteOpen}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredNotes={filteredNotes}
                selectedIndex={selectedIndex}
                setIsPaletteOpen={setIsPaletteOpen}
                onSelectNote={onSelectNote}
            />
        </main>
    );
}
