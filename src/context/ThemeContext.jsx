import { createContext, useState } from "react";

// context
export const ThemeContext = createContext(null);

// provider
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
