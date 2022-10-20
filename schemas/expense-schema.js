const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var expense = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
        category: { type: String },
        description: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: Date },
    },
    { timestamps: true }
);
module.exports = mongoose.models.expense || mongoose.model("expense", expense);
