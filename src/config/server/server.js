import express from 'express'
import createApolloServer from '../apollo/apollo';
import dotenv from 'dotenv'


const app = express();

export const createServer = (port) => {
  const apolloServer = createApolloServer(app);
  app.listen(port, () => console.log(`The server is running in http://localhost:${port}${apolloServer.graphqlPath}`))
  dotenv.config({path:'.env'})
}



