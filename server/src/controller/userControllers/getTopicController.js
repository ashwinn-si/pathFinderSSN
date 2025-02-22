const topicModel = require("../../models/topicModel")

const getTopicController =async (req, res) => {
    const topics = await topicModel.find();
    res.send({topics})
}

module.exports=getTopicController;