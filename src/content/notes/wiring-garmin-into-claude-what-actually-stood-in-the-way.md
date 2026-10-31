---
title: "Wiring Garmin Into Claude: What Actually Stood in the Way"
date: 2026-10-31
tags: ["Garmin API","Claude","MCP Connectors","Dashboards"]
---
I wanted something simple: my Garmin data (training, sleep, HRV, resting heart rate) in a dashboard inside Claude, so I could look at trends and talk to my "AI coach" with real numbers instead of vibes. It took one conversation to get there, but not along the path I expected. The hard part wasn't technical difficulty. It was knowing which pieces existed and where each one is allowed to talk to the internet.

These are my notes on what I learned, mostly so I remember the mental model and don't repeat the dead ends.

## Garmin now has a personal API

For years the answer to "can I use Garmin's API?" was "only if you're a business accepted into their developer program." That changed in October 2026 when Garmin launched the **Connect Personal API**. You generate a key yourself in Garmin Connect on the web (Settings → Personal API Key). There's no application and no approval step.

A few things worth knowing:

- **The key is shown once.** Copy it right away. If you lose it, delete it and create a new one.
- **You choose the expiry**: 30 days, 90 days, 180 days or a year.
- **Authentication takes two steps.** You exchange the key for a short-lived access token (`Authorization: ApiKey <key>`), then call the data endpoints with that token (`Authorization: Bearer <token>`).
- **It's read-only.** You can pull activities, daily summaries, sleep, HRV, stress and Body Battery. Training readiness, training status, VO2 max and personal records aren't included.
- There's a Python package, `garmin-connect-personal-api-python`, that handles the token exchange and wraps the endpoints. It lists Garmin as the author, though I couldn't confirm it's an official release.

The first thing I learned: when I asked Claude about this without context, it confidently gave me the *old* answer. The API is newer than its training data, so it told me personal API keys weren't a thing, right up until I showed it a screenshot of my key. Lesson: for anything recent, tell the AI to search first.

## The real problem: three places, three sets of rules

This was the "aha" moment. When you use Claude to build something that fetches data, three different places are involved, and each has its own network rules:

| Place | What it does | Can it reach Garmin? |
|---|---|---|
| **The chat's sandbox** (cloud computer) | Runs code: scripts, data processing | Only if you allow the domain |
| **The dashboard** (artifact in your browser) | Displays data, calls your connectors | No. It can only talk to connectors |
| **Connectors** (servers on the internet) | Fetch data on demand, any time | Yes, if one exists for the service |

My analogy: the sandbox is a workshop with a locked front door. The dashboard is a display window that can only take deliveries from approved couriers. A connector is one of those couriers.

When Claude first tried calling Garmin from the sandbox, the request was blocked before it left the building. That's not because Garmin is special. The sandbox only allows a short list of domains by default, mostly package registries. Strava was blocked too when we tested it.

## Why the allowed-domains list exists (and why opening it was fine)

At first the block felt arbitrary. It makes sense once you think about what the sandbox can do. Code running there could read your data and send it anywhere. If the AI read a web page with hidden instructions, it could be tricked into sending your data to a stranger's server. An allowlist closes that door by default.

The fix took about ten seconds, just add `personal.connectapi.garmin.com` to the allowed domains in Claude's settings (under Capabilities). Garmin's own API is about as safe a domain as you can open. After that, the sandbox could exchange my key for a token and pull 90 days of data in one go: 114 activities, plus daily sleep, HRV, stress and Body Battery.

What I'd stress: none of this was hard. Adding a domain and generating a key are easier than most app settings. What was hard was *knowing* that this was the path. Claude tends not to suggest loosening a security setting on its own, and it couldn't know what the sandbox would allow until it tested.

## Connectors vs. "just code": why Strava felt easier

I'd previously built a "StravaGPT" in ChatGPT and thought of it as "just some simple code, no hosting." Looking back, that wasn't true. **ChatGPT's GPT Actions are OpenAI's equivalent of a connector**: OpenAI's servers make the API calls and handle the OAuth flow. There was a server involved the whole time, I just never saw it.

A comparison that helped me:

- **GPT Actions (ChatGPT):** you give it an OpenAPI schema and OpenAI calls the REST API directly. No server of your own. But it's built for standard auth, so Garmin's two-step key-to-token exchange probably wouldn't work without a middle layer. I haven't tested this.
- **Custom connectors (Claude):** Claude doesn't call arbitrary REST APIs. It talks to an **MCP server**, so for Garmin you'd host a small one yourself.
- **Ready-made connectors:** Strava has an official one in Claude's directory. Garmin doesn't, at least not yet.

