const router = require("express").Router();
const {getAccessToRoute} = require("../middlewares/authorization/auth");
const {getAllChatrooms, getMessagesByChatroom,createChatroom} = require("../controllers/chatroomController");

router.get("/get-all-chatrooms", getAccessToRoute,getAllChatrooms);
router.get("/getMessages/:id", getAccessToRoute, getMessagesByChatroom);
router.post("/create-chatroom",createChatroom);

module.exports = router;