const express = require("express");
const router = express.Router();
const upload = require("../multer");
const path = require("path");

const { addTravelStory, getAll, imageUpload,deleteImage ,updateIsFavourite ,searchStories, filter,editStory,deleteCard} = require("../controllers/travel.controller");
const { authenticateToken } = require("../utilities");

router.post("/addTravel", authenticateToken, addTravelStory);
router.get("/", authenticateToken, getAll);
router.post("/image", upload.single("image"), imageUpload);
router.delete("/delete",authenticateToken,deleteImage)
router.delete("/delete/:id",authenticateToken,deleteCard)
router.put("/update/:id",authenticateToken,updateIsFavourite)
router.get("/search",authenticateToken,searchStories)
router.get("/filter",authenticateToken,filter)
router.put("/edit/:id",authenticateToken,editStory)
module.exports = router;
