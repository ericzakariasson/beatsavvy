import { Request, Response } from 'express';
import * as qs from 'qs';

export const login = (req: Request, res: Response) => {
  const state = 'what is state';
  const scope = 'user-read-private user-read-email';

  res.cookie('spotifyState', state);

  const query = qs.stringify({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    redirect_uri: 'http://localhost:4000/auth/callback',
    scope,
    state
  });

  res.redirect(`https://accounts.spotify.com/authorize?${query}`);
};

export const loginCallback = (req: Request, res: Response) => {
  const code = req.query.code || null;

  if (code) {
    return res.status(200).send('You have a code 🥳');
  }

  return res.status(403).send("You don't have a code 😞");
};
