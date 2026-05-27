import { useRef, useState, useCallback } from "react";

export function useEditorHistory(initialContent = "") {
    const [history, setHistory] = useState([initialContent]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const historyDebounceRef = useRef(null);

    const pushHistory = useCallback(
        (newContent) => {
            setHistory((prevHistory) => {
                const trimmed = prevHistory.slice(0, currentIndex + 1);

                // prevent duplicates
                if (trimmed[trimmed.length - 1] === newContent) {
                    return trimmed;
                }

                const updated = [...trimmed, newContent];

                // limit history
                if (updated.length > 50) {
                    updated.shift();
                }

                setCurrentIndex(updated.length - 1);

                return updated;
            });
        },
        [currentIndex],
    );

    const scheduleHistorySave = useCallback(
        (newContent) => {
            if (historyDebounceRef.current) {
                clearTimeout(historyDebounceRef.current);
            }

            historyDebounceRef.current = setTimeout(() => {
                pushHistory(newContent);
            }, 600);
        },
        [pushHistory],
    );

    const flushHistoryNow = useCallback(
        (newContent) => {
            if (historyDebounceRef.current) {
                clearTimeout(historyDebounceRef.current);
            }

            pushHistory(newContent);
        },
        [pushHistory],
    );

    const handleUndo = useCallback(
        (setContent) => {
            if (currentIndex > 0) {
                const newIndex = currentIndex - 1;

                setCurrentIndex(newIndex);
                setContent(history[newIndex]);
            }
        },
        [currentIndex, history],
    );

    const handleRedo = useCallback(
        (setContent) => {
            if (currentIndex < history.length - 1) {
                const newIndex = currentIndex + 1;

                setCurrentIndex(newIndex);
                setContent(history[newIndex]);
            }
        },
        [currentIndex, history],
    );

    const resetHistory = useCallback((content = "") => {
        setHistory([content]);
        setCurrentIndex(0);
    }, []);

    return {
        history,
        currentIndex,
        scheduleHistorySave,
        flushHistoryNow,
        handleUndo,
        handleRedo,
        resetHistory,
    };
}
