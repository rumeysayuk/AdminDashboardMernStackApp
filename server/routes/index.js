const express = require("express");
const authRoutes = require("./authRoutes")
const {create, update, getAll, deleteData, getById} = require("../controllers/baseController");
const {getAccessToRoute} = require("../middlewares/authorization/auth");
const router = express.Router();
const upload = require("../middlewares/lib/multerUpload")
const pdfUpload = require("../middlewares/lib/pdfUpload");

router.use("/upload", upload.array("images"), (req, res, next) => {
   res.status(200).json({
      urls: (req.savedImages || []).map(image => process.env.HOST + "/" + image),
      message: "Image upload successfully",
   })
})
router.use("/pdfupload", pdfUpload.single("file"), (req, res, next) => {
   res.status(200).json({
      url: process.env.HOST + "/" + req.savedImage,
      message: "Successfully uploaded"
   })
})

router.use("/auth", authRoutes);
router.post("/base/:service", getAccessToRoute, create)
router.get("/base/:service", getAll)
router.get("/base/:service/:id", getById)
router.put("/base/:service/:id", update)
router.delete("/base/:service/:id", deleteData)

module.exports = router;