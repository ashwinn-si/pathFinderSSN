const topicModel = require("./../../models/topicModel")
const userModel = require("./../../models/userModel")

const getSkillController = async(req,res) => {
    try{
        const email = req.user.email;
        const user = await userModel.findOne({email});
        const skillTopic = user.skillTopic;
        const skillDetails = await topicModel.findOne({topic : skillTopic})

        const subTopics  =  skillDetails.subTopics.filter(element => element.subTopic === user.skillSubTopic)

        res.status(200).json({data : subTopics})
    }catch(err){
        res.status(500).json({message : "internal server error"})
    }
}


module.exports = getSkillController