const connection = require('./connection');

const findByEmail = async (email) => {
    const user = await connection().then((db) =>
        db.collection('users').findOne({ email }));
    return user;
};

const createUser = async (name, email, password) => {
    const newUser = await connection().then((db) =>
        db.collection('users').insertOne({
            name,
            email,
            password,
            role: 'user',
        }));
    return newUser;
};

const findByEmailAndPassword = async (email, password) => {
    const user = await connection().then((db) =>
        db.collection('users').findOne({ email, password }));
    return user;
};

module.exports = { createUser, findByEmail, findByEmailAndPassword };
