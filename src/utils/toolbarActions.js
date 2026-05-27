import { toggleWrapUtil } from "../components/Editor";

export const toolbarActions = ({
    type,
    textarea,
    content,
    updateContent,
    flushHistoryNow,
    handleUndo,
    handleRedo,
}) => {
    if (!textarea) return;

    const actions = {
        bold: () => {
            flushHistoryNow(content);
            toggleWrapUtil(textarea, updateContent, "**");
        },

        italic: () => {
            flushHistoryNow(content);
            toggleWrapUtil(textarea, updateContent, "*");
        },

        underline: () => {
            toggleWrapUtil(textarea, updateContent, "<u>", "</u>");
        },

        highlight: () => {
            toggleWrapUtil(textarea, updateContent, "==");
        },

        link: () => {
            toggleWrapUtil(textarea, updateContent, "[", "](url)");
        },

        image: () => {
            toggleWrapUtil(textarea, updateContent, "![alt]", "(url)");
        },

        h1: () => {
            textarea.setRangeText(
                "\n# ",
                textarea.selectionStart,
                textarea.selectionEnd,
                "end",
            );

            updateContent(textarea.value);
        },

        h2: () => {
            textarea.setRangeText(
                "\n## ",
                textarea.selectionStart,
                textarea.selectionEnd,
                "end",
            );

            updateContent(textarea.value);
        },

        h3: () => {
            textarea.setRangeText(
                "\n### ",
                textarea.selectionStart,
                textarea.selectionEnd,
                "end",
            );

            updateContent(textarea.value);
        },

        ul: () => {
            textarea.setRangeText(
                "\n- ",
                textarea.selectionStart,
                textarea.selectionEnd,
                "end",
            );

            updateContent(textarea.value);
        },

        ol: () => {
            textarea.setRangeText(
                "\n1. ",
                textarea.selectionStart,
                textarea.selectionEnd,
                "end",
            );

            updateContent(textarea.value);
        },

        checkbox: () => {
            textarea.setRangeText(
                "\n- [ ] ",
                textarea.selectionStart,
                textarea.selectionEnd,
                "end",
            );

            updateContent(textarea.value);
        },

        codeblock: () => {
            toggleWrapUtil(textarea, updateContent, "\n```\n", "\n```");
        },

        quote: () => {
            textarea.setRangeText(
                "> ",
                textarea.selectionStart,
                textarea.selectionEnd,
                "end",
            );

            updateContent(textarea.value);
        },

        divider: () => {
            textarea.setRangeText(
                "--- \n",
                textarea.selectionStart,
                textarea.selectionEnd,
                "end",
            );

            updateContent(textarea.value);
        },

        strike: () => {
            toggleWrapUtil(textarea, updateContent, "~~", "~~");
        },

        undo: () => {
            handleUndo();
        },

        redo: () => {
            handleRedo();
        },
    };

    actions[type]?.();

    textarea.focus();
};
