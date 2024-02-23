const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let messageSchema = new Schema ({
    time: {type: String},
    sender_email: {type: String},
    receiver_email: {type: String},
    message: {type: String}
});

module.exports = mongoose.model("messages", messageSchema);