import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
    oneDark,
    oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Layout2({ selectedNote, onSave, onBack }) {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [content, setContent] = useState("");
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (selectedNote) {
            setTitle(selectedNote.title);
            setTags(selectedNote.tags.join(", "));
            setContent(selectedNote.content);
        }
    }, [selectedNote]);

    const handleSave = () => {
        const updatedNote = {
            ...selectedNote,
            title,
            tags: tags.split(",").map((t) => t.trim()),
            content,
        };
        onSave(updatedNote);
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
                <div className="flex-1 min-w-0 px-6 py-4 flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Untitled note..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-2xl font-semibold bg-transparent outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Add tags (comma separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="text-sm text-gray-500 bg-transparent outline-none"
                    />

                    <textarea
                        placeholder="Start writing in markdown..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="flex-1 bg-transparent outline-none resize-none text-gray-800 dark:text-gray-200 leading-relaxed"
                    />
                </div>

                {/* Divider */}
                <div className="w-px bg-gray-200 dark:bg-gray-800" />

                {/* Preview */}
                <div className="flex-1 min-w-0 px-6 py-4 overflow-y-auto">
                    <div
                        className="
                            prose dark:prose-invert max-w-none
                        
                            prose-p:my-2 prose-p:text-[15px]
                            prose-li:my-1
                        
                            font-sans  leading-relaxed
                            prose-p:leading-relaxed
                            prose-li:leading-relaxed
                            prose-headings:leading-tight  prose-headings:mt-5  prose-headings:mb-2  prose-headings:font-semibold

                            prose-h1:text-3xl
                            prose-h2:text-2xl
                            prose-h3:text-xl
                            
                            prose-p:text-gray-700 dark:prose-p:text-gray-300
                            prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                            prose-code:font-mono
                            prose-code:bg-gray-100 dark:prose-code:bg-gray-800
                            prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
                    >
                        <h1 className="mb-2">{title || "Untitled note"}</h1>
                        <p className="text-sm text-gray-400 mb-5">{tags}</p>

                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code({ inline, className, children }) {
                                    const match = /language-(\w+)/.exec(
                                        className || "",
                                    );
                                    const language = match
                                        ? match[1]
                                        : "javascript";
                                    const codeString = String(children).replace(
                                        /\n$/,
                                        "",
                                    );

                                    // INLINE CODE
                                    if (inline) {
                                        return (
                                            <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                                                {children}
                                            </code>
                                        );
                                    }

                                    // BLOCK CODE
                                    return (
                                        <div
                                            className="
    my-4 rounded-lg overflow-hidden
    border border-gray-200 dark:border-gray-700
    bg-gray-50 dark:bg-gray-900
"
                                        >
                                            {/* Header */}
                                            <div
                                                className="
        flex items-center justify-between px-3 py-1 text-xs
        bg-gray-100 dark:bg-gray-800
        border-b border-gray-200 dark:border-gray-700
    "
                                            >
                                                <span className="uppercase text-gray-500 dark:text-gray-400">
                                                    {language}
                                                </span>

                                                <i
                                                    onClick={() =>
                                                        navigator.clipboard.writeText(
                                                            codeString,
                                                        )
                                                    }
                                                    className="fa-regular fa-copy text-sm text-gray-500 hover:text-black dark:hover:text-white cursor-pointer"
                                                />
                                            </div>

                                            {/* Code */}
                                            <SyntaxHighlighter
                                                style={
                                                    theme === "dark"
                                                        ? oneDark
                                                        : oneLight
                                                }
                                                language={language}
                                                PreTag="div"
                                                showLineNumbers
                                                customStyle={{
                                                    margin: 0,
                                                    padding: "16px",
                                                    background:
                                                        theme === "dark"
                                                            ? "#111827"
                                                            : "#ffffff",
                                                }}
                                            >
                                                {codeString}
                                            </SyntaxHighlighter>
                                        </div>
                                    );
                                },
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
}
