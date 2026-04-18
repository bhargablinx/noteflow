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
                toggleWrapUtil(textarea, setContent, "**");
                break;

            case "italic":
                toggleWrapUtil(textarea, setContent, "*");
                break;

            case "underline":
                toggleWrapUtil(textarea, setContent, "<u>", "</u>");
                break;

            case "highlight":
                toggleWrapUtil(textarea, setContent, "==");
                break;

            case "link":
                toggleWrapUtil(textarea, setContent, "[", "](url)");
                break;

            case "image":
                toggleWrapUtil(textarea, setContent, "![alt]", "(url)");
                break;

            case "h1":
                textarea.setRangeText(
                    "\n# ",
                    textarea.selectionStart,
                    textarea.selectionEnd,
                    "end",
                );
                setContent(textarea.value);
                break;

            case "h2":
                textarea.setRangeText(
                    "\n## ",
                    textarea.selectionStart,
                    textarea.selectionEnd,
                    "end",
                );
                setContent(textarea.value);
                break;

            case "h3":
                textarea.setRangeText(
                    "\n### ",
                    textarea.selectionStart,
                    textarea.selectionEnd,
                    "end",
                );
                setContent(textarea.value);
                break;

            case "ul":
                textarea.setRangeText(
                    "\n- ",
                    textarea.selectionStart,
                    textarea.selectionEnd,
                    "end",
                );
                setContent(textarea.value);
                break;

            case "ol":
                textarea.setRangeText(
                    "\n1. ",
                    textarea.selectionStart,
                    textarea.selectionEnd,
                    "end",
                );
                setContent(textarea.value);
                break;

            case "checkbox":
                textarea.setRangeText(
                    "\n- [ ] ",
                    textarea.selectionStart,
                    textarea.selectionEnd,
                    "end",
                );
                setContent(textarea.value);
                break;

            case "codeblock":
                toggleWrapUtil(textarea, setContent, "\n```\n", "\n```");
                break;

            case "quote":
                textarea.setRangeText(
                    "> ",
                    textarea.selectionStart,
                    textarea.selectionEnd,
                    "end",
                );
                setContent(textarea.value);
                break;

            case "divider":
                textarea.setRangeText(
                    "--- \n",
                    textarea.selectionStart,
                    textarea.selectionEnd,
                    "end",
                );
                setContent(textarea.value);
                break;

            case "strike":
                toggleWrapUtil(textarea, setContent, "~~", "~~");
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

                <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm"
                >
                    Save
                </button>
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
                        setContent={setContent}
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
