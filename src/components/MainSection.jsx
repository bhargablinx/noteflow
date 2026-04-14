export default function MainSection() {
    return (
        <main className="flex-1 p-6 space-y-4 bg-gray-50 h-full overflow-y-auto">
            {/* Search */}
            <input
                type="text"
                placeholder="Search and filter notes..."
                className="w-full p-3 border rounded-lg"
            />

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
