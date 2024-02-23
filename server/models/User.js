const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema ({
    email: {type: String},
    name: {type: String},
    age: {type: Number},
    description: {type: String},
    password: {type: String},
    matches: []
});

module.exports = mongoose.model("users", userSchema);
