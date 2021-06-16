const express = require('express');
const app = express();

const api = require('./backend/index');
app.use('/api', api);

const frontend = require('./backend/serve')
app.use('/', frontend)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});