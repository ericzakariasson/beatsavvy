import { buildSchema } from "type-graphql";
import { PlayerResolver } from "./resolvers/player.resolver";
import { UserResolver } from "./resolvers/user.resolver";

export const generateSchema = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, PlayerResolver]
  });
  return schema;
};
