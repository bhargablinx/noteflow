import { useEffect, useRef, useState } from "react";

export function useAutosave(callback, dependencies, delay = 500) {
    const debounceRef = useRef(null);

    const [saveStatus, setSaveStatus] = useState("idle");

    useEffect(() => {
        setSaveStatus("saving");

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            callback();

            setSaveStatus("saved");

            setTimeout(() => {
                setSaveStatus("idle");
            }, 1500);
        }, delay);

        return () => clearTimeout(debounceRef.current);
    }, dependencies);

    return {
        saveStatus,
    };
}
