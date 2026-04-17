export default function Editor({
    title,
    setTitle,
    tags,
    setTags,
    content,
    setContent,
}) {
    function shortcutFunctionality(e) {
        // Tabs Functionaity
        if (e.key === "Tab") {
            e.preventDefault();

            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;

            const newValue =
                content.substring(0, start) +
                "    " + // 4 spaces (you can use "\t" instead)
                content.substring(end);

            setContent(newValue);

            // Move cursor after inserted tab
            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = start + 4;
            }, 0);
        }
    }

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

                    outline-none focus:ring-1 focus:ring-blue-300
    "
            />

            <textarea
                placeholder="Start writing in markdown..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => shortcutFunctionality(e)}
                className="
                    flex-1 resize-none outline-none

                    text-[15px] leading-relaxed
                    font-mono

                    bg-white dark:bg-gray-900
                    text-gray-800 dark:text-gray-200

                    p-4 rounded-xl
                    border border-gray-200 dark:border-gray-700

                    focus:ring-1 focus:ring-blue-300
                    focus:border-blue-300

                    shadow-sm"
            />
        </div>
    );
}
