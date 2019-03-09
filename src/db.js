const mongodb = require('mongodb');
const client = mongodb.MongoClient;
// const URL = 'mongodb://localhost:27017/denzel';
const URL = 'mongodb://mongo/denzel';
const DATABASE_NAME = 'denzeldb'


var _db;

module.exports = {
  connectToMongo : function (callback) {
    client.connect(URL, {useNewUrlParser: true}, (err, dbase) => {
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