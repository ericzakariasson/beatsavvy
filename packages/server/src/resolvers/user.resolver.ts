import { Resolver, Ctx, Query, Arg } from "type-graphql";
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

  @Query(() => User)
  async authenticate(
    @Arg("code") code: string,
    @Arg("state") state: string,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const userService = new UserService();

    const user = await userService.getSpotifyCredentials(
      code,
      state,
      ctx.req,
      ctx.res
    );

    return user;
  }
}
