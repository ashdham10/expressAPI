const path = require('path');
const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes');

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: 'false' }));

app.use(express.static(path.join(__dirname, '../client')));

app.use('/api', apiRouter);

let port = 3000;

app.listen(port, () => {
    console.log('Server listening');
});