export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800">Noteflow</h1>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                + Add / Create Note
            </button>
        </header>
    );
}
