const topicModel = require("./../../models/topicModel");
const userModel = require("./../../models/userModel");

const qetTopicCountController = async(req,res) =>{
    const email = req.user.email;
    const user = await userModel.findOne({
        email
    })
    const topic = user.skillTopic
    const subTopic = user.skillSubTopic;
    const topics = await topicModel.findOne({topic})

    const topicSubTopic = topics.subTopics.filter((element) => element.subTopic === subTopic)

    res.status(200).json({size : topicSubTopic[0].modules.length})

}
module.exports = qetTopicCountController;