import { createContext, useState } from "react";

// context
export const ThemeContext = createContext(null);

// provider
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
