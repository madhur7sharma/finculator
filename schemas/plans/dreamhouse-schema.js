const mongoose = require("mongoose");
const plans = require("./plan-discriminator");
const userData = require("./userData-schema");
const sipData = require("./sipData-schema");
if (mongoose.models.dreamhouse) {
    module.exports = mongoose.models.dreamhouse;
} else {
    const Dreamhouse = plans.discriminator(
        "dreamhouse",
        new mongoose.Schema({
            plan_type: { type: String, default: "dreamhouse", immutable: true },
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
            address: { type: String },
            user_data: { type: userData },
            sip_data: { type: sipData },
        })
    );
    module.exports = Dreamhouse;
}
