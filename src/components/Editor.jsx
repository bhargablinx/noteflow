export default function Editor({
    title,
    setTitle,
    tags,
    setTags,
    content,
    setContent,
}) {
    function shortcutFunctionality(e) {
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        const before = content.substring(0, start);
        const selected = content.substring(start, end);
        const after = content.substring(end);

        // Tabs Functionality
        if (e.key === "Tab") {
            const newValue =
                content.substring(0, start) +
                "    " + // 4 spaces (you can use "\t" instead)
                content.substring(end);

            setContent(newValue);

            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = start + 4;
            }, 0);
        }

        // Shortcut Functionality
        const isCtrl = e.ctrlKey || e.metaKey; // supports Win / Mac / Linux

        if (!isCtrl) return;

        const wrap = (prefix, suffix = prefix) => {
            e.preventDefault();

            const newText = before + prefix + selected + suffix + after;
            setContent(newText);

            setTimeout(() => {
                e.target.selectionStart = start + prefix.length;
                e.target.selectionEnd = end + prefix.length;
            }, 0);
        };

        switch (e.key.toLowerCase()) {
            case "b":
                wrap("**"); // bold
                break;
            case "i":
                wrap("*"); // italic
                break;
            case "k":
                wrap("`"); // inline code
                break;
            case "s":
                wrap("~~"); // strikethrough
                break;
            case "h":
                wrap("=="); // highlight (need implementation in preview side!)
                break;
            case "e":
                // code block
                e.preventDefault();
                const block = `\n\`\`\`\n${selected}\n\`\`\`\n`;
                setContent(before + block + after);
                break;
            default:
                break;
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