## What I ended up with

The setup that works today, with no installs on my locked-down work laptop:

1. **The personal API key** from Garmin Connect.
2. **The allowed domain** in Claude's settings.
3. **A Python export script** that runs in the chat's sandbox. It pulls in 4-week chunks and carries on if one data type fails.
4. **A small flattening step** that turns Garmin's nested JSON into two tidy files: one row per day (steps, resting HR, Body Battery, stress, sleep stages, HRV and its baseline range), and one row per activity.
5. **A Claude dashboard artifact** in Norwegian, showing:
   - Last night's sleep, HRV status and resting heart rate in one sentence at the top
   - Last 7 days vs. the 7 before for training time, sessions, sleep, HRV and resting HR
   - Weekly training hours by type, sleep per night, HRV against Garmin's normal range, and resting heart rate
   - The 20 latest activities

One design choice I'm glad I made: "training" excludes walks, hikes and golf. My watch auto-logs a *lot* of walks (70 in 90 days), and they'd have drowned out the actual workouts.

**How updates work:** I type "update" in a chat, and Claude re-runs the export and swaps in the new data files. It's not a button, because the dashboard can only call connectors, not the sandbox. A true one-click refresh means hosting my own Garmin MCP connector, for example on Cloudflare Workers, which can be set up entirely in the browser. That's the next step, and the dashboard won't need to change for it. Only the data source does.

## Making it reusable across chats

Each new chat gets a fresh, empty sandbox, so the key and the method don't carry over on their own. My fix was to put everything in my Claude **Project**:

- **A project doc** with the dashboard link, the scripts, the data schema and step-by-step update instructions. It also holds the key, which is a conscious trade-off: convenient, but it sits in plain text in the project.
- **One line in the project instructions** telling every chat to read that doc whenever I ask about training, recovery or the dashboard, and to use fresh Garmin data when adjusting my program.

Now any new chat in the project can either refresh the dashboard or act as a coach that checks my HRV and sleep before suggesting a hard session.

## A prompt you can use

If you want to build this yourself, this is the prompt I wish I'd started with. It's written for **Claude** (claude.ai with code execution and artifacts). Generate your Garmin Personal API key first, but don't paste it into the chat until Claude asks for it.

Here's the whole flow in 90 seconds:

![Step-by-step video: from creating a Garmin Personal API key to a finished dashboard in Claude](/images/notes/garmin/garmin-dashboard-steps.mp4)

*Voice-over generated with [ElevenLabs](https://elevenlabs.io).*

```text
I want to connect my Garmin data to Claude and build a personal dashboard.

Context you might not have: Garmin launched a "Connect Personal API" in
October 2026. Any user can generate a personal API key in Garmin Connect on
the web (Settings → Personal API Key). The key is exchanged for a short-lived
bearer token at:
POST https://personal.connectapi.garmin.com/personalapitoken-service/personal-api/personal-api-key/token
with the header "Authorization: ApiKey <key>". Search the web for the current
Garmin Personal API docs before assuming anything.

Please:
1. Test whether your sandbox can reach personal.connectapi.garmin.com. If it's
   blocked, tell me exactly which domain to add to the allowed domains in my
   Claude settings, then test again after I've added it.
2. Once it's reachable, ask me for the key. Store it in a file with
   owner-only permissions and never print it.
3. Use the Python package garmin-connect-personal-api-python to pull the last
   90 days: activities, daily summaries, sleep, HRV, stress and Body Battery.
   Request data in small date chunks and keep going if one section fails.
4. Show me which fields actually came back before designing anything.
5. Build a simple dashboard artifact: last night's sleep/HRV/resting HR,
   last 7 days vs. the previous 7, weekly training time, sleep and HRV
   trends, and a table of recent activities. Leave walks out of "training"
   unless I say otherwise.
6. Explain how I can update the data later. If I'm in a Project, offer to
   write a project doc so future chats know how to do it.

Be honest about anything you're unsure of, and ask before making
assumptions about which metrics I care about.
```

**Using a different AI?** The Garmin side is the same (key → token → data), but the plumbing differs:

- **ChatGPT:** Custom GPT Actions call APIs from OpenAI's servers. Garmin's two-step token exchange will likely need a small proxy in between.
- **Any AI:** the simplest fallback is to run the export script on your own machine and upload the JSON file for analysis.
- **Claude Code**, on a computer where you can install things: you can skip the allowed-domains step entirely and run a community Garmin MCP server locally.
