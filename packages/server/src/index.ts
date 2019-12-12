import "reflect-metadata";
import * as dotenv from "dotenv";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { generateSchema } from "./schema";
import * as cookieParser from "cookie-parser";
import * as qs from "qs";

dotenv.config();

const startServer = async () => {
  const app = express();
  app.use(cookieParser());

  app.get("/auth/callback", (req, res) => {
    console.log(req.query);
  });

  app.get("/auth/login", (req, res) => {
    const state = "ahue";
    res.cookie("spotifyState", state);
    const scope = "user-read-private user-read-email";
    const query = qs.stringify({
      response_type: "code",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      redirect_uri: "http://localhost:4000/auth/callback",
      scope,
      state
    });
    res.redirect(`https://accounts.spotify.com/authorize?${query}`);
  });

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
