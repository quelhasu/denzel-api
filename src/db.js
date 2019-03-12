const mongodb = require('mongodb');
require('dotenv').config()

const client = mongodb.MongoClient;
// const URL = 'mongodb://localhost:27017/denzel';
// const URL = 'mongodb://mongo/denzel';
const DATABASE_NAME = 'denzeldb'
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-zidja.mongodb.net/test?retryWrites=true`;

var _db;

module.exports = {
  connectToMongo : function (callback) {
    client.connect(uri, {useNewUrlParser: true}, (err, dbase) => {
      if(err) console.log('database is not connected')
      else{
        _db = dbase.db(DATABASE_NAME);
        console.log(`connected to ${DATABASE_NAME}!!`);
        return callback( err );
      }
    })
  },

  getDB: function(){
    return _db;
  }
};