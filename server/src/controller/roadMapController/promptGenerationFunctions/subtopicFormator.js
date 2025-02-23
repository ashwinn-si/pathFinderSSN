function subTopicFormator(topics) {
    let roadMap = []
    for(let topic of topics){
        const lines = topic.trim().split('\n')
        let subLines = lines.slice(1).filter(line => line.trim() !== "");
        let currRoadMap = []
        subLines.forEach(topic => {
            let parts = topic.split(". ");
            roadMap.push({
                title: parts[1].replace(/\s*\(.*?\)/g, "").trim() ,
            });
        });

    }

    return roadMap;
}
module.exports = subTopicFormator