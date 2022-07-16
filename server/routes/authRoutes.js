const express = require("express")
const {login, register,getHomePage} = require("../controllers/authController");
const router = express.Router()

router.post("/login", login);
router.post("/register", register)
router.get("/getHomePage", getHomePage);

module.exports = router;