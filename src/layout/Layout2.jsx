import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";

export default function Layout2({ selectedNote, onSave }) {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [content, setContent] = useState("");

    const handleSave = () => {
        const updatedNote = {
            ...selectedNote,
            title,
            tags: tags.split(",").map((tag) => tag.trim()),
            content,
        };

        onSave(updatedNote);
    };

    useEffect(() => {
        if (selectedNote) {
            setTitle(selectedNote.title);
            setTags(selectedNote.tags.join(", "));
            setContent(selectedNote.content);
        }
    }, [selectedNote]);

    return (
        <div className="flex h-full">
            {/* Left - Editor */}
            <div className="w-1/2 p-4 border-r flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2 border rounded"
                />

                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="p-2 border rounded"
                />

                <textarea
                    placeholder="Write markdown..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 p-2 border rounded"
                />
            </div>

            {/* Right - Preview */}
            <div className="w-1/2 p-4 overflow-y-auto">
                <h1 className="text-2xl font-bold">{title}</h1>

                <div className="text-sm text-gray-500 mb-4">{tags}</div>

                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>
    );
}
