var mongoUtil = require('../db.js');
var collection = mongoUtil.getDB().collection("movies");

const { 
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const {movieType} = require('./type.js');

//Define the Query
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
      hello: {
          type: GraphQLString,

          resolve: function () {
              return "Hello World";
          }
      },
      movie: {
          type: new GraphQLList(movieType),
          args: {
              id: { type: GraphQLString}
          },
          description: "Find movie by id or show a random awesome movie.",
          resolve: function (source, args) {
            if(args.id) return collection.find({"id": args.id}).toArray();
            else return collection.aggregate([
              { "$match": { "metascore": { "$gte": 77 } } },
              { "$sample": { "size": 1 } }
            ]).toArray();
          }
      },
      movies:{
        type: new GraphQLList(movieType),
        description: "Show all movies.",
        resolve: function(source, args){
          return collection.find({}).toArray();
        }
      }
    }
});

exports.queryType = queryType;