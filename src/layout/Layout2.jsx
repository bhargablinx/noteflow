import { useState, useEffect, useContext } from "react";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
import { NotesContext } from "../context/NotesContext";

export default function Layout2({ selectedNote, onBack }) {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [content, setContent] = useState("");
    const { notes, setNotes } = useContext(NotesContext);

    useEffect(() => {
        if (!selectedNote) return;

        setTitle(selectedNote.title || "");
        setTags((selectedNote.tags || []).join(", "));
        setContent(selectedNote.content || "");
    }, [selectedNote?.id]);

    const handleSave = () => {
        setNotes((prevNotes) =>
            prevNotes.map((note) => {
                if (note.id !== selectedNoteId) return note;

                return {
                    ...note,
                    title,
                    tags: tags
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
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
