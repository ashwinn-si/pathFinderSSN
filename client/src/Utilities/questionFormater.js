const questionFormater = (input) => {
    const lines = input.trim().split("\n");

    // Extract question
    const question = lines[0].trim();

    // Extract options in the required format
    const options = [];
    for (let i = 1; i <= 4; i++) {
        const match = lines[i].match(/^([A-D])\)\s(.+)/);
        if (match) {
            options.push({ id: match[1].toLowerCase(), text: match[2] });
        }
    }

    // Extract answer
    const answerLine = lines.find(line => line.trim().toLowerCase().startsWith("answer:"));
    let answer = null;
    if (answerLine) {
        const answerMatch = answerLine.match(/Answer:\s*([A-D])\)\s*(.+)/i);
        if (answerMatch) {
            answer = { id: answerMatch[1].toLowerCase(), text: answerMatch[2] };
        }
    }

    return { question, options, answer };
}
export default questionFormater;