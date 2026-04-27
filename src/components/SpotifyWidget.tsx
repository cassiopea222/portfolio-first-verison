"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type NowPlayingPayload = {
  song: string | null;
  artist: string | null;
  album?: string | null;
  albumArt: string | null;
  isPlaying: boolean;
  playedAt: string | null;
  trackUrl: string | null;
};

const FALLBACK_ALBUM_ART = "/about/album.jpg";
const FALLBACK: NowPlayingPayload = {
  song: "Man Of The Year",
  artist: "Lorde",
  album: "Virgin",
  albumArt: FALLBACK_ALBUM_ART,
  isPlaying: false,
  playedAt: null,
  trackUrl: "https://open.spotify.com/",
};

const REFRESH_INTERVAL_MS = 30_000;

function formatRelative(isoOrNull: string | null, isPlaying: boolean): string {
  if (isPlaying) return "Now playing";
  if (!isoOrNull) return "";
  const then = new Date(isoOrNull).getTime();
  if (Number.isNaN(then)) return "";

  const diffSec = Math.max(0, Math.round((Date.now() - then) / 1000));
  if (diffSec < 60) return "Just now";
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin} min${diffMin === 1 ? "" : "s"} ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hr${diffHr === 1 ? "" : "s"} ago`;
  const diffDay = Math.round(diffHr / 24);
  return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
}

/**
 * 3-bar equalizer icon matching the Figma "Last played" eyebrow.
 * Each bar runs its own keyframe with a different duration so they go in and
 * out of phase forever — gives the impression of a live audio visualizer
 * rather than a synchronized pulse. Respects `prefers-reduced-motion`.
 */
function EqualizerIcon() {
  const bars: Array<{
    keyframe: "spotify-bar-a" | "spotify-bar-b" | "spotify-bar-c";
    duration: string;
    delay: string;
  }> = [
    { keyframe: "spotify-bar-a", duration: "880ms", delay: "0ms" },
    { keyframe: "spotify-bar-b", duration: "1240ms", delay: "120ms" },
    { keyframe: "spotify-bar-c", duration: "720ms", delay: "300ms" },
  ];
  return (
    <span
      aria-hidden
      className="flex shrink-0 items-end gap-[2px]"
      style={{ height: 10 }}
    >
      {bars.map((bar, i) => (
        <span
          key={i}
          className="spotify-bar block w-[2px] rounded-[1px] bg-[#818790]"
          style={{
            // Full-height bars; the keyframes scaleY them down to varying
            // resting heights so we can't tell which bar is "tallest".
            height: 10,
            transformOrigin: "bottom",
            animationName: bar.keyframe,
            animationDuration: bar.duration,
            animationDelay: bar.delay,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDirection: "alternate",
          }}
        />
      ))}
    </span>
  );
}

export default function SpotifyWidget({ className = "" }: { className?: string }) {
  const [data, setData] = useState<NowPlayingPayload>(FALLBACK);
  const [, setTick] = useState(0);
  const aborterRef = useRef<AbortController | null>(null);

  const fetchNow = useCallback(async () => {
    aborterRef.current?.abort();
    const controller = new AbortController();
    aborterRef.current = controller;
    try {
      const res = await fetch("/api/spotify/now-playing", {
        signal: controller.signal,
        cache: "no-store",
      });
      if (!res.ok) return;
      const json = (await res.json()) as Partial<NowPlayingPayload>;
      // If the API returns nulls (e.g. Spotify history empty), keep the fallback
      // visible rather than rendering a broken card.
      if (!json.song) return;
      setData({
        song: json.song,
        artist: json.artist ?? "",
        album: json.album ?? null,
        albumArt: json.albumArt ?? FALLBACK_ALBUM_ART,
        isPlaying: Boolean(json.isPlaying),
        playedAt: json.playedAt ?? null,
        trackUrl: json.trackUrl ?? null,
      });
    } catch {
      // Network or abort — leave previous state intact.
    }
  }, []);

  useEffect(() => {
    // setState only fires inside the fetch's resolved callback (the
    // recommended "subscribe for external updates" pattern), so the kick-off
    // call is safe — it's just awaited asynchronously.
    const kickoff = setTimeout(() => {
      void fetchNow();
    }, 0);
    const id = setInterval(fetchNow, REFRESH_INTERVAL_MS);
    // Re-tick once a minute so the "X mins ago" label stays accurate even
    // when the underlying data hasn't changed.
    const labelId = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => {
      clearTimeout(kickoff);
      clearInterval(id);
      clearInterval(labelId);
      aborterRef.current?.abort();
    };
  }, [fetchNow]);

  const subtitle =
    data.album && data.artist
      ? `${data.artist} — ${data.album}`
      : data.artist ?? "";

  const relativeLabel = formatRelative(data.playedAt, data.isPlaying);
  const href = data.trackUrl ?? "https://open.spotify.com/";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-tooltip="Open in Spotify"
      aria-label={
        data.isPlaying
          ? `Now playing on Spotify: ${data.song} by ${data.artist}`
          : `Last played on Spotify: ${data.song} by ${data.artist}`
      }
      className={[
        "flex flex-col gap-[6px] overflow-hidden rounded-[12px] border border-[#cecece] px-3 py-2",
        "bg-gradient-to-b from-[#fefefe] via-[#eceeef] to-[#e7e7e8]",
        "shadow-[1px_2px_5px_0px_rgba(0,0,0,0.08)]",
        "outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-focus-ring)] focus-visible:ring-offset-2",
        className,
      ].join(" ")}
    >
      <div className="type-mono flex items-start justify-between text-[14px] font-normal leading-5 text-[var(--text-tertiary)]">
        <span className="flex items-baseline gap-2">
          <EqualizerIcon />
          <span>{data.isPlaying ? "Now playing" : "Last played"}</span>
        </span>
        <span aria-live="polite">
          {data.isPlaying ? (
            <span className="inline-flex items-center gap-[6px]">
              <span
                aria-hidden
                className="spotify-pulse inline-block h-[6px] w-[6px] rounded-full bg-[#1db954]"
                style={{
                  animationName: "spotify-pulse",
                  animationDuration: "1.6s",
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                }}
              />
              <span>live</span>
            </span>
          ) : (
            relativeLabel
          )}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative h-[66px] w-[68px] shrink-0 overflow-hidden rounded-[6px]">
          <Image
            src={data.albumArt ?? FALLBACK_ALBUM_ART}
            alt={data.album ? `${data.album} album art` : ""}
            fill
            sizes="68px"
            className="object-cover"
            unoptimized={!!data.albumArt && !data.albumArt.startsWith("/")}
          />
        </div>
        <div className="type-mono flex min-w-0 flex-col gap-[2px]">
          <p className="truncate text-[16px] font-medium leading-6 text-[var(--text-primary)]">
            {data.song}
          </p>
          <p className="truncate text-[14px] font-medium leading-5 tracking-[-0.14px] text-[var(--text-tertiary)]">
            {subtitle}
          </p>
        </div>
      </div>
    </a>
  );
}
