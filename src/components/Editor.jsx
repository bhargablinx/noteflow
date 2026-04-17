export default function Editor({
    title,
    setTitle,
    tags,
    setTags,
    content,
    setContent,
}) {
    function shortcutFunctionality(e) {
        const textarea = e.target;
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        const before = content.substring(0, start);
        let selected = content.substring(start, end);
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

        const toggleWrap = (prefix, suffix = prefix, placeholder = "text") => {
            e.preventDefault();

            const beforePrefix = content.substring(
                start - prefix.length,
                start,
            );
            const afterSuffix = content.substring(end, end + suffix.length);

            // NO SELECTION
            if (start === end) {
                const newText = before + prefix + placeholder + suffix + after;
                setContent(newText);
                setTimeout(() => {
                    textarea.selectionStart = start + prefix.length;
                    textarea.selectionEnd =
                        start + prefix.length + placeholder.length;
                }, 0);

                return;
            }

            // ALREADY WRAPPED
            if (beforePrefix === prefix && afterSuffix === suffix) {
                const newText =
                    content.substring(0, start - prefix.length) +
                    selected +
                    content.substring(end + suffix.length);

                setContent(newText);

                setTimeout(() => {
                    textarea.selectionStart = start - prefix.length;
                    textarea.selectionEnd = end - prefix.length;
                }, 0);

                return;
            }

            // WRAP
            const newText = before + prefix + selected + suffix + after;
            setContent(newText);
            setTimeout(() => {
                textarea.selectionStart = start + prefix.length;
                textarea.selectionEnd = end + prefix.length;
            }, 0);
        };

        switch (e.key.toLowerCase()) {
            case "b":
                toggleWrap("**", "**", "bold");
                break;
            case "i":
                toggleWrap("*", "*", "italic");
                break;
            case "k":
                toggleWrap("`", "`", "code");
                break;
            case "s":
                if (e.shiftKey) {
                    toggleWrap("~~", "~~", "strike"); // Shit + S
                }
                break;
            case "h":
                toggleWrap("==", "==", "highlight"); // highlight (need implementation in preview side!)
                break;
            case "e":
                // code block
                e.preventDefault();

                const block = `\n\`\`\`\n${selected || "code"}\n\`\`\`\n`;

                setContent(before + block + after);

                setTimeout(() => {
                    textarea.selectionStart = start + 5; // inside code block
                    textarea.selectionEnd =
                        start + 5 + (selected || "code").length;
                }, 0);
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
