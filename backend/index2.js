//server
const express = require('express');
const app = express();

//database
const db = require('mongoose');

//other packages
const Joi = require('joi');

//middleware
app.use(express.json());

//listen on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});

//connect to the database
db.connect('mongodb://localhost/playground', {useUnifiedTopology:true, useNewUrlParser: true})
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
    res.status(200).send(people);
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
app.delete('/', async (req,res) => {
    const { error, value } = idSchema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const result = await Person.findByIdAndDelete(value.id);
    if(!result) return res.status(404).send('could not delete, this person was not found');
    res.status(200).send(result);
});