import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Layout1 from "./layout/Layout1";

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
                <Layout1 />
            </div>
        </div>
    );
}

export default App;
