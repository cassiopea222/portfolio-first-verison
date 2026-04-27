#!/usr/bin/env node
/**
 * One-time helper for getting a Spotify refresh token via the Authorization
 * Code flow. Run with:
 *
 *   node scripts/get-spotify-refresh-token.mjs
 *
 * Requires SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in your shell or in
 * `.env.local`. Make sure `http://127.0.0.1:8888/callback` is registered as a
 * Redirect URI in your Spotify app dashboard
 * (https://developer.spotify.com/dashboard).
 *
 * The script:
 *   1. Spins up a tiny localhost HTTP server.
 *   2. Opens Spotify's consent screen with the requested scopes.
 *   3. Catches the redirect, exchanges the code for tokens, prints the
 *      refresh token, and exits.
 *
 * Paste the printed value into `.env.local` as SPOTIFY_REFRESH_TOKEN.
 */

import { createServer } from "node:http";
import { exec } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { URL } from "node:url";

const REDIRECT_URI = "http://127.0.0.1:8888/callback";
const PORT = 8888;
const SCOPES = ["user-read-recently-played", "user-read-playback-state"];

function loadDotEnv() {
  const candidates = [".env.local", ".env"];
  for (const file of candidates) {
    if (!existsSync(file)) continue;
    const text = readFileSync(file, "utf8");
    for (const rawLine of text.split("\n")) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      let value = line.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  }
}

function openBrowser(url) {
  const platform = process.platform;
  const cmd =
    platform === "darwin"
      ? `open "${url}"`
      : platform === "win32"
        ? `start "" "${url}"`
        : `xdg-open "${url}"`;
  exec(cmd, (err) => {
    if (err) {
      console.log("\nCould not auto-open the browser. Open this URL manually:");
      console.log(url);
    }
  });
}

async function main() {
  loadDotEnv();

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error(
      "Missing SPOTIFY_CLIENT_ID and/or SPOTIFY_CLIENT_SECRET. Set them in .env.local or your shell.",
    );
    process.exit(1);
  }

  const state = Math.random().toString(36).slice(2);
  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("scope", SCOPES.join(" "));
  authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.set("state", state);

  const server = createServer(async (req, res) => {
    if (!req.url) {
      res.statusCode = 400;
      res.end("Bad request");
      return;
    }
    const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
    if (url.pathname !== "/callback") {
      res.statusCode = 404;
      res.end("Not found");
      return;
    }

    const error = url.searchParams.get("error");
    const code = url.searchParams.get("code");
    const returnedState = url.searchParams.get("state");

    if (error) {
      res.end(`Spotify returned an error: ${error}. You can close this tab.`);
      console.error(`\nSpotify auth error: ${error}`);
      server.close();
      process.exit(1);
    }
    if (!code || returnedState !== state) {
      res.end("Invalid response. You can close this tab.");
      console.error("\nMissing code or state mismatch.");
      server.close();
      process.exit(1);
    }

    try {
      const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
      const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${basic}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: REDIRECT_URI,
        }),
      });
      const json = await tokenRes.json();
      if (!tokenRes.ok) {
        res.end(`Token exchange failed: ${JSON.stringify(json)}. You can close this tab.`);
        console.error("\nToken exchange failed:", json);
        server.close();
        process.exit(1);
      }

      res.end("Success! You can close this tab and return to the terminal.");

      console.log("\n✓ Got tokens from Spotify.\n");
      console.log("Add this line to .env.local (do NOT commit it):\n");
      console.log(`  SPOTIFY_REFRESH_TOKEN=${json.refresh_token}\n`);
      console.log("Granted scopes:", json.scope);
      console.log("Access token expires in:", json.expires_in, "seconds (auto-refreshed by the app).");

      server.close();
      process.exit(0);
    } catch (err) {
      res.end("Token exchange threw. You can close this tab.");
      console.error("\nToken exchange threw:", err);
      server.close();
      process.exit(1);
    }
  });

  server.listen(PORT, "127.0.0.1", () => {
    console.log(`\nListening on ${REDIRECT_URI}`);
    console.log("Opening Spotify consent screen…\n");
    console.log("If your browser doesn't open, visit:\n", authUrl.toString(), "\n");
    openBrowser(authUrl.toString());
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
