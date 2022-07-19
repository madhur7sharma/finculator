const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var user = new mongoose.Schema({
    name: { type: String, default: "Owner name" },
    email: { type: String, unique: true, required: true },
    password: { type: String, default: "madhur" },
});
module.exports = mongoose.models.user || mongoose.model("user", user);
