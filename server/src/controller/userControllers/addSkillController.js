const loginModel = require("../../models/userModel")

const addSkillController = async(req, res) =>{
    try{
        const {email, skill} = req.body;
        const user = await loginModel.findOneAndUpdate({email},{
            skill : skill
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