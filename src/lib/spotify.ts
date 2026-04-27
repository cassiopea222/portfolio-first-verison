/**
 * Spotify Web API helpers (server-only).
 *
 * Reads `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`
 * from the environment and exchanges them for short-lived access tokens.
 * The refresh token is obtained once via the Authorization Code flow — see
 * `scripts/get-spotify-refresh-token.mjs` and `SPOTIFY_SETUP.md`.
 *
 * Never import this module from a client component.
 */

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

export type NowPlayingResult = {
  song: string;
  artist: string;
  album: string;
  albumArt: string | null;
  isPlaying: boolean;
  /** ISO timestamp of when the track was last played. `null` while currently playing. */
  playedAt: string | null;
  trackUrl: string;
};

type SpotifyImage = { url: string; width?: number; height?: number };
type SpotifyArtist = { name: string };
type SpotifyAlbum = { name: string; images: SpotifyImage[] };
type SpotifyTrack = {
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  external_urls: { spotify: string };
};

type CurrentlyPlayingResponse = {
  is_playing: boolean;
  item: SpotifyTrack | null;
  currently_playing_type?: string;
};

type RecentlyPlayedResponse = {
  items: Array<{ track: SpotifyTrack; played_at: string }>;
};

function readEnv(): {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
} {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Missing Spotify env vars. Set SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN.",
    );
  }
  return { clientId, clientSecret, refreshToken };
}

// Cache the access token in module scope. Spotify access tokens last 3600s;
// we refresh ~60s before expiry to be safe.
let cachedToken: { accessToken: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 60_000) {
    return cachedToken.accessToken;
  }

  const { clientId, clientSecret, refreshToken } = readEnv();
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Spotify token refresh failed (${res.status}): ${text}`);
  }

  const data = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };

  cachedToken = {
    accessToken: data.access_token,
    expiresAt: now + data.expires_in * 1000,
  };
  return cachedToken.accessToken;
}

function pickAlbumArt(images: SpotifyImage[] | undefined): string | null {
  if (!images || images.length === 0) return null;
  // Prefer ~300px artwork — small enough to keep the response light, but sharp
  // on retina displays for the 68×66 widget.
  const sorted = [...images].sort((a, b) => (a.width ?? 0) - (b.width ?? 0));
  return sorted.find((i) => (i.width ?? 0) >= 200)?.url ?? sorted[sorted.length - 1].url;
}

function toResult(
  track: SpotifyTrack,
  isPlaying: boolean,
  playedAt: string | null,
): NowPlayingResult {
  return {
    song: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    album: track.album.name,
    albumArt: pickAlbumArt(track.album.images),
    isPlaying,
    playedAt,
    trackUrl: track.external_urls.spotify,
  };
}

export async function getNowPlaying(): Promise<NowPlayingResult | null> {
  const accessToken = await getAccessToken();
  const auth = { Authorization: `Bearer ${accessToken}` };

  const current = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: auth,
    cache: "no-store",
  });

  // 200 with content → currently playing. 204 → nothing playing right now.
  if (current.status === 200) {
    const data = (await current.json()) as CurrentlyPlayingResponse;
    if (data.item && data.currently_playing_type === "track") {
      return toResult(data.item, data.is_playing, null);
    }
  } else if (current.status !== 204 && !current.ok) {
    const text = await current.text().catch(() => "");
    throw new Error(`Spotify currently-playing failed (${current.status}): ${text}`);
  }

  // Fall back to last played track.
  const recent = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: auth,
    cache: "no-store",
  });
  if (!recent.ok) {
    const text = await recent.text().catch(() => "");
    throw new Error(`Spotify recently-played failed (${recent.status}): ${text}`);
  }

  const data = (await recent.json()) as RecentlyPlayedResponse;
  const first = data.items[0];
  if (!first) return null;
  return toResult(first.track, false, first.played_at);
}
