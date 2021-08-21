const joi = require("joi");

const createRecipeSchema = joi.object({
    name: joi.string().required(),
    ingredients: joi.string().required(),
    preparation: joi.string().required(),
});

module.exports = { createRecipeSchema };
