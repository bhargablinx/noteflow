const notes = [
    "Project Phoenix Brainstorm",
    "Weekly Grocery List",
    "Physics Study Notes",
    "Meeting Minutes 10/26",
    "Vacation Ideas",
    "Code Snippets",
];

export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-100 h-full p-4">
            <ul className="space-y-2">
                {notes.map((note, index) => (
                    <li
                        key={index}
                        className="p-2 rounded-lg cursor-pointer hover:bg-gray-200"
                    >
                        {note}
                    </li>
                ))}
            </ul>
        </aside>
    );
}
