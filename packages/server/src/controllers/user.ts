import { Request, Response } from "express";
import * as uuid from "uuid/v4";
import { URLSearchParams } from "url";
import * as qs from "qs";
import fetch from "node-fetch";
import { isProduction } from "../utils";

const SPOTIFY_STATE_KEY = "SPOTIFY_STATE_KEY";

const baseUrl = isProduction() ? process.env.APP_URL : "http://localhost:4000";

const redirectUri = `${baseUrl}/auth/callback`;

export const login = (req: Request, res: Response) => {
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

  res.redirect(`https://accounts.spotify.com/authorize?${query}`);
};

export const loginCallback = async (req: Request, res: Response) => {
  const { code, state } = req.query;
  const storedState = req.cookies?.SPOTIFY_STATE_KEY ?? null;

  if (!code || !state || state !== storedState) {
    return res.status(404).send("😞");
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

  const userData: Spotify.MeObject = await userResponse.json();

  // Store in database
  const user = {
    id: uuid(),
    email: userData.email,
    displayName: userData.display_name
  };

  // Store in session/redis alternatively store in database and access by custom session token
  const spotifyAuthentication = {
    userId: user.id,
    accessToken: access_token,
    refreshToken: refresh_token
  };

  return res.status(200).send("You have a code 🥳");
};
