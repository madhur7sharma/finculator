const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var activationHash = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);
activationHash.index({ createdAt: 1 }, { expireAfterSeconds: 300 });
module.exports = mongoose.models.activationHash || mongoose.model("activationHash", activationHash);
