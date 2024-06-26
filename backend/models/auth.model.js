const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authSchema = new Schema({
    uid: {
        type: String,
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    imageURL: {
        type: String,
    },
    createdOn: {
        type: Date,
        default: new Date().getTime()
    }
});

module.exports = mongoose.model("Auth", authSchema);