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

router.post("/add",async (req,res)=>{
    const email = "siashwin2005@gmail.com"
    const user = await userModel.findOne({email})
    const date = getDate()
    const id = getID();
    const roadMap = {
        roadMapID : id,
        skillName : "Problem Solving",
        dateOfCreation : date,
        modules : [
            {
                title : "ashwin si",
                description : "is a good boy",
                links : [
                    {
                        topic : "intro 1",
                        link :"ytts asdsada"
                    },{
                        topic :"intro 2",
                        link : "ytts asdsd"
                    },
                    {
                        topic:"intro 3",
                        link :"ytts adsda"
                    }
                ]
            },{
                title : "ashwin si",
                description : "is a good boy",
                links : [
                    {
                        topic : "intro 1",
                        link :"ytts asdsada"
                    },{
                        topic :"intro 2",
                        link : "ytts asdsd"
                    },
                    {
                        topic:"intro 3",
                        link :"ytts adsda"
                    }
                ]
            },
            {
                title : "ashwin si",
                description : "is a good boy",
                links : [
                    {
                        topic : "intro 1",
                        link :"ytts asdsada"
                    },{
                        topic :"intro 2",
                        link : "ytts asdsd"
                    },
                    {
                        topic:"intro 3",
                        link :"ytts adsda"
                    }
                ]
            },
            {
                title : "ashwin si",
                description : "is a good boy",
                links : [
                    {
                        topic : "intro 1",
                        link :"ytts asdsada"
                    },{
                        topic :"intro 2",
                        link : "ytts asdsd"
                    },
                    {
                        topic:"intro 3",
                        link :"ytts adsda"
                    }
                ]
            }
        ]

    }
    user.roadMaps.push(roadMap)
    await user.save();
    res.status(200).json({message : "user saved successfully"});
})

router.get("/roadmapGetDetails",verifyToken,roadMapDetailsGetter)

router.post("/update",verifyToken,roadMapUpdateController)

router.post("/delete",async(req,res) =>{
    const email = "siashwin2005@gmail.com"
    const user = await userModel.findOne({email})
    user.roadMaps=[]
    await user.save()
    res.send(user);
})

module.exports = router