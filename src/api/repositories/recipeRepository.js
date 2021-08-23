const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
    const newRecipe = await connection().then((db) =>
        db.collection('recipes').insertOne({
            name,
            ingredients,
            preparation,
            userId,
        }));
    return newRecipe;
};

const getAllRecipes = async () => {
    const allRecipes = await connection().then((db) =>
        db.collection('recipes').find().toArray());

    return allRecipes;
};

const getRecipeById = async (id) => {
    const recipe = await connection().then((db) =>
        db.collection('recipes').findOne(ObjectId(id)));

    return recipe;
};

const getByIdAndUserId = async (id, userId) => {
    const recipe = await connection().then((db) =>
        db.collection('recipes').findOne({ ...ObjectId(id), userId }));

    return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
    const recipe = await connection().then((db) =>
        db
            .collection('recipes')
            .updateOne(
                { _id: ObjectId(id) },
                { $set: { name, ingredients, preparation } },
            ));
    return recipe.result.ok;
};

const deleteRecipe = async (id) => {
    const recipe = await connection().then((db) =>
        db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
    return recipe.result.ok;
};

const uploadImageToRecipe = async (id, image) => {
    const updateImage = await connection().then((db) =>
        db
            .collection('recipes')
            .updateOne({ _id: ObjectId(id) }, { $set: { image } }));
    return updateImage.result.ok;
};

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    getByIdAndUserId,
    updateRecipe,
    deleteRecipe,
    uploadImageToRecipe,
};
