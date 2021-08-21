const { Router } = require("express");
const userSchema = require("../joiSchemas/userSchemas");
const userServices = require("../services/userService");

const router = Router();
router.post("/", async (req, res) => {
    const validation = userSchema.createUserSchema.validate(req.body);
    if (validation.error)
        return res.status(400).send({ message: "Invalid entries. Try again." });

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
