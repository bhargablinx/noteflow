export default function NotesCard({
    title,
    descriptionPreview,
    tags = [],
    lastEdited,
}) {
    // Tag color variations
    const tagColors = [
        "bg-blue-100 text-blue-600",
        "bg-green-100 text-green-600",
        "bg-red-100 text-red-600",
        "bg-purple-100 text-purple-600",
        "bg-yellow-100 text-yellow-600",
    ];

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

            {/* Description */}
            <p className="text-gray-600 text-sm mt-1 line-clamp-1">
                {descriptionPreview}
            </p>

            {/* Tags */}
            <div className="flex gap-2 mt-3 flex-wrap">
                {tags.map((item, index) => (
                    <span
                        key={index}
                        className={`px-2 py-1 text-xs rounded-md ${
                            tagColors[index % tagColors.length]
                        }`}
                    >
                        {item}
                    </span>
                ))}
            </div>

            {/* Footer */}
            <p className="text-xs text-gray-400 mt-3">
                Last edited: {lastEdited}
            </p>
        </div>
    );
}
