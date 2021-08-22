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
        const isUpdated = await recipes.updateRecipe(
            id,
            name,
            ingredients,
            preparation
        );

        return isUpdated ? await getRecipeById(id) : null;
    }
    return null;
};

const deleteRecipe = async (id, userId, role) => {
    const userMatch = await recipes.getByIdAndUserId(id, userId);
    if (userMatch || role === "admin") {
        const isDeleted = await recipes.deleteRecipe(id);

        return isDeleted ? true : false;
    }
    return false;
};

const uploadImageToRecipe = async (id, image, userId, role) => {
    const userMatch = await recipes.getByIdAndUserId(id, userId);
    if (userMatch || role === "admin") {
        const isUploaded = recipes.uploadImageToRecipe(id, image);

        return isUploaded ? await getRecipeById(id) : null;
    }
    return false;
};

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    uploadImageToRecipe,
};
