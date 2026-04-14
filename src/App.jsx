import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainSection from "./components/MainSection";

function App() {
    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <Header />

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <MainSection />
            </div>
        </div>
    );
}

export default App;
