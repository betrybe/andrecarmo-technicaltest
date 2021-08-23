const jwt = require('jsonwebtoken');

const SECRET = 'coockmasterSecret';

const headers = {
    algorithm: 'HS256',
    expiresIn: '3d',
};

const createToken = (payload) => {
    const token = jwt.sign(payload, SECRET, headers);

    return token;
};

module.exports = createToken;
