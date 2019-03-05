const express = require('express');
const mongodb = require('mongodb');
const imdb = require('./sandbox').Sandbox;

const config = require('./db');
const port = 9292;
const app = express();


app.listen(port);
console.log(`Server Running at localhost:${port}`);