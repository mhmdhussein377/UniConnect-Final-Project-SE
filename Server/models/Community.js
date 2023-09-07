const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    privacy: {
        type: String,
        enum: [
            "public", "private"
        ],
        default: "public",
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, {timestamps: true});

const Community = mongoose.model("Community", communitySchema);
module.exports = Community