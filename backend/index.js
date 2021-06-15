//server
const express = require('express');
const app = express.Router();

//database
const db = require('mongoose');

//other packages
const Joi = require('joi');

//middleware
app.use(express.json());

//connect to the database
databaseURL = 'mongodb+srv://meanStackTest:Aa54985498!@cluster0.d9acv.mongodb.net/playground?retryWrites=true&w=majority';
db.connect(databaseURL, {useUnifiedTopology:true, useNewUrlParser: true})
.then(()=>console.log('connected to database successfully'))
.catch(error=>console.log(error));

//define a valid person for signup
const personSchema = Joi.object({
    firstName: Joi.string().min(3).max(15),
    lastName: Joi.string().min(3).max(15)
});

//define a valid id
const idSchema = Joi.object({
    id: Joi.string().length(24)
});

const Person = db.model('Person', db.Schema({
    firstName: String,
    lastName: String
}));

//get list of people
app.get('/', async (req, res) => {
    let people = await Person.find({});
    res.status(200).send({body: people});
});

//add person to list
app.post('/', async (req,res) => {
    const {error, value} = personSchema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const person = Person(value);
    const result = await person.save();
    res.status(200).send(result);
});


//delete a person from the list
app.delete('/:id', async (req,res) => {
    const { error } = idSchema.validate({id: req.params.id});
    if(error) return res.status(400).send(error.details[0].message);
    const result = await Person.findByIdAndDelete(req.params.id);
    if(!result) return res.status(404).send('could not delete, this person was not found');
    res.status(200).send(result);
});

module.exports = app;