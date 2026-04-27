import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";

// Run on Node so we can use `Buffer` for the Spotify Basic auth header.
export const runtime = "nodejs";
// Always fetch fresh data from Spotify on each request — the widget polls every
// 30s, but we cache lightly at the edge to absorb burst refreshes.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getNowPlaying();
    if (!data) {
      return NextResponse.json(
        { song: null, artist: null, albumArt: null, isPlaying: false, playedAt: null, trackUrl: null },
        {
          status: 200,
          headers: {
            "Cache-Control": "public, s-maxage=20, stale-while-revalidate=60",
          },
        },
      );
    }
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=20, stale-while-revalidate=60",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "spotify_failed", message },
      { status: 500 },
    );
  }
}
