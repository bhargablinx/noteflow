export default function Toolbar({ onAction }) {
    const baseBtn =
        "flex items-center justify-center w-9 h-9 rounded-md text-gray-600 hover:bg-gray-200 hover:text-black transition";

    return (
        <div className="flex items-center gap-1 border-b px-3 py-2 bg-white shadow-sm">
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
                <span className="bg-yellow-200 px-1 rounded">H</span>
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Media */}
            <button className={baseBtn} onClick={() => onAction("link")}>
                <i className="fa-solid fa-link"></i>
            </button>
            <button className={baseBtn} onClick={() => onAction("image")}>
                <i className="fa-regular fa-image"></i>
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Lists */}
            <button className={baseBtn} onClick={() => onAction("ul")}>
                <i className="fa-solid fa-list"></i>
            </button>
            <button className={baseBtn} onClick={() => onAction("ol")}>
                <i className="fa-solid fa-list-ol"></i>
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Headings */}
            <button className={baseBtn} onClick={() => onAction("h1")}>
                <span className="font-semibold">H1</span>
            </button>
            <button className={baseBtn} onClick={() => onAction("h2")}>
                <span className="font-semibold">H2</span>
            </button>
            <button className={baseBtn} onClick={() => onAction("h3")}>
                <span className="font-semibold">H3</span>
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Checkbox */}
            <button className={baseBtn} onClick={() => onAction("checkbox")}>
                <i className="fa-solid fa-check"></i>
            </button>

            {/* Code */}
            <button className={baseBtn} onClick={() => onAction("codeblock")}>
                <i class="fa-solid fa-code"></i>
            </button>

            {/* Quote */}
            <button className={baseBtn} onClick={() => onAction("quote")}>
                <i class="fa-solid fa-quote-left"></i>
            </button>

            {/* Divider */}
            <button className={baseBtn} onClick={() => onAction("divider")}>
                ⎯⎯
            </button>

            {/* Strikethrough */}
            <button className={baseBtn} onClick={() => onAction("strike")}>
                <i class="fa-solid fa-strikethrough"></i>
            </button>
        </div>
    );
}
