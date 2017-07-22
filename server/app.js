import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { serverPort } from '../etc/config.json';

import * as db from './utils/DataBaseUtils';

// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use( bodyParser.json() );

// Allow requests from any origin
app.use(cors({ origin: '*' }));

// RESTful api handlers
app.get('/movies', (req, res) => {
    db.listMovies().then(data => res.send(data));
});

app.post('/movies', (req, res) => {
    db.createMovie(req.body).then(data => res.send(data));
});

app.delete('/movies/:id', (req, res) => {
    db.deleteMovie(req.params.id).then(data => res.send(data));
});

app.listen(serverPort, function() {
    console.log(`Server is up and running on port ${serverPort}`);
});

module.exports = app
