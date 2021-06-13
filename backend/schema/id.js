const Joi = require('joi');

const idSchema = Joi.object({
    id: Joi.string().length(24)
});

module.exports = idSchema;