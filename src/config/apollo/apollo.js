import { importSchema } from 'graphql-import'
import { ApolloServer } from 'apollo-server-express';
import { UserResolver } from '../../resolvers/user-resolver/user-resolver';
import Server from '../server/server';
import { PokemonResolver } from '../../resolvers/pokemon-resolver/pokemon-resolver';
import jwt from 'jsonwebtoken'
const Schema = importSchema('src/schemas/schema/schema.graphql');

const typeDefs = [
  Schema
]

const resolvers = {
  Query : {
    ...UserResolver.Query,
    ...PokemonResolver.Query
  },
  Mutation: {
    ...UserResolver.Mutation
  }
}

const context = async ({req}) => {
  const token = req.headers['auth'];
  if(token) {
    try {
      const actualUser = await jwt.verify(token, process.env.SECRET)
      req.actualUser = actualUser; 
      return {
        actualUser
      }
    } catch(error) {
      console.error(error)
    }
  }
}

const createApolloServer = (app) => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context
  })
  apolloServer.applyMiddleware({app})
  
  return apolloServer; 
}


export default createApolloServer