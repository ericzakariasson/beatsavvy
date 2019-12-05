import express from 'express';
import { ApolloServer } from 'apollo-server-express';

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({});
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

startServer();
