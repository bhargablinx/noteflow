import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "../reducers/themeSlice";
// import { notesSlice } from "../reducers/notesSlice";

export const store = configureStore({
    reducer: {
        theme: themeSlice,
        // notes: notesSlice,
    },
});
