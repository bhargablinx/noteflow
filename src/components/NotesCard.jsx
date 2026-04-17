import { useContext } from "react";
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

    const isFlashing = flashNoteIndex === index;

    // Tag color variations
    const tagColors = [
        "bg-blue-100 text-blue-600",
        "bg-green-100 text-green-600",
        "bg-red-100 text-red-600",
        "bg-purple-100 text-purple-600",
        "bg-yellow-100 text-yellow-600",
    ];

    return (
        <div
            onClick={onClick}
            className={`p-4 rounded-xl transition-all duration-500 cursor-pointer border
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

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-1">
                {content}
            </p>

            {/* Tags */}
            <div className="flex gap-2 mt-3 flex-wrap">
                {tags.map((item, index) => (
                    <span
                        key={index}
                        className={`px-2 py-1 text-xs rounded-md ${
                            tagColors[index % tagColors.length]
                        } dark:opacity-90`}
                    >
                        {item}
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
