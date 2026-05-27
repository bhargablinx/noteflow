export function getSnippet(text, query) {
    if (!text) return "";
    if (!query) return text.slice(0, 150);

    const lowerText = text.toLowerCase();
    const words = query.toLowerCase().split(" ").filter(Boolean);

    const index = words
        .map((word) => lowerText.indexOf(word))
        .find((i) => i !== -1);

    if (index === undefined) return text.slice(0, 150);

    const SNIPPET_BEFORE = 40;
    const SNIPPET_AFTER = 100;

    let start = Math.max(0, index - SNIPPET_BEFORE);
    let end = Math.min(text.length, index + SNIPPET_AFTER);

    // Adjust to word boundaries
    while (start > 0 && text[start] !== " ") start--;
    while (end < text.length && text[end] !== " ") end++;

    let snippet = text.slice(start, end);

    if (start > 0) snippet = "..." + snippet;
    if (end < text.length) snippet += "...";

    return snippet;
}
