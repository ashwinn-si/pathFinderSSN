const questionModel = require("./../../models/questionsModel")
const deleteQuestionController = async(req, res) => {
    const email = req.user.email
    const user = await questionModel.findOne({email})
    if(user){
        await questionModel.findOneAndDelete({email })
    }
    res.status(200).json({message : "deleted successfully"})
}
module.exports = deleteQuestionController