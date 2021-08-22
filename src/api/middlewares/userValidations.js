const userSchemas = require("../joiSchemas/userSchemas");
const verifyToken = require("../authentication/verifyToken");

function validateNewUser(req, res, next) {
    const validation = userSchemas.createUserSchema.validate(req.body);
    if (validation.error)
        return res.status(400).send({ message: "Invalid entries. Try again." });

    next();
}

function validateLogin(req, res, next) {
    const validation = userSchemas.loginSchema.validate(req.body);
    if (validation.error)
        return res.status(401).send({ message: "All fields must be filled" });

    next();
}

function validateToken(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ message: "missing auth token" });
        }
        const payload = verifyToken(authorization);
        req.payload = payload;
    } catch (error) {
        return res.status(401).json({ message: "jwt malformed" });
    }
    next();
}

module.exports = {
    validateNewUser,
    validateLogin,
    validateToken,
};
