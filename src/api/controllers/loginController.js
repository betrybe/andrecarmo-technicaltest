const { Router } = require("express");
const { validateLogin } = require("../middlewares/userValidations");

const router = Router();

router.post("/", validateLogin, async (req, res) => {
    const { email, password } = req.body;
});

module.exports = router;
