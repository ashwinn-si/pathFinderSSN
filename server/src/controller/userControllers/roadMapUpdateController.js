const userModel = require("./../../models/userModel")

const roadMapUpdateController = async(req,res) =>{
    try{

        const email = req.user.email;
        const roadMapID = req.body.roadMapID;
        const user = await userModel.findOne({email});

        const roadMap = await user.roadMaps.find(rm => rm.roadMapID === parseInt(roadMapID));

        roadMap.modules = req.body.modules;

        await user.save();

        res.status(200).json({ message: "Roadmap updated successfully", roadMap });
    }    catch (err){
        console.log(err);
    }

}

module.exports = roadMapUpdateController