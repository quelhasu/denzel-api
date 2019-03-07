var mongoUtil = require('../db.js');
var collection = mongoUtil.getDB().collection("movies");

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
    }
  }
});

exports.mutationType = mutationType;