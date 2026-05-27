import { useContext, useEffect, useRef, useState } from "react";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
import Toolbar from "../components/Toolbar";
import { NotesContext } from "../context/NotesContext";
import { useAutosave } from "../hooks/useAutosave";
import { useEditorHistory } from "../hooks/useEditorHistory";
import { toolbarActions } from "../utils/toolbarActions";
import NotePDF from "../components/NotePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function SelectedNoteLayout({ selectedNote, onBack }) {
    const { setNotes, deleteNotes } = useContext(NotesContext);
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [content, setContent] = useState("");
    const [isMoreOptOpen, setIsMoreOptOpen] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const textareaRef = useRef();

    const {
        scheduleHistorySave,
        flushHistoryNow,
        handleUndo,
        handleRedo,
        resetHistory,
    } = useEditorHistory();

    useEffect(() => {
        if (!selectedNote?.id) return;

        setTitle(selectedNote.title || "");
        setTags((selectedNote.tags || []).join(", "));
        setContent(selectedNote.content || "");

        resetHistory(selectedNote.content || "");
    }, [selectedNote]);

    const handleSave = () => {
        setNotes((prevNotes) => {
            const newTags = tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean);

            const existing = prevNotes.find(
                (note) => note.id === selectedNote.id,
            );

            const updatedNote = {
                ...existing,
                title,
                content,
                tags: newTags,
                lastEdited: new Date().toISOString(),
            };

            const filtered = prevNotes.filter(
                (note) => note.id !== selectedNote.id,
            );

            return [updatedNote, ...filtered];
        });
    };

    const { saveStatus } = useAutosave(handleSave, [title, content, tags], 500);

    const updateContent = (value) => {
        const lastChar = value.slice(-1);
        setContent(value);

        if (lastChar === " " || lastChar === "." || lastChar === "\n") {
            flushHistoryNow(value);
            return;
        }

        scheduleHistorySave(value);
    };

    const handleToolbarAction = (type) => {
        toolbarActions({
            type,
            textarea: textareaRef.current,
            content,
            updateContent,
            flushHistoryNow,
            handleUndo: () => handleUndo(setContent),
            handleRedo: () => handleRedo(setContent),
        });
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm("Delete this note?");
        if (!confirmDelete) return;
        deleteNotes(selectedNote);
    };

    const handleDownloadRaw = () => {
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${title || "note"}.md`;
        a.click();

        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-950">
            {/* Top Bar */}
            <div
                className="
      flex items-center justify-between 
      px-3 sm:px-4 md:px-6 
      py-2.5 sm:py-3 
      border-b dark:border-gray-800
    "
            >
                <button
                    onClick={onBack}
                    className="text-xs sm:text-sm text-gray-500 hover:text-gray-800 dark:hover:text-white"
                >
                    ← Back
                </button>

                <span className="text-xs sm:text-sm text-gray-400">
                    {saveStatus === "saving" && "Saving..."}
                    {saveStatus === "saved" && "Saved ✓"}
                </span>

                <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
                    {/* NEW: Preview toggle button (mobile only) */}
                    <button
                        onClick={() => setShowPreview((prev) => !prev)}
                        className="md:hidden text-xs sm:text-sm px-2 py-1 rounded bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                    >
                        {showPreview ? "Edit" : "Preview"}
                    </button>

                    <button
                        onClick={handleSave}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white 
        px-2 sm:px-3 md:px-4 
        py-1 sm:py-1.5 
        rounded-lg text-xs sm:text-sm"
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
                                <button
                                    onClick={handleDownloadRaw}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <i className="fa-solid fa-download"></i>
                                    Download{" "}
                                    <span className="text-gray-500 font-bold">
                                        (raw)
                                    </span>
                                </button>

                                <PDFDownloadLink
                                    document={
                                        <NotePDF
                                            title={title}
                                            content={content}
                                        />
                                    }
                                    fileName={`${title || "note"}.pdf`}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    {({ loading }) => (
                                        <>
                                            <i className="fa-solid fa-download"></i>

                                            {loading ? (
                                                "Generating PDF..."
                                            ) : (
                                                <>
                                                    Download{" "}
                                                    <span className="text-gray-500 font-bold">
                                                        (pdf)
                                                    </span>
                                                </>
                                            )}
                                        </>
                                    )}
                                </PDFDownloadLink>

                                <button
                                    onClick={handleDelete}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                                >
                                    <i className="fa-solid fa-trash"></i>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Editor + Preview */}
            <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
                {/* LEFT SIDE */}
                <div className="flex flex-col flex-1 min-w-0">
                    <div className="px-3 sm:px-4 md:px-6 sticky top-0 z-10 bg-white dark:bg-gray-950">
                        <Toolbar onAction={handleToolbarAction} />
                    </div>

                    {/* NEW: Conditional render for mobile */}
                    <div className="flex-1 min-h-0">
                        <div className="md:hidden h-full">
                            {showPreview ? (
                                <div className="h-full overflow-auto">
                                    <Preview
                                        title={title}
                                        tags={tags}
                                        content={content}
                                    />
                                </div>
                            ) : (
                                <Editor
                                    title={title}
                                    setTitle={setTitle}
                                    tags={tags}
                                    setTags={setTags}
                                    content={content}
                                    setContent={updateContent}
                                    textareaRef={textareaRef}
                                />
                            )}
                        </div>

                        {/* Desktop always shows editor */}
                        <div className="hidden md:block h-full">
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
                    </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px bg-gray-200 dark:bg-gray-800" />

                {/* RIGHT SIDE (desktop only) */}
                <div className="hidden md:block flex-1 min-w-0 overflow-auto">
                    <Preview title={title} tags={tags} content={content} />
                </div>
            </div>
        </div>
    );
}
