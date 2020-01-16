import { SpotifyUser } from "@app/types/spotify";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import fetch from "node-fetch";
import * as qs from "qs";
import { URLSearchParams } from "url";
import * as uuid from "uuid/v4";
import { User } from "../entity/user.entity";
import { isProduction, time } from "../utils";
import { CacheService, spotifyAccessTokenKey } from "./cache.service";

const SPOTIFY_STATE_KEY = "SPOTIFY_STATE_KEY";

const baseUrl = isProduction() ? process.env.APP_URL : "http://localhost:4000";
const redirectUri = `${baseUrl}/auth/callback`;

export interface AuthenticationResponse {
  user: User;
  token: string;
}

export class UserService {
  getAuthenticationUrl(res: Response) {
    const state = uuid();
    const scope = "user-read-private user-read-email";

    res.cookie(SPOTIFY_STATE_KEY, state);

    const query = qs.stringify({
      response_type: "code",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      redirect_uri: redirectUri,
      scope,
      state
    });

    const clientUrl = `https://accounts.spotify.com/authorize?${query}`;

    return clientUrl;
  }

  async getSpotifyCredentials(
    code: string,
    state: string,
    req: Request,
    res: Response
  ): Promise<AuthenticationResponse | null> {
    const storedState = req.cookies.SPOTIFY_STATE_KEY || null;

    if (!code || !state || state !== storedState) {
      return null;
    }

    const basicAuth = new Buffer(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    res.clearCookie(SPOTIFY_STATE_KEY);

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    });

    const { access_token, refresh_token } = await response.json();

    const userResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    const userData: SpotifyUser = await userResponse.json();

    if (!userData) {
      throw new Error("No user data found");
    }

    const user = await this.createUser(userData, refresh_token);
    const token = await this.createToken(user);

    const cacheService = new CacheService();

    const setToken = await cacheService.set(
      spotifyAccessTokenKey(user.id),
      access_token,
      time.hours(1)
    );

    if (!setToken) {
      throw new Error(`Could not set access token for user ${user.id}`);
    }

    return { user, token };
  }

  private createToken(user: User): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        user,
        process.env.TOKEN_SECRET as string,
        { expiresIn: time.days(7) },
        (err, token) => {
          if (err) {
            reject(err);
          }
          resolve(token);
        }
      );
    });
  }

  private async createUser(
    data: SpotifyUser,
    refreshToken: string
  ): Promise<User> {
    const user = User.create({
      displayName: data.display_name,
      email: data.email,
      spotifyId: data.id,
      refreshToken
    });

    await user.save();

    return user;
  }
}
