const helper = () => {
    function truncateText(text: string, maxLength: number): string {
        if (text.length <= maxLength) {
            return text; // Return the original text if it's within or equal to the limit
        } else {
            const truncatedText = text.substring(0, maxLength).trim();
            return `${truncatedText}...`;
        }
    }
    return {
        truncateText
    }
}

export default helper