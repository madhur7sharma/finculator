const db = require("./database");
const User = require("../schemas/site-schema");

var fn = {
    new_user: async function (userData) {
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
    find_user: async function (email) {
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                var filteredData = {};
                filteredData.name = user.name;
                filteredData.username = user.username;
                return filteredData;
            }
            return null;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    verify_password: async function (email, password) {
        try {
            const auth = await User.findOne({ email: email });
            return auth.password === password;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
};

module.exports = fn;
