import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
    name: "notes",
    initialState: { allNotes: [] },
    reducers: {
        addNote: (state, action) => console.log("Noteflow"),
        deleteNote: (state, action) => console.log("Noteflow"),
    },
});

export const { addNote, deleteNote } = notesSlice.actions;

export default notesSlice.reducer;
