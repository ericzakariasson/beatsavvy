import * as uuid from "uuid/v4";
import * as qs from "qs";
import { isProduction } from "../utils";
import { Request, Response } from "express";
import { URLSearchParams } from "url";
import { SpotifyUser } from "@app/types/spotify";

import fetch from "node-fetch";
import { User } from "../entity/user.entity";

const SPOTIFY_STATE_KEY = "SPOTIFY_STATE_KEY";

const baseUrl = isProduction() ? process.env.APP_URL : "http://localhost:4000";
const redirectUri = `${baseUrl}/auth/callback`;

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
  ) {
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

    const user = await this.createUser(userData, refresh_token);

    // Store in session/redis alternatively store in database and access by custom session token
    const spotifyAuthentication = {
      userId: user.id,
      accessToken: access_token,
      refreshToken: refresh_token
    };

    console.log(spotifyAuthentication);

    return user;
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
