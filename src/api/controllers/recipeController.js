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

router.put("/:id", validateToken, async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const userId = req.payload.id;
    const { role } = req.payload;
    const recipe = await recipeServices.updateRecipe(
        id,
        name,
        ingredients,
        preparation,
        userId,
        role
    );
    const result = recipe
        ? { status: 200, body: recipe }
        : { status: 401, body: { message: "user unauthorized" } };

    res.status(result.status).send(result.body);
});

router.delete("/:id", validateToken, async (req, res) => {
    const { id } = req.params;
    const userId = req.payload.id;
    const { role } = req.payload;
    const isDeleted = await recipeServices.deleteRecipe(id, userId, role);
    const status = isDeleted ? 204 : 404;
    res.sendStatus(status);
});

module.exports = router;
