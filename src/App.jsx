import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Layout1 from "./layout/Layout1";
import Layout2 from "./layout/Layout2";

function App() {
    const [selectedNote, setSelectedNote] = useState(null);

    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <Header />

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <Sidebar className="flex-1" />

                {/* Main Content */}
                <div className="flex-1">
                    {selectedNote ? (
                        <Layout2
                            selectedNote={selectedNote}
                            onBack={() => setSelectedNote(null)}
                            onSave={(updatedNote) => {
                                console.log("Save logic here", updatedNote);
                            }}
                        />
                    ) : (
                        <Layout1 onSelectNote={setSelectedNote} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
