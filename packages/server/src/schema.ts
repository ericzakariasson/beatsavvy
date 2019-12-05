import { buildSchema } from 'type-graphql';
import { PlayerResolver } from './resolvers/player.resolver';

export const generateSchema = async () => {
  const schema = await buildSchema({
    resolvers: [PlayerResolver]
  });
  return schema;
};
