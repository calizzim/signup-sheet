const express = require('express');
const path = require('path');


app = express.Router();

app.use(express.static(path.join(__dirname,'../frontend/dist/frontend')));

app.all('/', (req, res) => {
  res.status(200).sendFile(__dirname + 'frontend/dist/frontend/index.html');
});

module.exports = app;