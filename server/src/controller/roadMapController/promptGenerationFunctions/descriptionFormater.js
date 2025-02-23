function descriptionFormater(allModules, response) {
    const allDescription = response
        .split("\n") // Split by new lines
        .map(line => line.replace(/^\d+\.\s*/, "")) // Remove numbering
        .filter(line => line.trim() !== "");
    const updatedModules = allModules.map((module, index) => ({
        ...module,
        description: allDescription[index]
    }));
    return updatedModules;
}
module.exports = descriptionFormater