import { useState } from "react";

export default function Toolbar({ onAction }) {
    const [open, setOpen] = useState(false);

    const baseBtn =
        "flex items-center justify-center w-9 h-9 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white transition";

    return (
        <div className="flex items-center gap-1 border-b px-2 sm:px-3 py-2 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-sm overflow-x-auto whitespace-nowrap">
            {/* Text styles */}
            <button className={baseBtn} onClick={() => onAction("bold")}>
                <b>B</b>
            </button>
            <button className={baseBtn} onClick={() => onAction("italic")}>
                <i>I</i>
            </button>
            <button className={baseBtn} onClick={() => onAction("underline")}>
                <u>U</u>
            </button>
            <button className={baseBtn} onClick={() => onAction("highlight")}>
                <span className="bg-yellow-200 dark:bg-yellow-500/40 px-1 rounded">
                    H
                </span>
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1 shrink-0" />

            {/* Media */}
            <button className={baseBtn} onClick={() => onAction("link")}>
                <i className="fa-solid fa-link"></i>
            </button>
            <button className={baseBtn} onClick={() => onAction("image")}>
                <i className="fa-regular fa-image"></i>
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1 shrink-0" />

            {/* Lists */}
            <button className={baseBtn} onClick={() => onAction("ul")}>
                <i className="fa-solid fa-list"></i>
            </button>
            <button className={baseBtn} onClick={() => onAction("ol")}>
                <i className="fa-solid fa-list-ol"></i>
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1 shrink-0" />

            {/* Code */}
            <button className={baseBtn} onClick={() => onAction("codeblock")}>
                <i className="fa-solid fa-code"></i>
            </button>

            {/* Quote */}
            <button className={baseBtn} onClick={() => onAction("quote")}>
                <i className="fa-solid fa-quote-left"></i>
            </button>

            {/* Undo */}
            <button className={baseBtn} onClick={() => onAction("undo")}>
                <i className="fa-solid fa-rotate-left"></i>
            </button>

            {/* Redo */}
            <button className={baseBtn} onClick={() => onAction("redo")}>
                <i className="fa-solid fa-rotate-right"></i>
            </button>

            {/* MORE MENU */}
            <div className="relative shrink-0">
                <button className={baseBtn} onClick={() => setOpen(!open)}>
                    ⋯
                </button>

                {open && (
                    <div className="absolute right-0 mt-2 w-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2 sm:p-3 z-50 flex flex-wrap gap-2">
                        <button
                            className={baseBtn}
                            onClick={() => onAction("h1")}
                        >
                            <span className="font-semibold text-sm">H1</span>
                        </button>
                        <button
                            className={baseBtn}
                            onClick={() => onAction("h2")}
                        >
                            <span className="font-semibold text-sm">H2</span>
                        </button>
                        <button
                            className={baseBtn}
                            onClick={() => onAction("h3")}
                        >
                            <span className="font-semibold text-sm">H3</span>
                        </button>

                        <button
                            className={baseBtn}
                            onClick={() => onAction("checkbox")}
                        >
                            <i className="fa-solid fa-check"></i>
                        </button>

                        <button
                            className={baseBtn}
                            onClick={() => onAction("divider")}
                        >
                            ⎯⎯
                        </button>

                        <button
                            className={baseBtn}
                            onClick={() => onAction("strike")}
                        >
                            <i className="fa-solid fa-strikethrough"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
