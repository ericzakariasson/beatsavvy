import {
  Resolver,
  Ctx,
  Query,
  Arg,
  ObjectType,
  Field,
  Mutation
} from "type-graphql";
import { User } from "../entity/user.entity";
import { Context } from "../types/graphql";
import { UserService } from "../service/user.service";

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  authenticationUrl(@Ctx() ctx: Context): string {
    const userService = new UserService();
    const url = userService.getAuthenticationUrl(ctx.res);
    return url;
  }

  @Mutation(() => AuthenticationResponse, { nullable: true })
  async authenticate(
    @Arg("code") code: string,
    @Arg("state") state: string,
    @Ctx() ctx: Context
  ): Promise<AuthenticationResponse | null> {
    const userService = new UserService();

    const data = await userService.getSpotifyCredentials(
      code,
      state,
      ctx.req,
      ctx.res
    );

    console.log(data);

    return data ? new AuthenticationResponse(data) : null;
  }
}

@ObjectType()
class AuthenticationResponse {
  constructor(init: AuthenticationResponse) {
    Object.assign(this, init);
  }

  @Field()
  user: User;

  @Field()
  token: string;
}
