const { Router } = require("express");
const { validateNewUser } = require("../middlewares/userValidations");
const userServices = require("../services/userService");

const router = Router();
router.post("/", validateNewUser, async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = await userServices.createUser(name, email, password);
    const result = newUser
        ? {
              status: 201,
              body: {
                  user: {
                      name,
                      email,
                      role: newUser.ops[0].role,
                      _id: newUser.ops[0]._id,
                  },
              },
          }
        : { status: 409, body: { message: "Email already registered" } };
    res.status(result.status).json(result.body);
});

module.exports = router;
