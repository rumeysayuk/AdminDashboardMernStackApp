const asyncErrorWrapper = require("express-async-handler");
const Chatroom = require("../models/Chatroom");
const Message = require("../models/Message");
const createChatroom = asyncErrorWrapper(async (req, res) => {
    const {name} = req.body;
    const oldRoom = await Chatroom.findOne({name: name});
    if (oldRoom) return res.status(400).json({message: "Chatroom already exists"});
    const chatroom = await Chatroom.create({name: name});
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
    if (!chatroom) return res.status(400).json({message: "Chatroom not found"});
    const messages = await Message.find({chatroom: id});
    return res.status(200).json({
        message: "Messages fetched successfully",
        data: messages
    });
})

module.exports = {createChatroom, getAllChatrooms, getMessagesByChatroom};