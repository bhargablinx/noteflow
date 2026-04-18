import { useRef, useEffect, useContext } from "react";
import { NotesContext } from "../context/NotesContext";

export default function NotesCard({
    title,
    index,
    content,
    tags = [],
    lastEdited,
    onClick,
}) {
    const { flashNoteIndex } = useContext(NotesContext);
    const ref = useRef(null);
    const isFlashing = flashNoteIndex === index;

    // Tag color variations
    const TAG_COLORS = [
        "bg-red-100 text-red-700 border-red-200",
        "bg-orange-100 text-orange-700 border-orange-200",
        "bg-amber-100 text-amber-700 border-amber-200",
        "bg-yellow-100 text-yellow-700 border-yellow-200",
        "bg-lime-100 text-lime-700 border-lime-200",
        "bg-green-100 text-green-700 border-green-200",
        "bg-emerald-100 text-emerald-700 border-emerald-200",
        "bg-teal-100 text-teal-700 border-teal-200",
        "bg-cyan-100 text-cyan-700 border-cyan-200",
        "bg-sky-100 text-sky-700 border-sky-200",
        "bg-blue-100 text-blue-700 border-blue-200",
        "bg-indigo-100 text-indigo-700 border-indigo-200",
        "bg-violet-100 text-violet-700 border-violet-200",
        "bg-purple-100 text-purple-700 border-purple-200",
        "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
        "bg-pink-100 text-pink-700 border-pink-200",
        "bg-rose-100 text-rose-700 border-rose-200",
    ];

    function getTagColor(tag) {
        let hash = 5381;

        for (let i = 0; i < tag.length; i++) {
            hash = (hash * 33) ^ tag.charCodeAt(i);
        }

        return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
    }

    useEffect(() => {
        if (isFlashing && ref.current) {
            ref.current.scrollIntoView({
                behavior: "smooth",
                block: "center", // keeps it nicely centered
            });
        }
    }, [isFlashing]);

    return (
        <div
            ref={ref}
            onClick={onClick}
            className={`p-4 rounded-xl transition-all duration-500 cursor-pointer border shadow-sm hover:shadow-md dark:shadow-gray-800/30
                    ${
                        isFlashing
                            ? "bg-blue-100 dark:bg-blue-900 border-blue-400 scale-[1.02]"
                            : "bg-white dark:bg-gray-900 border-transparent dark:border-gray-800"
                    }`}
        >
            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {title}
            </h2>

            {/* Description / Content Preview */}
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-1">
                {content}
            </p>

            {/* Tags */}
            <div className="flex gap-2 mt-3 flex-wrap">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className={`px-2 py-1 text-xs rounded-md border ${getTagColor(tag.toLowerCase().trim())} dark:opacity-90`}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Footer */}
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                Last edited: {lastEdited}
            </p>
        </div>
    );
}
