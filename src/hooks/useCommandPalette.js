import { useEffect, useState } from "react";

export function useCommandPalette(filteredNotes, onSelectNote) {
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

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

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isPaletteOpen, selectedIndex, filteredNotes, onSelectNote]);

    return {
        isPaletteOpen,
        setIsPaletteOpen,
        selectedIndex,
        setSelectedIndex,
    };
}
