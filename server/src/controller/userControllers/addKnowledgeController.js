const userKnowledgeModel = require("../../models/userKnowlegeModel")

const addKnowledgeController = async(req, res) => {
    const email = req.user.email;
    const topics = req.body.topics;
    const rating = req.body.rating.map((rate) =>  parseInt(rate));
    const user = await userKnowledgeModel.find({email})
    if(user.length > 0){
        await userKnowledgeModel.deleteOne({email});
    }
    const newUser = new userKnowledgeModel({
        email : email,
        topics : topics,
        rating : rating,
    })
    await newUser.save();
    res.status(200).json({message:"success"});
}
module.exports = addKnowledgeController;