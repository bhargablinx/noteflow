import { useState } from "react";

export default function CreateNoteModal({ isOpen, onClose, onSave }) {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [content, setContent] = useState("");

    if (!isOpen) return null;

    const handleSave = () => {
        const newNote = {
            id: Date.now(),
            title,
            tags: tags.split(",").map((tag) => tag.trim()),
            content,
            lastEdited: new Date().toLocaleString(),
        };

        onSave(newNote);

        // reset fields
        setTitle("");
        setTags("");
        setContent("");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-lg p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                        Create Note
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 text-lg"
                    >
                        ✕
                    </button>
                </div>

                {/* Title */}
                <input
                    type="text"
                    placeholder="Note Title"
                    className="w-full mb-3 px-3 py-2 border rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     dark:bg-gray-800 dark:text-white dark:border-gray-700"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* Tags */}
                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    className="w-full mb-3 px-3 py-2 border rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     dark:bg-gray-800 dark:text-white dark:border-gray-700"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />

                {/* Content */}
                <textarea
                    rows="5"
                    placeholder="Write your note..."
                    className="w-full mb-4 px-3 py-2 border rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     dark:bg-gray-800 dark:text-white dark:border-gray-700"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                {/* Actions */}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Save Note
                    </button>
                </div>
            </div>
        </div>
    );
}
