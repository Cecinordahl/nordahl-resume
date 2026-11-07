---
title: "Home Server, Part 1: Choosing a Stack and Prepping an Old MacBook"
date: 2026-11-02
tags: ["Self-Hosting", "Ubuntu", "Coolify", "Cloudflare"]
---

Some of my side projects live on Render's free tier, and I've finally had enough of one thing: they go to sleep. After about 15 minutes without traffic, Render spins the service down, and the next visitor waits a couple of minutes while it wakes back up. For a hobby project that's tolerable. For something you actually want to show people, it's painful.

I don't want to pay for hosting for small hobby projects, but I do have a 2016 MacBook Pro in a drawer that I'm never going to use again. So the plan is to wipe it, install Linux, and turn it into an always-on server for my sites. This note covers the first part: picking an approach and getting the install media ready. The machine itself gets wiped next.

## First: Who's Actually Sleeping?

I'd been thinking of my hosting as "Vercel with Render", but it's worth separating the two. Vercel's free tier doesn't sleep. The cold starts come entirely from Render. That narrowed the scope: I don't need to move everything, only the projects running on Render, some of which have small databases.

## Options I Considered

Before committing to hardware, I looked at a few free alternatives:

- **Keep Render awake with a pinger.** A free uptime monitor (UptimeRobot, cron-job.org) hits the service every ~10 minutes so it never idles. It works, but Render gives 750 free hours a month, which is roughly one always-on service. With several projects, it falls apart.
- **Oracle Cloud "Always Free".** A real cloud VM that never sleeps, for free. The catch: signup can be fiddly and idle instances can be reclaimed.
- **Self-host on the old laptop.** Full control, no limits, no sleeping, and I'd learn a lot. The tradeoffs are that uptime depends on my home power and internet, and security becomes my job.

I went with self-hosting. Part of the appeal is simply understanding what Vercel and Render are doing for me behind the scenes.

## The Stack

A home server breaks down into three decisions.

**1. Operating system: Ubuntu Server 24.04 LTS.** Free, headless, and documented everywhere. I picked 24.04 over the newer 26.04 because it's what Coolify supports best. Boring and stable is the point.

**2. Deployment: Coolify.** This was the part that made the whole idea feel doable. Coolify (and its alternative, Dokploy) is a free, self-hosted platform that works like Vercel or Render: connect GitHub, push code, and it builds, deploys, handles HTTPS, runs databases, and shows logs in a dashboard. I chose Coolify over Dokploy for its larger community and its official Cloudflare Tunnel guide. One thing I didn't realise at first: Coolify only runs on Linux, which is why macOS has to go.

**3. Getting traffic in: Cloudflare Tunnel.** This is the clever bit. Normally, hosting from home means opening ports on your router, exposing your home IP, and hoping your ISP isn't using CGNAT (which blocks incoming connections entirely). With Cloudflare Tunnel, the server makes an *outbound* connection to Cloudflare, and Cloudflare routes visitors through it. No open ports, my IP stays hidden, and HTTPS comes for free. My domains are already on Cloudflare, so it's a natural fit.

I briefly considered Tailscale Funnel (simpler, but you're stuck with `*.ts.net` URLs) and classic port forwarding with dynamic DNS (more exposure, more to secure). Neither made sense for me.

## The Hardware Reality Check

The machine: a ~2016 13" MacBook Pro, 2.3 GHz dual-core i5, 8 GB RAM. That's plenty for a handful of hobby sites. Coolify wants 2 GB minimum. A few things to keep in mind with an old laptop as a server:

- **A laptop is actually a decent server.** It draws maybe 10–20 W (an old desktop tower can use 50–100 W+), and the battery doubles as a built-in UPS during short power cuts.
- **Battery health matters.** Plugged in 24/7 at 100%, an old battery can swell. Mine reports "Normal", but it's something to keep an eye on.
- **Wi‑Fi is the main unknown.** Older MacBooks use Broadcom Wi‑Fi chips, which Linux supports, though they can be temperamental. I'm running on Wi‑Fi (good fiber, good coverage), and my fallback for the install is tethering my iPhone over USB.

## Preparing the Install USB

This should have been the easy part, and it taught me something.

I downloaded the Ubuntu Server 24.04.5 ISO and **verified its SHA256 checksum** against Ubuntu's published `SHA256SUMS` file. It's a small habit that confirms a 4 GB download arrived intact and untampered. Then I used **balenaEtcher** to write ("flash") the image to a 16 GB USB stick. Etcher keeps it simple: pick the file, pick the drive, hit Flash.

The first flash failed with an error and a "Retry" button. Afterwards, the stick no longer showed up in Finder, which made me think I'd broken it. That part was normal: macOS can't read the Linux filesystem on a flashed Ubuntu stick, so it just hides it. Running `diskutil list` showed the stick was there and had the Ubuntu partition layout.

But "looks right" isn't "is right", so I compared the stick byte-for-byte against the ISO:

```bash
sudo cmp -n <iso-size-in-bytes> ubuntu-24.04.5-live-server-amd64.iso /dev/rdisk2
```

It reported a mismatch about 650 MB in, so the first write really was corrupted. My suspicion is the USB-A to USB-C adapter (the MacBook only has USB-C ports). Cheap or loose adapters and hubs are a classic cause of failed writes. I reseated it, kept the connection as simple as possible, flashed again, and this time got **Flash Complete**. Etcher validates the write itself before showing that message.

**Lesson:** a corrupted install stick would have shown up later as a weird, hard-to-diagnose install failure. Two minutes of verifying up front is worth it.

## What's Next

The USB stick is ready, and the MacBook is about to be wiped. The rest of the plan:

1. **Install Ubuntu Server.** Boot from USB (hold Option at startup), connect to Wi‑Fi, use the whole disk, and make sure OpenSSH server is enabled.
2. **Turn it into a server.** SSH key login, no sleeping when the lid is closed, automatic security updates, a firewall, and a fixed local IP.
3. **Install Coolify** and connect it to GitHub.
4. **Set up Cloudflare Tunnel** so my domains point at the laptop.
5. **Migrate one Render project** as a test, including moving its database, before switching DNS.
6. **Move the rest**, then add automatic database backups to Cloudflare R2 and an uptime monitor that alerts me if something goes down.

The end goal: a push-to-deploy setup like Render's, minus the cold starts and the bill, running on hardware that would otherwise sit in a drawer. In [part two](/notes/home-server-part-2-giving-an-old-macbook-a-second-life), the MacBook gets wiped and becomes a server.
