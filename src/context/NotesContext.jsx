import { createContext, useState } from "react";

export const NotesContext = createContext(null);

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([
        {
            id: 1,
            title: "Project Phoenix Brainstorm",
            descriptionPreview:
                "Brainstorm ideas for the new SaaS product. Focus on scalability, pricing model, and MVP features.",
            tags: ["#work", "#startup", "#ideas"],
            lastEdited: "2 hours ago",
        },
        {
            id: 2,
            title: "Weekly Grocery List",
            descriptionPreview:
                "Milk, eggs, bread, fruits, vegetables, and snacks for the week. Also check discounts.",
            tags: ["#personal", "#shopping"],
            lastEdited: "5 hours ago",
        },
        {
            id: 3,
            title: "Physics Study Notes",
            descriptionPreview:
                "Revise kinematics, laws of motion, and numerical problems for upcoming test.",
            tags: ["#study", "#physics"],
            lastEdited: "1 day ago",
        },
        {
            id: 4,
            title: "Meeting Minutes 10/26",
            descriptionPreview:
                "Discussed sprint progress, blockers, and next steps. Assigned tasks to team members.",
            tags: ["#work", "#meeting"],
            lastEdited: "2 days ago",
        },
    ]);

    return (
        <NotesContext.Provider value={{ notes, setNotes }}>
            {children}
        </NotesContext.Provider>
    );
};
