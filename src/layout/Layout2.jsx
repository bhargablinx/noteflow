import { useState, useEffect, useContext, useRef } from "react";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
import { NotesContext } from "../context/NotesContext";
import Toolbar from "../components/Toolbar";
import { toggleWrapUtil } from "../components/Editor";

export default function Layout2({ selectedNote, onBack }) {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [content, setContent] = useState("");
    const { notes, setNotes } = useContext(NotesContext);
    const debounceRef = useRef(null);
    const isFirstLoad = useRef(true);
    const [saveStatus, setSaveStatus] = useState("idle");
    const textareaRef = useRef();
    const [history, setHistory] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const historyDebounceRef = useRef(null);
    const [isMoreOptOpen, setIsMoreOptOpen] = useState(false);

    useEffect(() => {
        if (!selectedNote?.id) return;

        setTitle(selectedNote.title || "");
        setTags((selectedNote.tags || []).join(", "));
        setContent(selectedNote.content || "");
    }, [selectedNote?.id]);

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return;
        }

        if (!selectedNote?.id) return;

        // show saving immediately when user types
        setSaveStatus("saving");

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            handleSave();
            setSaveStatus("saved");

            setTimeout(() => setSaveStatus("idle"), 1500);
        }, 500);

        return () => clearTimeout(debounceRef.current);
    }, [title, content, tags]);

    useEffect(() => {
        if (!selectedNote?.id) return;

        const initial = selectedNote.content || "";

        setHistory([initial]);
        setCurrentIndex(0);
    }, [selectedNote?.id]);

    const handleUndo = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            setContent(history[newIndex]);
        }
    };

    const handleRedo = () => {
        if (currentIndex < history.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            setContent(history[newIndex]);
        }
    };

    const scheduleHistorySave = (newContent) => {
        if (historyDebounceRef.current) {
            clearTimeout(historyDebounceRef.current);
        }

        historyDebounceRef.current = setTimeout(() => {
            setHistory((prevHistory) => {
                const trimmed = prevHistory.slice(0, currentIndex + 1);

                // prevent duplicate entries
                if (trimmed[trimmed.length - 1] === newContent) {
                    return trimmed;
                }

                const updated = [...trimmed, newContent];

                if (updated.length > 50) updated.shift();

                setCurrentIndex(updated.length - 1);

                return updated;
            });
        }, 600);
    };

    const updateContent = (value) => {
        const lastChar = value.slice(-1);

        setContent(value);

        // ✅ Save immediately on word boundary
        if (lastChar === " " || lastChar === "." || lastChar === "\n") {
            flushHistoryNow(value);
            return;
        }

        // otherwise debounce
        scheduleHistorySave(value);
    };

    const flushHistoryNow = (newContent) => {
        if (historyDebounceRef.current) {
            clearTimeout(historyDebounceRef.current);
        }

        setHistory((prevHistory) => {
            const trimmed = prevHistory.slice(0, currentIndex + 1);

            if (trimmed[trimmed.length - 1] === newContent) {
                return trimmed;
            }

            const updated = [...trimmed, newContent];

            if (updated.length > 50) updated.shift();

            setCurrentIndex(updated.length - 1);

            return updated;
        });
    };

    const saveToHistory = (newContent) => {
        if (historyDebounceRef.current) {
            clearTimeout(historyDebounceRef.current);
        }

        historyDebounceRef.current = setTimeout(() => {
            setHistory((prevHistory) => {
                const trimmed = prevHistory.slice(0, currentIndex + 1);

                // Avoid duplicate entries
                if (trimmed[trimmed.length - 1] === newContent) {
                    return trimmed;
                }

                const updated = [...trimmed, newContent];

                // limit history
                if (updated.length > 50) updated.shift();

                setCurrentIndex(updated.length - 1);

                return updated;
            });
        }, 600); // (500–800ms feels natural)
    };

    const handleSave = () => {
        setNotes((prevNotes) =>
            prevNotes.map((note) => {
                if (note.id !== selectedNote.id) return note;

                const newTags = tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean);

                // if nothing changed skip
                if (
                    note.title === title &&
                    note.content === content &&
                    JSON.stringify(note.tags) === JSON.stringify(newTags)
                ) {
                    return note;
                }

                return {
                    ...note,
                    title,
                    tags: newTags,
                    content,
                    lastEdited: new Date(),
                };
            }),
        );
    };

    const handleToolbarAction = (type) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        switch (type) {
            case "bold":
                flushHistoryNow(content);
                toggleWrapUtil(textarea, updateContent, "**");
                break;

            case "italic":
                flushHistoryNow(content);
                toggleWrapUtil(textarea, updateContent, "*");
                break;

            case "underline":
                toggleWrapUtil(textarea, updateContent, "<u>", "</u>");
                break;

            case "highlight":
                toggleWrapUtil(textarea, updateContent, "==");
                break;

            case "link":
                toggleWrapUtil(textarea, updateContent, "[", "](url)");
                break;

            case "image":
                toggleWrapUtil(textarea, updateContent, "![alt]", "(url)");
                break;

            case "h1":
                textarea.setRangeText(
                    "\n# ",
                    textarea.selectionStart,
                    textarea.selectionEnd,
                    "end",
                );
                updateContent(textarea.value);
                break;

            case "h2":
                textarea.setRangeText(
                    "\n## ",
                    textarea.selectionStart,
                    textarea.selectionEnd,
                    "end",
                );
                updateContent(textarea.value);
                break;

            case "h3":
                textarea.setRangeText(
                    "\n### ",
                    textarea.selectionStart,
                    textarea.selectionEnd,
                    "end",
                );
                updateContent(textarea.value);
                break;

            case "ul":
                textarea.setRangeText(
                    "\n- ",
                    textarea.selectionStart,
                    textarea.selectionEnd,
                    "end",
                );
                updateContent(textarea.value);
                break;

            case "ol":
                textarea.setRangeText(
                    "\n1. ",
                    textarea.selectionStart,
                    textarea.selectionEnd,
                    "end",
                );
                updateContent(textarea.value);
                break;

            case "checkbox":
                textarea.setRangeText(
                    "\n- [ ] ",
                    textarea.selectionStart,
                    textarea.selectionEnd,
                    "end",
                );
                updateContent(textarea.value);
                break;

            case "codeblock":
                toggleWrapUtil(textarea, updateContent, "\n```\n", "\n```");
                break;

            case "quote":
                textarea.setRangeText(
                    "> ",
                    textarea.selectionStart,
                    textarea.selectionEnd,
                    "end",
                );
                updateContent(textarea.value);
                break;

            case "divider":
                textarea.setRangeText(
                    "--- \n",
                    textarea.selectionStart,
                    textarea.selectionEnd,
                    "end",
                );
                updateContent(textarea.value);
                break;

            case "strike":
                toggleWrapUtil(textarea, updateContent, "~~", "~~");
                break;

            case "undo":
                handleUndo();
                break;

            case "redo":
                handleRedo();
                break;

            default:
                break;
        }

        textarea.focus(); // important
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-950">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b dark:border-gray-800">
                <button
                    onClick={onBack}
                    className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-white"
                >
                    ← Back
                </button>

                <span className="text-sm text-gray-400">
                    {saveStatus === "saving" && "Saving..."}
                    {saveStatus === "saved" && "Saved ✓"}
                </span>

                <div className="flex items-center gap-7">
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm"
                    >
                        Save
                    </button>
                    <div className="relative">
                        <button
                            onClick={() => setIsMoreOptOpen((prev) => !prev)}
                            className="text-gray-900 dark:text-gray-300 font-extrabold px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            ⋯
                        </button>

                        {isMoreOptOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 py-1">
                                {/* Download */}
                                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <i className="fa-solid fa-download"></i>
                                    Download
                                </button>

                                {/* Delete */}
                                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30">
                                    <i className="fa-solid fa-trash"></i>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Editor + Preview */}
            <div className="flex flex-1 overflow-hidden">
                {/* LEFT SIDE */}
                <div className="flex flex-col flex-1 min-w-0">
                    <div className="px-6 sticky top-0 z-10 bg-white dark:bg-gray-950">
                        <Toolbar onAction={handleToolbarAction} />
                    </div>

                    <Editor
                        title={title}
                        setTitle={setTitle}
                        tags={tags}
                        setTags={setTags}
                        content={content}
                        setContent={updateContent}
                        textareaRef={textareaRef}
                    />
                </div>

                {/* Divider */}
                <div className="w-px bg-gray-200 dark:bg-gray-800" />

                {/* RIGHT SIDE */}
                <Preview title={title} tags={tags} content={content} />
            </div>
        </div>
    );
}
