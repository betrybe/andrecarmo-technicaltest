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

const getRecipeById = async (id) => {
    const recipe = await recipes.getRecipeById(id);
    if (!recipe) return null;
    return recipe;
};

const updateRecipe = async (
    id,
    name,
    ingredients,
    preparation,
    userId,
    role
) => {
    const userMatch = await recipes.getByIdAndUserId(id, userId);
    if (userMatch || role === "admin") {
        const update = await recipes.updateRecipe(
            id,
            name,
            ingredients,
            preparation
        );

        return update ? await getRecipeById(id) : null;
    }
    return null;
};

module.exports = { createRecipe, getAllRecipes, getRecipeById, updateRecipe };
