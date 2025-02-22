const loginModel = require("../../models/userModel")

const addSkillController = async(req, res) =>{
    try{
        const {topic, subTopic} = req.body;
        const email = req.user.email;
        const user = await loginModel.findOneAndUpdate({email},{
            skillTopic : topic,
             skillSubTopic : subTopic
        });
        res.status(200).json({message : "skill added successful"})
    }catch(err){
        if(err.message === "skill exsist"){
            res.status(401).json({message : "skill already added"});
        }else{
            res.status(500).json({message : "internal server error"});
        }
    }
}

module.exports = addSkillController