import "reflect-metadata";
import * as dotenv from "dotenv";
import * as express from "express";
import * as cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { generateSchema } from "./schema";
import { createConnection } from "typeorm";
import { connectionOptions } from "./ormconfig";

import * as user from "./controllers/user";

dotenv.config();

const startServer = async () => {
  const connection = await createConnection(connectionOptions);

  if (!connection) {
    throw new Error("Connection to database could not be established");
  }

  const app = express();

  app.use(cookieParser());

  app.use("/auth/login", user.login);
  app.use("/auth/callback", user.loginCallback);

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
