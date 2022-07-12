const express = require("express");
const router = express.Router();
const {create, update, getAll, deleteData, getById} = require("../controllers/baseController");

router.post("/base/:service", create)
router.get("/base/:service", getAll)
router.get("/base/:service/:id", getById)
router.put("/base/:service/:id", update)
router.delete("/base/:service/:id", deleteData)