const mongoose = require("mongoose");
const plans = require("./plan-discriminator");
const userData = require("./userData-schema");
const sipData = require("./sipData-schema");
if (mongoose.models.childrenmarriage) {
    module.exports = mongoose.models.childrenmarriage;
} else {
    const Childrenmarriage = plans.discriminator(
        "childrenmarriage",
        new mongoose.Schema({
            plan_type: { type: String, default: "childrenmarriage", immutable: true },
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
            user_data: { type: userData },
            sip_data: { type: sipData },
        })
    );
    module.exports = Childrenmarriage;
}
