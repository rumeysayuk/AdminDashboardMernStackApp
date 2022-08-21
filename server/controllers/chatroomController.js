const asyncErrorWrapper = require("express-async-handler");
const Chatroom = require("../models/Chatroom");
const Message = require("../models/Message");
const CustomError = require("../helpers/error/CustomError");
const mongoose = require("mongoose");

const createChatroom = asyncErrorWrapper(async (req, res) => {
    const {chatroomName} = req.body;
    const oldRoom = await Chatroom.findOne({name: chatroomName});
    if (oldRoom) return res.status(400).json({message: "Chatroom name already exists"});
    const chatroom = await Chatroom.create({name: chatroomName,creator: req.user._id});
    return res.status(200).json({message: "Chatroom created successfully", chatroom});
})

const getAllChatrooms = asyncErrorWrapper(async (req, res) => {
    const chatrooms = await Chatroom.find({});
    return res.status(200).json({
        message: "Chatrooms fetched successfully",
        data: chatrooms
    });
})

const getMessagesByChatroom = asyncErrorWrapper(async (req, res) => {
    const {id} = req.params;
    const chatroom = await Chatroom.findById(id);
    if (!chatroom) return res.status(400).json({message: "Chatroom room not found"});
    const messages = await Message.find({chatroom: id});
    return res.status(200).json({
        message: "Messages fetched successfully",
        data: messages
    });
})

const deleteChatroom = asyncErrorWrapper(async (req, res, next) => {
    let { id} = req.params
    const user = req.user

    if (!id || !mongoose.Types.ObjectId.isValid(id)) return next(new CustomError("Wrong id !", 400))
    const oldRoom = await Chatroom.findOne({_id: id});

    if (user._id ==! oldRoom._id) return next(new CustomError("You are not authorized to delete this chatroom", 401))
    await Chatroom.deleteOne({_id: id})
    return res.status(200).json({message:"Chatroom deleted ..!", success: true})
})


module.exports = {createChatroom, getAllChatrooms, getMessagesByChatroom,deleteChatroom};