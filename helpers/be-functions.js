const db = require("./database");
const User = require("../schemas/site-schema");

var fn = {
    new_user: async function (userData) {
        console.log("userData", userData);
        try {
            const emailAlreadyExits = await User.findOne({ email: userData.email });
            if (emailAlreadyExits) {
                return 409;
            }
            const user = new User(userData);
            if (user) {
                await user.save();
                return user;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    },
};

module.exports = fn;
