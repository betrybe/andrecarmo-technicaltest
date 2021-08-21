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

module.exports = { createRecipe };
