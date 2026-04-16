import { useState, useEffect } from "react";

export default function Layout2({ selectedNote }) {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [content, setContent] = useState("");

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
            <div className="w-1/2 p-4">
                <h2>Preview</h2>
            </div>
        </div>
    );
}
