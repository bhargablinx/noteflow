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
                className="text-2xl font-semibold bg-transparent outline-none"
            />

            <input
                type="text"
                placeholder="Add tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="text-sm text-gray-500 bg-transparent outline-none"
            />

            <textarea
                placeholder="Start writing in markdown..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 bg-transparent outline-none resize-none text-gray-800 dark:text-gray-200 leading-relaxed"
            />
        </div>
    );
}
