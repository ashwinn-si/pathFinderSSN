const topicModel = require("../../models/topicModel")

const addTopicController = async(req,res) => {
    try{
        const {topic, subTopics} = req.body;
        const newtopic = new topicModel({
            topic,
            subTopics
        })
        await newtopic.save();
        res.status(200).json({message : "new topic added"})
    }catch(e){
        res.status(500).json({message : "internal server error"})
    }
    
} 
module.exports = addTopicController