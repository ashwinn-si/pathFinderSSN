const express = require("express")
const router = express.Router();
const userModel = require("./../models/userModel")
const getDate = require("./../service/getDateFunction")
const getID = require("./../service/getRandomNumber")
const verifyToken = require("./../middlewares/tokenverifcation")
const availableRoadMapController = require("./../controller/userControllers/availabeRoadMapController")

const roadMapDetailsGetter = require("./../controller/userControllers/roadMapDetailsGetterController")
const roadMapUpdateController = require("./../controller/userControllers/roadMapUpdateController")




router.get("/getDetails",verifyToken,availableRoadMapController)

router.get("/roadmapGetDetails",verifyToken,roadMapDetailsGetter)

router.post("/update",verifyToken,roadMapUpdateController)

router.delete("/delete",verifyToken,async(req,res) =>{
    const email = req.user.email;
    const roadMapID = parseInt(req.query.roadMapID);
    const user = await userModel.findOne({email})
    console.log(user)
    const newRoadMap = user.roadMaps.map((map) => {
        if(map.roadMapID !== roadMapID){
            return map
        }
    });
    user.roadMaps = newRoadMap;
    await user.save()
    res.status(200).send("OK");
})

module.exports = router