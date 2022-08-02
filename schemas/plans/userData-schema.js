const mongoose = require("mongoose");

const userData = new mongoose.Schema({
    startingCost: { type: Number },
    inflation: { type: Number, default: 0 },
    startAge: { type: Number },
    endAge: { type: Number },
    startInvestment: { type: Number, default: 0 },
    rorInvestment: { type: Number, default: 0 },
});
userData.pre("validate", function (next) {
    if (!((this.startingCost && this.inflation && this.startAge && this.endAge) || (!this.startingCost && !this.inflation && !this.startAge && !this.endAge))) {
        this.invalidate("All fields both are required");
    }
    if (!((this.startInvestment && this.rorInvestment) || (!this.startInvestment && !this.rorInvestment))) {
        this.invalidate("startInvestment and rorInvestment both are required");
    }

    next();
});
module.exports = userData;
