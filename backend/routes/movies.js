const express = require('express');
const router = express.Router();

const db = require('mongoose');

const Joi = require('joi');
const idSchema = require('../schema/id');
const { Movie, movieSchema, movieSchemaForUpdate } = require('../schema/movie');

const _ = require('underscore');

db.connect('mongodb://localhost/playground', {useUnifiedTopology:true, useNewUrlParser: true})
.then(()=>console.log('connected to database successfully'))
.catch(error=>console.log(error));

//return all of the movies
router.get('/', async (req,res) => {
    let movies = await Movie.find({});
    res.status(200).send(movies);
});

//get movie with a specific id
router.get('/:id', async (req,res) => {
    const {error} = idSchema.validate({id: req.params.id});
    if(error) return res.status(400).send(error.details[0].message);
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(400).send('there is no movie with the specified id');
    res.status(200).send(movie);
});

//post a new movie
router.post('/', async (req,res) => {
    let {error} = movieSchema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const movie = Movie(req.body);
    const result = await movie.save();
    res.status(200).send(result);
});

//update a movie with a given id
router.put('/:id', async (req,res) => {
    let error;
    ({error} = idSchema.validate({id: req.params.id}));
    if(error) return res.status(400).send(error.details[0].message);
    ({error} = movieSchemaForUpdate.validate(req.body));
    if(error) return res.status(400).send(error.details[0].message);
    const result = await Movie.findByIdAndUpdate(req.params.id,{$set: req.body});
    res.status(200).send(result);
});

//delete a movie with a given id
router.delete('/:id', async (req,res) => {
    const {error} = idSchema.validate({id: req.params.id});
    if(error) return res.status(400).send(error.details[0].message);
    const result = await Movie.findByIdAndDelete(req.params.id);
    if(!result) return res.status(404).send('could not delete, this movie was not found');
    res.status(200).send(result);
});


module.exports = router;