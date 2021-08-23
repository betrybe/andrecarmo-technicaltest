const joi = require('joi');

const createRecipeSchema = joi.object({
    name: joi.string().required(),
    ingredients: joi.string().required(),
    preparation: joi.string().required(),
});

const idSchema = joi.object({
    id: joi.string().alphanum().length(24).required(),
});

module.exports = { createRecipeSchema, idSchema };
