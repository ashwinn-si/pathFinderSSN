const express = require("express");
const router = express.Router();

const generateRoadMapController = require("./../controller/roadMapController/generateRoadMapController")
const verifyToken = require("./../middlewares/tokenverifcation")

router.get("/generateRoadMap",verifyToken,generateRoadMapController);

module.exports = router;