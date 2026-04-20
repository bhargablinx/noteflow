import { useContext, useEffect } from "react";
import { NotesContext } from "../context/NotesContext";

export const toggleWrapUtil = (
    textarea,
    setContent,
    prefix,
    suffix = prefix,
) => {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;

    const selected = value.substring(start, end);

    const beforePrefix =
        start >= prefix.length
            ? value.substring(start - prefix.length, start)
            : "";

    const afterSuffix = value.substring(end, end + suffix.length);

    // NO SELECTION
    if (start === end) {
        const insert = prefix + suffix;

        textarea.setRangeText(insert, start, end, "end");

        const cursorPos = start + prefix.length;
        textarea.selectionStart = textarea.selectionEnd = cursorPos;

        setContent(textarea.value);
        return;
    }

    // UNWRAP
    if (beforePrefix === prefix && afterSuffix === suffix) {
        textarea.setRangeText(
            selected,
            start - prefix.length,
            end + suffix.length,
            "select",
        );

        textarea.selectionStart = start - prefix.length;
        textarea.selectionEnd = end - prefix.length;

        setContent(textarea.value);
        return;
    }

    // WRAP
    textarea.setRangeText(prefix + selected + suffix, start, end, "select");

    textarea.selectionStart = start + prefix.length;
    textarea.selectionEnd = end + prefix.length;

    setContent(textarea.value);
};

export default function Editor({
    title,
    setTitle,
    tags,
    setTags,
    content,
    setContent,
    textareaRef,
}) {
    const { selectedNoteId, upsertNote } = useContext(NotesContext);

    function shortcutFunctionality(e) {
        const textarea = e.target;

        // -------- TAB HANDLING --------
        if (e.key === "Tab") {
            e.preventDefault();

            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            const before = content.substring(0, start);
            const selected = content.substring(start, end);
            const after = content.substring(end);

            const spaces = "    ";

            if (selected.includes("\n")) {
                const indented = selected
                    .split("\n")
                    .map((line) => spaces + line)
                    .join("\n");

                const newText = before + indented + after;
                setContent(newText);

                setTimeout(() => {
                    textarea.selectionStart = start;
                    textarea.selectionEnd = start + indented.length;
                }, 0);
            } else {
                const newText = before + spaces + after;
                setContent(newText);

                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd =
                        start + spaces.length;
                }, 0);
            }

            return;
        }

        // -------- SHORTCUTS --------
        const isMod = e.ctrlKey || e.metaKey;
        if (!isMod) return;

        const toggleWrap = (prefix, suffix = prefix, placeholder = "text") => {
            e.preventDefault();

            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const value = textarea.value;

            const selected = value.substring(start, end);

            const beforePrefix =
                start >= prefix.length
                    ? value.substring(start - prefix.length, start)
                    : "";

            const afterSuffix = value.substring(end, end + suffix.length);

            // NO SELECTION
            if (start === end) {
                const insert = prefix + suffix;

                textarea.setRangeText(insert, start, end, "end");

                // place cursor in between
                const cursorPos = start + prefix.length;
                textarea.selectionStart = textarea.selectionEnd = cursorPos;

                setContent(textarea.value);
                return;
            }

            // ALREADY WRAPPED → unwrap
            if (beforePrefix === prefix && afterSuffix === suffix) {
                textarea.setRangeText(
                    selected,
                    start - prefix.length,
                    end + suffix.length,
                    "select",
                );

                textarea.selectionStart = start - prefix.length;
                textarea.selectionEnd = end - prefix.length;

                setContent(textarea.value);
                return;
            }

            // WRAP
            textarea.setRangeText(
                prefix + selected + suffix,
                start,
                end,
                "select",
            );

            textarea.selectionStart = start + prefix.length;
            textarea.selectionEnd = end + prefix.length;

            setContent(textarea.value);
        };

        switch (e.key.toLowerCase()) {
            case "b":
                toggleWrap("**", "**", "bold");
                break;

            case "i":
                toggleWrap("*", "*", "italic");
                break;

            case "s":
                if (e.shiftKey) {
                    toggleWrap("~~", "~~", "strike");
                }
                break;

            case "h":
                toggleWrap("==", "==", "highlight");
                break;

            case "e": {
                e.preventDefault();

                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const value = textarea.value;

                const before = value.substring(0, start);
                const selected = value.substring(start, end);
                const after = value.substring(end);

                const block = `\n\`\`\`\n${selected || "code"}\n\`\`\`\n`;

                const newText = before + block + after;
                setContent(newText);

                setTimeout(() => {
                    textarea.selectionStart = start + 5;
                    textarea.selectionEnd =
                        start + 5 + (selected || "code").length;
                }, 0);

                break;
            }

            default:
                break;
        }
    }

    useEffect(() => {
        if (!selectedNoteId) return;

        const timeout = setTimeout(() => {
            upsertNote({
                id: selectedNoteId,
                title,
                content,
                tags: tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
            });
        }, 400); // smooth delay like real apps

        return () => clearTimeout(timeout);
    }, [title, content, tags]);

    return (
        <div className="flex-1 min-w-0 px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex flex-col gap-3 sm:gap-4 min-h-0 h-full">
            <input
                type="text"
                placeholder="Untitled note..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="
      text-xl sm:text-2xl md:text-3xl font-bold tracking-tight
      bg-transparent outline-none
      text-gray-900 dark:text-gray-100
      placeholder:text-gray-400
      shrink-0
    "
            />

            <input
                type="text"
                placeholder="Add tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="
      text-xs sm:text-sm
      bg-gray-100 dark:bg-gray-800
      px-2.5 sm:px-3 py-1.5 rounded-lg
      text-gray-600 dark:text-gray-300
      placeholder:text-gray-400
      outline-none focus:ring-1 focus:ring-blue-300
      shrink-0
    "
            />

            {/* FIX: this wrapper grows properly */}
            <div className="flex-1 min-h-0 flex">
                <textarea
                    ref={textareaRef}
                    placeholder="Start writing in markdown..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={(e) => shortcutFunctionality(e)}
                    className="
        flex-1 w-full h-full resize-none outline-none

        text-sm sm:text-[15px] leading-relaxed
        font-mono

        bg-white dark:bg-gray-900
        text-gray-800 dark:text-gray-200

        p-3 sm:p-4 rounded-lg sm:rounded-xl
        border border-gray-200 dark:border-gray-700

        focus:ring-1 focus:ring-blue-300
        focus:border-blue-300

        shadow-sm
      "
                />
            </div>
        </div>
    );
}
