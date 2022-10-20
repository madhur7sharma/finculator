const db = require("./database");
const User = require("../schemas/site-schema");
const Accesshash = require("../schemas/access-hash");
const Dreamhouse = require("../schemas/plans/dreamhouse-schema");
const Childrenmarriage = require("../schemas/plans/childrenmarriage-schema");
const plans = require("../schemas/plans/plan-discriminator");
const Expense = require("../schemas/expense-schema");
const _ = require("lodash");

var fnHelpers = {
    filteredData: function (user) {
        const filter = {
            user_id: user._id,
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
    get_plans: async function (userId, plan) {
        try {
            const myPlans = await plans.find({ user_id: userId, __t: plan });
            return myPlans;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    plan: async function (email, details, plannerName) {
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                const allPlans = {
                    childrenmarriage: new Childrenmarriage(details),
                    dreamhouse: new Dreamhouse(details),
                };
                const newPlan = allPlans[plannerName];
                if (newPlan) {
                    user.plans.push(newPlan);
                    newPlan.user_id = user._id;
                    await newPlan.save();
                    await user.save();
                    return newPlan;
                }
                return false;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    update_plan: async function (email, details) {
        try {
            const myPlan = await plans.findOne({ _id: details._id });
            if (myPlan) {
                _.merge(myPlan, details);
                await myPlan.save();
                return myPlan;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    delete_plan: async function (email, details) {
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                const myPlan = await plans.findOne({ _id: details._id });
                if (myPlan) {
                    const index = user.plans.indexOf(details._id);
                    if (index > -1) {
                        user.plans.splice(index, 1);
                    }
                    await user.save();
                    await myPlan.delete();
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    get_expenses: async function (userId) {
        try {
            const myExpenses = await Expense.find({ user_id: userId });
            return myExpenses;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    expense: async function (email, details) {
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                console.log(details);
                var parts = details.date.split("-");
                details.date = new Date(parts[0], parts[1], parts[2]);
                const newExpense = new Expense(details);
                if (newExpense) {
                    user.expenses.push(newExpense);
                    newExpense.user_id = user._id;
                    await newExpense.save();
                    await user.save();
                    return newExpense;
                }
                return false;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    update_expense: async function (email, details) {
        try {
            const myExpense = await Expense.findOne({ _id: details._id });
            var parts = details.date.split("-");
            details.date = new Date(parts[0], parts[1], parts[2]);
            if (myExpense) {
                _.merge(myExpense, details);
                await myExpense.save();
                return myExpense;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    delete_expense: async function (email, details) {
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                const myExpense = await Expense.findOne({ _id: details._id });
                if (myExpense) {
                    const index = user.expenses.indexOf(details._id);
                    if (index > -1) {
                        user.expenses.splice(index, 1);
                    }
                    await user.save();
                    await myExpense.delete();
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    get_allusers: async function () {
        try {
            const users = await User.find();
            if (users && users.length > 0) {
                return users;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    admins: [],
};

module.exports = fn;
