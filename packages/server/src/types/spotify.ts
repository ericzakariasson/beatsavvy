declare module "@app/types/spotify" {
  export interface SpotifyUser {
    country: string;
    display_name: string;
    email: string;
    id: string;
    images: SpotifyUserImage[];
  }

  interface SpotifyUserImage {
    url: string | null;
    height: number | null;
    width: number | null;
  }
}
