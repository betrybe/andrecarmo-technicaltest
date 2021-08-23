const users = require('../repositories/userRepository');
const createToken = require('../authentication/createToken');

const createUser = async (name, email, password) => {
    const user = await users.findByEmail(email);
    if (user) return null;

    const newUser = await users.createUser(name, email, password);
    return {
        user: {
            name,
            email,
            role: newUser.ops[0].role,
            _id: newUser.ops[0].id,
        },
    };
};

const loginUser = async (email, password) => {
    const user = await users.findByEmailAndPassword(email, password);
    if (!user) return null;

    const payload = {
        id: user.id,
        email,
        role: user.role,
    };

    const token = createToken(payload);
    return token;
};
module.exports = { createUser, loginUser };
