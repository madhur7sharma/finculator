const db = require("./database");
const User = require("../schemas/site-schema");
const Accesshash = require("../schemas/access-hash");
const _ = require("lodash");

var fnHelpers = {
    filteredData: function (user) {
        const filter = {
            name: user.name,
            email: user.email,
            gender: user.gender,
        };
        return filter;
    },
};

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
                return fnHelpers.filteredData(user);
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
                return user;
            }
            return null;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    verify_user: async function (id) {
        try {
            const siteDoc = await User.findOne({ _id: id });
            if (siteDoc && !siteDoc.verified) {
                siteDoc.verified = true;
                await siteDoc.save();
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    send_reset_passwordLink: async function (email) {
        try {
            const userFind = await User.findOne({ email: email });
            if (!userFind) {
                return 404;
            }
            const alreadySent = await Accesshash.findOne({ email: email });
            if (alreadySent) {
                return 422;
            }
            const accessHash = new Accesshash({ email: email });
            if (accessHash) {
                await accessHash.save();
                return accessHash._id;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    verify_accessHash: async function (hashId) {
        try {
            const hash = await Accesshash.findOne({ _id: hashId });
            if (hash) {
                return hash;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    reset_password: async function (email, newPassword) {
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                user.password = newPassword;
                await user.save();
                const hash = await Accesshash.findOne({ email: email });
                if (hash) {
                    await hash.delete();
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    user_details: async function (email) {
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                return fnHelpers.filteredData(user);
            }
            return null;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    update_user: async function (email, details) {
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                _.merge(user, details);
                await user.save();
                return fnHelpers.filteredData(user);
            }
            return null;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
};

module.exports = fn;
