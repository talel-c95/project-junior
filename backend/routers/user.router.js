const express = require("express");
const router = express.Router();
const { getUser,addUser,Login } = require('../controllers/user.controller');
const  {authenticateToken}= require("../utilities");

router.get("/",authenticateToken,getUser);
router.post("/createAccount", addUser);
router.post("/login",Login)
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);
// router.post("/login", login);
// router.post("/register", register);
// router.get("/getUser", verifyToken, currentUser);
module.exports = router;