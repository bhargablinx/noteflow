export default function Toolbar({ onAction }) {
    return (
        <div className="flex gap-2 border-b p-2 bg-gray-50">
            <button onClick={() => onAction("bold")}>B</button>
            <button onClick={() => onAction("italic")}>I</button>
            <button onClick={() => onAction("underline")}>U</button>
            <button onClick={() => onAction("highlight")}>H</button>
            <button onClick={() => onAction("link")}>🔗</button>
            <button onClick={() => onAction("image")}>🖼️</button>
            <button onClick={() => onAction("ul")}>• List</button>
            <button onClick={() => onAction("ol")}>1. List</button>
            <button onClick={() => onAction("h1")}>H1</button>
            <button onClick={() => onAction("h2")}>H2</button>
            <button onClick={() => onAction("checkbox")}>☑</button>
        </div>
    );
}
