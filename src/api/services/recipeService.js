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

const getAllRecipes = async () => {
    const allRecipes = await recipes.getAllRecipes();

    return allRecipes;
};

module.exports = { createRecipe, getAllRecipes };
