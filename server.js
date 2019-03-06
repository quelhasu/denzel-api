const express = require('express');
const mongodb = require('mongodb');
const imdb = require('./sandbox').Sandbox;

const config = require('./db');
const port = 9292;
const app = express();

const DENZEL_IMDB_ID = 'nm0000243';

const client = mongodb.MongoClient;

var database, collection;

client.connect(config.DB, function (err, db) {
  if (err) {
    console.log('database is not connected')
  }
  else {
    database = db.db(config.DATABASE_NAME);
    collection = database.collection("movies");
    console.log(`connected to ${config.DATABASE_NAME}!!`)
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

app.get('/movies-all', (req, res) => {
  collection.find({}).toArray((error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
})

app.get('/movies', (req, res) => {
  collection.aggregate([
    {"$match": { "metascore": { "$gte": 77 } }},
    {"$sample":{"size":1}}
  ]).toArray((error, result) => {
    if(error) {
        return res.status(500).send(error);
    }
    // var awesome = result.filter(movie => movie.metascore >= 77);
    res.send(result);
});
})


app.get('/movies/search', (req, res) => {
  var limit = Number(req.query.limit) || 5;
  var metascore = Number(req.query.metascore) || 0;
  if(limit || metascore){
    collection.aggregate([
      {"$match": { "metascore": { "$gte": metascore } }},
      {"$sample": {"size": limit}}
    ]).toArray((err, result) => {
      if(err) return res.status(500).send(err);
      res.json({'limit': limit, 'metascore': metascore, 'results': result});
    })
  }
})

app.get('/movies/:id', (req, res) => {
  var id = req.params.id;
  collection.findOne({"id": id}, (err, result) => {
    if (err) return res.status(500).send(error);
    if(result) res.send(result);
    else res.json({"error":`${id} movie does not exist!`});
  });
})


app.listen(port);
console.log(`Server Running at localhost:${port}`);