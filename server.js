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

app.get('/hello', (req, res) => {
  res.json({ "hello": "world" });
}
);

app.get('/movies/populate', (req, res) => {
  imdb.getMovies(DENZEL_IMDB_ID).then(movies => {
    collection.insertMany(movies, (error, result) => {
      if(error) {
          return res.status(500).send(error);
      }
      res.json(result.result);
  });
    // res.json({"total": movies.length});
    // res.send(movies);
  });
})


app.listen(port);
console.log(`Server Running at localhost:${port}`);