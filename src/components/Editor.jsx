export default function Editor({
    title,
    setTitle,
    tags,
    setTags,
    content,
    setContent,
}) {
    return (
        <div className="flex-1 min-w-0 px-6 py-4 flex flex-col gap-4">
            <input
                type="text"
                placeholder="Untitled note..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="
                    text-3xl font-bold tracking-tight
                    bg-transparent outline-none

                    text-gray-900 dark:text-gray-100

                    placeholder:text-gray-400
    "
            />

            <input
                type="text"
                placeholder="Add tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="
                    text-sm
                    bg-gray-100 dark:bg-gray-800
                    px-3 py-1.5 rounded-lg

                    text-gray-600 dark:text-gray-300
                    placeholder:text-gray-400

                    outline-none focus:ring-2 focus:ring-blue-500
    "
            />

            <textarea
                placeholder="Start writing in markdown..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="
                    flex-1 resize-none outline-none

                    text-[15px] leading-relaxed
                    font-mono

                    bg-white dark:bg-gray-900
                    text-gray-800 dark:text-gray-200

                    p-4 rounded-xl
                    border border-gray-200 dark:border-gray-700

                    focus:ring-2 focus:ring-blue-500
                    focus:border-blue-500

                    shadow-sm"
            />
        </div>
    );
}
