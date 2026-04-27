# Spotify "Last played" widget

A small live widget on the About page that shows whatever I'm currently
playing on Spotify, or the most recent track if nothing's playing. The
secrets stay on the server; the browser only ever sees the rendered track
metadata.

## How it works

```
┌──────────────────────┐    fetch /api/spotify/now-playing
│   <SpotifyWidget />  │  ───────────────────────────────►  ┌────────────────┐
│   client component   │                                    │  Next.js API   │
│   polls every 30s    │  ◄───────────────────────────────  │  route (node)  │
└──────────────────────┘    { song, artist, albumArt, … }   └───────┬────────┘
                                                                    │
                                                          uses refresh_token to
                                                          mint short-lived access
                                                          tokens, then calls
                                                          api.spotify.com
```

- `src/lib/spotify.ts` — server-only token refresh + Spotify API client
- `src/app/api/spotify/now-playing/route.ts` — `GET` returns
  `{ song, artist, album, albumArt, isPlaying, playedAt, trackUrl }`
- `src/components/SpotifyWidget.tsx` — client component, polls every 30s,
  animates the equalizer + green dot when something is playing, otherwise
  shows `"X mins ago"`. Click opens the track in Spotify.

## One-time setup

### 1. Create a Spotify app

1. Go to <https://developer.spotify.com/dashboard> → **Create app**.
2. Add a Redirect URI: `http://127.0.0.1:8888/callback`.
3. Copy the **Client ID** and **Client Secret**.

### 2. Fill in `.env.local`

```bash
cp .env.example .env.local
```

Edit `.env.local` and paste the client ID and secret. Leave
`SPOTIFY_REFRESH_TOKEN` blank for now.

### 3. Get the refresh token

Run the included helper script. It boots a tiny local server on port 8888,
opens Spotify's consent screen, and prints the refresh token when you
approve.

```bash
node scripts/get-spotify-refresh-token.mjs
```

Required scopes: `user-read-recently-played`, `user-read-playback-state`.

Paste the printed `SPOTIFY_REFRESH_TOKEN=...` line into `.env.local`.

### 4. Run the dev server

```bash
npm run dev
```

Visit <http://localhost:3000/about>. The widget should hit
`/api/spotify/now-playing` and show your latest track within a second.

## Deployment

Add the same three env vars on the deployment platform (Vercel → Project
Settings → Environment Variables):

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

The refresh token is long-lived. Spotify only invalidates it if you change
your password, revoke the app, or rotate the client secret.

## API contract

`GET /api/spotify/now-playing` →

```ts
{
  song: string;
  artist: string;
  album: string;
  albumArt: string | null;   // ~300px image URL from i.scdn.co
  isPlaying: boolean;
  playedAt: string | null;   // ISO timestamp; null while currently playing
  trackUrl: string;          // open.spotify.com link
}
```

If Spotify returns no recent tracks at all, the route responds with the
same shape but with `null`/`false` values; the widget then falls back to
its static placeholder.
