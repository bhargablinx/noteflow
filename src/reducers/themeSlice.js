import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: "theme",
    initialState: { theme: "light" },
    reducers: {
        toggleTheme: (state, action) => {
            // console.log(`Current Them: ${state.theme}`);
            state.theme == "light"
                ? (state.theme = "dark")
                : (state.theme = "light");
            // console.log(`New Them: ${state.theme}`);

            const html = document.querySelector("html");
            html.classList.remove("light", "dark");
            html.classList.add(state.theme);
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
