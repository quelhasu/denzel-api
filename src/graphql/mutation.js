var mongoUtil = require('../db.js');
var collection = mongoUtil.getDB().collection("movies");
const imdb = require('../../sandbox').Sandbox;
const DENZEL_IMDB_ID = 'nm0000243';

const GraphQLJSON = require ('graphql-type-json');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const { movieType } = require('./type.js');

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    reviewMovie: {
      type: movieType,
      description: "Update a movie by adding review.",
      args: {
        id: { type: GraphQLString },
        review: {type: GraphQLJSON}
      },
      resolve: (source, args) => {
        collection.updateOne({ "id": args.id }, { "$set": { "review": args.review } });
        return collection.findOne({"id": args.id});
      }
    },
    populateDenzelDb:{
      type: GraphQLJSON,
      description: "Populate denze db with movies.",
      resolve: (source, args) => {
        return imdb.getMovies(DENZEL_IMDB_ID).then(movies => {
          collection.ensureIndex({id:1}, {unique:true});
          return collection.insertMany(movies, {ordered: false}).then(res => {
            return res.result;
          });
        });
      }
    }
  }
});

exports.mutationType = mutationType;