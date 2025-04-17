const messageModel = require("../Model/messageModel")

const addMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;

    const message = new messageModel({
        chatId, senderId, text
    });
    try {
        const rs = await message.save();
        res.status(200).json(rs)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getMessage = async (req, res) => {
    const { chatId } = req.params;
    try {
        const rs = await messageModel.find({ chatId });
        res.status(200).json(rs);
    } catch (error) {
        res.status(500).json(error);
    }


}




module.exports = { addMessage, getMessage }