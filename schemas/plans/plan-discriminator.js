const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const moduleOptions = {
    discriminatorKey: "__type",
    collection: "plans",
};

function modelAlreadyDeclared() {
    try {
        mongoose.model("plans"); // it throws an error if the model is still not defined
        return true;
    } catch (e) {
        return false;
    }
}
let plans = null;
if (!modelAlreadyDeclared()) {
    plans = mongoose.model("plans", new mongoose.Schema({}, { timestamps: true }, moduleOptions));
} else {
    plans = mongoose.model("plans");
}
module.exports = plans;
