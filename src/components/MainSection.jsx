export default function MainSection() {
    return (
        <main className="flex-1 p-6 space-y-4 bg-gray-50 h-full overflow-y-auto">
            {/* Search */}
            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Search notes, tags, or content..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 
               bg-white shadow-sm focus:outline-none focus:ring-2 
               focus:ring-blue-500 focus:border-transparent transition"
                />

                {/* Icon */}
                <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </div>

            {/* Notes */}
            <div className="space-y-4">
                {/* Card */}
                <div className="bg-white p-4 rounded-xl shadow">
                    <h2 className="text-lg font-semibold">
                        Project Phoenix Brainstorm
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                        Project brainstorm content preview...
                    </p>

                    <div className="flex gap-2 mt-2">
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded">
                            #work
                        </span>
                        <span className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded">
                            #study
                        </span>
                        <span className="bg-red-100 text-red-600 px-2 py-1 text-xs rounded">
                            #personal
                        </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-2">
                        Last edited: 2 hours ago
                    </p>
                </div>
            </div>
        </main>
    );
}
