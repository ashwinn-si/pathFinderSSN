const topicModel = require("./../../models/topicModel")
const userModel = require("./../../models/userModel")

const getSkillController = async(req,res) => {
    try{
        const email = req.params.email;
        const user = await userModel.findOne({email});
        const skill = user.skill;

    
        const topicDetails = await topicModel.findOne({topic : skill})
        const subTopics  =  topicDetails.subTopics
        
        res.status(200).json({data : subTopics})
    }catch(err){
        res.status(500).json({message : "internal server error"})
    }
}


module.exports = getSkillController