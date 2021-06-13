const Joi = require('joi');
const db = require('mongoose');

const movieSchema = Joi.object({
    title: Joi.string().min(1).required(),
    stars: Joi.number().min(1).max(5).required(),
    year: Joi.number().min(1900).max(2020).required(),
    rating: Joi.string().valid('G','PG','PG-13','R').required()
});

const movieSchemaForUpdate = Joi.object({
    title: Joi.string().min(1),
    stars: Joi.number().min(1).max(5),
    year: Joi.number().min(1900).max(2020),
    rating: Joi.string().valid('G','PG','PG-13','R')
});

const Movie = db.model('Movie', db.Schema({
    title: String,
    stars: Number,
    year: Number,
    rating: String
}));

module.exports.Movie = Movie;
module.exports.movieSchema = movieSchema;
module.exports.movieSchemaForUpdate = movieSchemaForUpdate;
