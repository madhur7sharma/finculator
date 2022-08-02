const mongoose = require("mongoose");

const sipData = new mongoose.Schema({
    sipAmount: { type: Number },
    startDate: { type: String },
    fundName: { type: String },
});
sipData.pre("validate", function (next) {
    if (!((this.sipAmount && this.startDate) || (!this.sipAmount && !this.startDate))) {
        this.invalidate("Error");
    }

    next();
});
module.exports = sipData;
