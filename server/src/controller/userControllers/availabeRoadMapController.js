const userModel = require("../../models/userModel");
const availabeRoadMapController = async(req,res) =>{
    const email = req.user.email;
    const user = await userModel.findOne({email})
    res.send(user);
}

module.exports = availabeRoadMapController;