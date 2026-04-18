import { useState, useEffect, useContext, useRef } from "react";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
import { NotesContext } from "../context/NotesContext";

export default function Layout2({ selectedNote, onBack }) {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [content, setContent] = useState("");
    const { notes, setNotes } = useContext(NotesContext);
    const debounceRef = useRef(null);
    const isFirstLoad = useRef(true);
    const [saveStatus, setSaveStatus] = useState("idle");

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
                {/* Editor */}
                <Editor
                    title={title}
                    setTitle={setTitle}
                    tags={tags}
                    setTags={setTags}
                    content={content}
                    setContent={setContent}
                />

                {/* Divider */}
                <div className="w-px bg-gray-200 dark:bg-gray-800" />

                {/* Preview */}
                <Preview title={title} tags={tags} content={content} />
            </div>
        </div>
    );
}
