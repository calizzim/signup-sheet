//server
const express = require('express');
const app = express();

//database
const mongoose = require('mongoose');

//routes
const movies = require('./routes/movies');
const sheet = require('./routes/sheet')

//middleware
app.use(express.json());
app.use('/movies',movies);

//listen on the port set by env
const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`listening on port ${port}`);
});