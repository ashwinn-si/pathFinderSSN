const userModel = require("../../models/userModel");

const roadMapDetailsGetterController = async (req,res)=>{
    const roadMapID = req.query.roadMapID;
    const email = req.user.email;
    const user = await userModel.findOne({email})
    const roadMap = user.roadMaps.filter((map) =>map.roadMapID === parseInt(roadMapID))
    res.send(roadMap);
}

module.exports = roadMapDetailsGetterController;