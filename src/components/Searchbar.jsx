export default function Searchbar() {
    return (
        <>
            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Search notes, tags, or content..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-900 
        text-gray-800 dark:text-gray-200 
        placeholder-gray-400 dark:placeholder-gray-500
        shadow-sm focus:outline-none focus:ring-2 
        focus:ring-blue-500 focus:border-transparent 
        transition-colors duration-300"
                />

                {/* Icon */}
                <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </div>
        </>
    );
}
