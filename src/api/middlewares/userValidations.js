const userSchemas = require("../joiSchemas/userSchemas");

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

module.exports = { validateNewUser, validateLogin };
