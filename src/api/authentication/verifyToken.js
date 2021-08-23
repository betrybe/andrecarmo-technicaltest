const jwt = require('jsonwebtoken');

const SECRET = 'coockmasterSecret';

const verifyToken = (authorization) => {
    const payload = jwt.verify(authorization, SECRET);
    return payload;
};

module.exports = verifyToken;
