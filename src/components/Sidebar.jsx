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
        <aside className="w-64 bg-gray-100 dark:bg-gray-900 h-full p-4 transition-colors duration-300">
            <ul className="space-y-2">
                {notes.map((note, index) => (
                    <li
                        key={index}
                        className="p-2 rounded-lg cursor-pointer 
                hover:bg-gray-200 dark:hover:bg-gray-800 
                text-gray-800 dark:text-gray-200 
                transition-colors duration-200"
                    >
                        {note}
                    </li>
                ))}
            </ul>
        </aside>
    );
}
