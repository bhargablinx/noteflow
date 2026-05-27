import { highlightText } from "../utils/highlightText";
import { getSnippet } from "../utils/getSnippet";

export default function CommandPalette({
    isOpen,
    searchQuery,
    setSearchQuery,
    filteredNotes,
    selectedIndex,
    setIsPaletteOpen,
    onSelectNote,
}) {
    if (!isOpen) return null;

    return (
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
                                        getSnippet(note.content, searchQuery),
                                        searchQuery,
                                    ),
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
