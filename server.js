// Filename - Server.js

const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/api');

const port = 3000;
const app = express();


// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

app.get('/', async (request, response) => {
    try {
        response.sendFile(__dirname + '/index.html');
    } catch (error) {
        console.log(error);
        response.status(500).json({error: error.message});
    }
});

app.use('/api', api);

app.listen(port, function () {
    console.log("Server is listening at port:" + port);
});
