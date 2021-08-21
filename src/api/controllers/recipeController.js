const { Router } = require("express");
const {
    validateNewRecipe,
    validateId,
} = require("../middlewares/recipeValidations");
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

router.get("/", async (req, res) => {
    const recipes = await recipeServices.getAllRecipes();

    res.send(recipes);
});

router.get("/:id", validateId, async (req, res) => {
    const { id } = req.params;
    const recipe = await recipeServices.getRecipeById(id);
    const result = recipe
        ? { status: 200, body: recipe }
        : { status: 404, body: { message: "recipe not found" } };

    res.status(result.status).send(result.body);
});

module.exports = router;
