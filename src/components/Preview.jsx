import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
    oneDark,
    oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export default function Preview({ title, tags, content }) {
    const { theme } = useContext(ThemeContext);

    return (
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
                            const language = match ? match[1] : "javascript";
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
    );
}
