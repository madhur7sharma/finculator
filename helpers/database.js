const mongoose = require("mongoose");
const url = process.env.mongodburl;
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", (_) => {
    console.log("Database connected");
});
db.on("error", (err) => {
    console.error("connection error:", err);
}); // db connection

module.exports = db;
