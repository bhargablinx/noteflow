import { createContext, useState } from "react";

export const NotesContext = createContext(null);

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([
        {
            id: 1,
            title: "Morning Routine Ideas",
            content:
                "Wake up at 6 AM, stretch, drink water, and review daily goals. Try journaling for 10 minutes.",
            tags: ["#personal", "#habits"],
            lastEdited: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 min ago
        },
        {
            id: 2,
            title: "React Notes",
            content:
                "Hooks: useState, useEffect, useRef.\n\nRemember: state updates are async.\n\nPractice building small components.",
            tags: ["#coding", "#react"],
            lastEdited: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: 3,
            title: "Markdown Test",
            content:
                "# Heading\n\n**Bold text**\n*Italic text*\n\n- List item 1\n- List item 2\n\n`inline code`\n\n```js\nconsole.log('Hello world');\n```",
            tags: ["#test", "#markdown"],
            lastEdited: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: 4,
            title: "Empty Note",
            content: "",
            tags: [],
            lastEdited: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        },
        {
            id: 5,
            title: "Workout Plan",
            content:
                "Monday: Chest + Triceps\nTuesday: Back + Biceps\nWednesday: Legs\n\nRepeat with progressive overload.",
            tags: ["#fitness"],
            lastEdited: new Date(
                Date.now() - 12 * 60 * 60 * 1000,
            ).toISOString(),
        },
        {
            id: 6,
            title: "Random Thoughts",
            content:
                "What if I build a note-taking app with offline sync + cloud backup + AI summaries?",
            tags: ["#ideas"],
            lastEdited: new Date(
                Date.now() - 1 * 24 * 60 * 60 * 1000,
            ).toISOString(),
        },
        {
            id: 7,
            title: "Bug Reproduction Steps",
            content:
                "1. Open app\n2. Click on note\n3. Press Ctrl+B without selection\n\nExpected: ****\nActual: **bold** inserted",
            tags: ["#bug", "#dev"],
            lastEdited: new Date(
                Date.now() - 2 * 24 * 60 * 60 * 1000,
            ).toISOString(),
        },
        {
            id: 8,
            title: "Books to Read",
            content:
                "Atomic Habits\nDeep Work\nClean Code\nThe Pragmatic Programmer",
            tags: ["#reading"],
            lastEdited: new Date(
                Date.now() - 3 * 24 * 60 * 60 * 1000,
            ).toISOString(),
        },
        {
            id: 9,
            title: "Long Note Stress Test",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(
                    20,
                ),
            tags: ["#test", "#performance"],
            lastEdited: new Date(
                Date.now() - 4 * 24 * 60 * 60 * 1000,
            ).toISOString(),
        },
        {
            id: 10,
            title: "Meeting with Design Team",
            content:
                "Discuss UI improvements:\n- Better spacing\n- Improved sidebar UX\n- Animations for note selection",
            tags: ["#work", "#design"],
            lastEdited: new Date(
                Date.now() - 5 * 24 * 60 * 60 * 1000,
            ).toISOString(),
        },
    ]);

    const [flashNoteIndex, setFlashNoteIndex] = useState(null);

    return (
        <NotesContext.Provider
            value={{ notes, setNotes, flashNoteIndex, setFlashNoteIndex }}
        >
            {children}
        </NotesContext.Provider>
    );
};
