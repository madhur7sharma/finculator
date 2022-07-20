const mongoose = require("mongoose");
const { hashPassword } = require("../helpers/encrypt-password");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var user = new mongoose.Schema(
    {
        name: { type: String, default: "Owner name" },
        email: { type: String, unique: true, required: true },
        password: { type: String, default: "madhur" },
        verified: { type: Boolean, default: false, required: true },
    },
    { timestamps: true }
);
user.pre("save", async function (next) {
    var self = this;
    self.password = await hashPassword(self.password);
    next();
});
module.exports = mongoose.models.user || mongoose.model("user", user);
