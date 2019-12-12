import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { generateSchema } from "./schema";

const startServer = async () => {
  const app = express();
  const schema = await generateSchema();
  const server = new ApolloServer({
    schema
  });
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

startServer();
