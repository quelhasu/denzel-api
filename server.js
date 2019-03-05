const express = require('express');
const mongodb = require('mongodb');
const imdb = require('./sandbox').Sandbox;

const config = require('./db');
const port = 9292;
const app = express();

const DENZEL_IMDB_ID = 'nm0000243';
const DATABASE_NAME = 'denzeldb';

const client = mongodb.MongoClient;

var database, collection;

client.connect(config.DB, function (err, db) {
  if (err) {
    console.log('database is not connected')
  }
  else {
    database = db.db(DATABASE_NAME);
    collection = database.collection("movies");
    console.log(`connected to ${DATABASE_NAME}!!`)
  }
});


app.listen(port);
console.log(`Server Running at localhost:${port}`);