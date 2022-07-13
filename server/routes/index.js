const express = require("express");
const authRoutes = require("./authRoutes")
const {create, update, getAll, deleteData, getById} = require("../controllers/baseController");
const {getAccessToRoute} = require("../middlewares/authorization/auth");
const router = express.Router();

router.use("/auth", authRoutes);
router.post("/base/:service", getAccessToRoute, create)
router.get("/base/:service", getAll)
router.get("/base/:service/:id", getById)
router.put("/base/:service/:id", update)
router.delete("/base/:service/:id", deleteData)

module.exports = router;