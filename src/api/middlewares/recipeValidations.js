const recipeSchemas = require("../joiSchemas/recipeSchemas");

function validateNewRecipe(req, res, next) {
    const validation = recipeSchemas.createRecipeSchema.validate(req.body);
    if (validation.error)
        return res.status(400).send({ message: "Invalid entries. Try again." });

    next();
}

module.exports = { validateNewRecipe };
