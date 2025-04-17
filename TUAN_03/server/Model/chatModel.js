const mongoose = require('mongoose');

const ChatShema = mongoose.Schema(
    {
        members: {
            type: Array
        }
    },
    {
        timestaps: true
    }
)
const ChatModel = mongoose.model("Chat", ChatShema)
module.exports = ChatModel