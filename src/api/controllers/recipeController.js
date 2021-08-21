const { Router } = require("express");
const { validateNewRecipe } = require("../middlewares/recipeValidations");
const { validateToken } = require("../middlewares/userValidations");
const recipeServices = require("../services/recipeService");

const router = Router();

router.post("/", validateToken, validateNewRecipe, async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const userId = req.payload.id;
    const recipe = await recipeServices.createRecipe(
        name,
        ingredients,
        preparation,
        userId
    );
    res.status(201).send({ recipe });
});

module.exports = router;
