const users = require("../repositories/userRepository");

const createUser = async (name, email, password) => {
    const user = await users.findByEmail(email);
    if (user) return null;

    const newUser = await users.createUser(name, email, password);
    return newUser;
};

module.exports = { createUser };
