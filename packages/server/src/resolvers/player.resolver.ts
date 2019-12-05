import { Resolver, Query } from 'type-graphql';
// Decorator.

@Resolver()
export class PlayerResolver {
  @Query(() => String)
  test() {
    return 'hej';
  }
}
