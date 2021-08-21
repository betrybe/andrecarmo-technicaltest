const connection = require("./connection");

const createRecipe = async (name, ingredients, preparation, userId) => {
    const newRecipe = await connection().then((db) =>
        db.collection("recipes").insertOne({
            name,
            ingredients,
            preparation,
            userId,
        })
    );
    return newRecipe;
};

const getAllRecipes = async () => {
    const allRecipes = await connection().then((db) =>
        db.collection("recipes").find({}).toArray()
    );

    return allRecipes;
};

module.exports = { createRecipe, getAllRecipes };
