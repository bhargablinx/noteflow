import { useContext, useEffect, useState } from "react";
import NotesCard from "../components/NotesCard";
import Searchbar from "../components/Searchbar";
import { NotesContext } from "../context/NotesContext";

export default function Layout1({ onSelectNote }) {
    const { notes } = useContext(NotesContext);
    const [tick, setTick] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

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

    const filteredNotes = notes.filter((note) => {
        const q = searchQuery.toLowerCase();

        return (
            (note.title || "").toLowerCase().includes(q) ||
            (note.content || "").toLowerCase().includes(q) ||
            (note.tags || []).some((tag) => tag.toLowerCase().includes(q))
        );
    });

    function highlightText(text, query) {
        if (!query) return text;

        const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`(${escaped})`, "gi");

        return text.replace(regex, "<mark>$1</mark>");
    }

    function getSnippet(text, query) {
        if (!text) return "";
        if (!query) return text.slice(0, 150);

        const lowerText = text.toLowerCase();
        const words = query.toLowerCase().split(" ").filter(Boolean);

        const index = words
            .map((word) => lowerText.indexOf(word))
            .find((i) => i !== -1);

        if (index === undefined) return text.slice(0, 150);

        const SNIPPET_BEFORE = 40;
        const SNIPPET_AFTER = 100;

        let start = Math.max(0, index - SNIPPET_BEFORE);
        let end = Math.min(text.length, index + SNIPPET_AFTER);

        // Adjust to word boundaries
        while (start > 0 && text[start] !== " ") start--;
        while (end < text.length && text[end] !== " ") end++;

        let snippet = text.slice(start, end);

        if (start > 0) snippet = "..." + snippet;
        if (end < text.length) snippet += "...";

        return snippet;
    }

    // Auto-update every minute
    useEffect(() => {
        const interval = setInterval(() => {
            setTick((prev) => prev + 1);
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        function handleKeyDown(e) {
            // Open palette
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setIsPaletteOpen(true);
            }

            if (!isPaletteOpen) return;

            // Navigation
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) =>
                    Math.min(prev + 1, filteredNotes.length - 1),
                );
            }

            if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => Math.max(prev - 1, 0));
            }

            // Select
            if (e.key === "Enter") {
                if (filteredNotes[selectedIndex]) {
                    onSelectNote(filteredNotes[selectedIndex]);
                    setIsPaletteOpen(false);
                }
            }

            // Close
            if (e.key === "Escape") {
                setIsPaletteOpen(false);
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isPaletteOpen, selectedIndex, filteredNotes]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [searchQuery]);

    return (
        <main
            className="
    flex-1 
    p-3 sm:p-4 md:p-6 
    space-y-3 sm:space-y-4 
    bg-gray-50 dark:bg-gray-950 
    h-full overflow-y-auto 
    transition-colors duration-300
  "
        >
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

            {/* Command Palette */}
            {isPaletteOpen && (
                <div
                    className="
        fixed inset-0 
        cursor-pointer 
        bg-black/40 backdrop-blur-sm 
        flex items-start justify-center 
        pt-16 sm:pt-20 md:pt-24
        px-3 sm:px-4
        z-50
      "
                    onClick={() => setIsPaletteOpen(false)}
                >
                    <div
                        className="
          w-full 
          max-w-lg md:max-w-xl
          cursor-default 
          bg-white dark:bg-gray-900 
          rounded-xl sm:rounded-2xl 
          shadow-xl 
          p-3 sm:p-4
        "
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Input */}
                        <input
                            autoFocus
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search notes..."
                            className="
            w-full 
            px-3 sm:px-4 
            py-2.5 sm:py-3 
            text-sm sm:text-base
            rounded-lg 
            border 
            dark:bg-gray-800 
            dark:border-gray-700 
            outline-none
          "
                        />

                        {/* Results */}
                        <div className="mt-3 sm:mt-4 max-h-64 sm:max-h-80 overflow-y-auto">
                            {filteredNotes.length === 0 && (
                                <p className="text-sm text-gray-500 p-2">
                                    No results found
                                </p>
                            )}

                            {filteredNotes.map((note, index) => (
                                <div
                                    key={note.id}
                                    onClick={() => {
                                        onSelectNote(note);
                                        setIsPaletteOpen(false);
                                    }}
                                    className={`p-2.5 sm:p-3 rounded-lg cursor-pointer transition ${
                                        index === selectedIndex
                                            ? "bg-blue-100 dark:bg-blue-900"
                                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                                >
                                    <p
                                        className="font-medium text-sm sm:text-base text-gray-800 dark:text-gray-200"
                                        dangerouslySetInnerHTML={{
                                            __html: highlightText(
                                                note.title || "Untitled",
                                                searchQuery,
                                            ),
                                        }}
                                    />

                                    <p
                                        className="text-xs text-gray-500 line-clamp-1"
                                        dangerouslySetInnerHTML={{
                                            __html: highlightText(
                                                getSnippet(
                                                    note.content,
                                                    searchQuery,
                                                ),
                                                searchQuery,
                                            ),
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
