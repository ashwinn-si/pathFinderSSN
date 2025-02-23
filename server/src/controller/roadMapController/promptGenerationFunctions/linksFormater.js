function linksFormater(input){
    return input
        .split("\n") // Split by newline to get individual lines
        .map(line => {
            let parts = line.split(" - "); // Split by " - " to separate title and link
            if (parts.length < 2) return null; // Skip if the format is incorrect
            return { topic: parts[0].replace(/^\d+\.\s*/, "").trim(), link: parts[1].trim() };
        })
        .filter(item => item !== null);
}

module.exports = linksFormater;