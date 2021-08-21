const { Router } = require("express");
const { validateLogin } = require("../middlewares/userValidations");
const userServices = require("../services/userService");

const router = Router();

router.post("/", validateLogin, async (req, res) => {
    const { email, password } = req.body;
    const token = await userServices.loginUser(email, password);
    const result = token
        ? { status: 200, body: { token } }
        : { status: 401, body: { message: "Incorrect username or password" } };

    res.status(result.status).json(result.body);
});

module.exports = router;
