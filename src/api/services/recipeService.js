const recipes = require("../repositories/recipeRepository");

const createRecipe = async (name, ingredients, preparation, userId) => {
    const newRecipe = await recipes.createRecipe(
        name,
        ingredients,
        preparation,
        userId
    );

    const { insertedId } = newRecipe;
    return { name, ingredients, preparation, userId, _id: insertedId };
};

module.exports = { createRecipe };
