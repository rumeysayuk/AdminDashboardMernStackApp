const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
    name: {
        type: String,
        match: /^[A-Za-z\s+$]/,
        required: "Name is required!",
    },
}, { versionKey: false });

module.exports = mongoose.model("Chatrooms", chatroomSchema);