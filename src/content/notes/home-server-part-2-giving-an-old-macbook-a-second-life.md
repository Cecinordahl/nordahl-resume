---
title: "Home Server, Part 2: Giving an Old MacBook a Second Life"
date: 2026-11-03
tags: ["Self-Hosting", "Ubuntu", "Coolify", "Cloudflare", "Docker"]
---

In [part one](/notes/home-server-part-1-choosing-a-stack-and-prepping-an-old-macbook) I picked a stack and got a verified Ubuntu USB stick ready. This part covers turning the laptop into an actual server: installing Ubuntu Server on a 2016 MacBook Pro, making it behave like a server, installing Coolify, and connecting it to the internet with Cloudflare Tunnel. Moving my first real project off Render gets [its own note](/notes/home-server-part-3-moving-my-projects-off-render).

All of it, including that first move, fit into two short evenings after dinner.

## Installing Ubuntu (Without a Space Bar)

Booting from USB was the easy part: hold Option at startup and pick the yellow **EFI Boot** drive. Then I hit the first surprise of the project. **The MacBook's space bar is broken.** The keycap is gone and only the bare switch is left.

The Ubuntu installer is keyboard-only, and it uses Space to tick checkboxes. Some workarounds I found:

- **Enter also toggles checkboxes** in the installer, so Space isn't actually needed.
- **The installer didn't fit the screen.** The Done/Back buttons were drawn below the visible area. Pressing **Tab** jumped to the hidden buttons, followed by **Enter** (or **↑** first to land on Done instead of Back). Once I hit Back by accident, which did no harm.
- **Wi‑Fi was the scary part,** because older MacBooks use Broadcom chips. The chip (BCM4350) was detected, but the network scan didn't find anything, and I couldn't type my Wi‑Fi name because it has a space in it. So I **renamed my iPhone's hotspot** to a single word and installed over that.

Other choices during install:

- Use the **entire disk**, with LVM unticked. This is the point where macOS is erased.
- **No disk encryption.** A server has to reboot without someone typing a passphrase.
- **OpenSSH server** enabled, with password login on for now.
- **No snaps**, since Coolify installs Docker itself.

The installer offered an upgrade to Ubuntu 26.04. I'm staying on **24.04 LTS** because that's what Coolify supports best.

## Turning a Laptop Into a Server

A fresh Ubuntu install on a laptop still behaves like a laptop. The next evening I plugged in a USB keyboard and fixed that.

**1. Never sleep.** Masking the sleep targets makes suspend impossible:

```bash
sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target
```

**2. Ignore the lid.** A small drop-in config tells systemd to do nothing when the lid closes:

```ini
# /etc/systemd/logind.conf.d/lid.conf
[Login]
HandleLidSwitch=ignore
HandleLidSwitchExternalPower=ignore
```

I tested it by checking `uptime`, closing the lid for two minutes, and checking again. The session survived and uptime kept counting, so the server keeps running with the lid closed.

**3. Make the console readable.** The default font on a Retina screen is tiny. `sudo dpkg-reconfigure console-setup` → Terminus, 16x32 fixed it.

**4. Fix the screen that lied about its size.** Throughout the setup, the bottom of the screen was cut off. Command output disappeared, and nano's menu was invisible. `stty size` reported **56 rows × 180 columns**, but printing `seq 100` showed that only **50 rows** were visible. Ubuntu was drawing for a slightly larger screen than the panel actually has. Adding one line to `~/.bashrc` fixed it for the laptop's own console, without affecting SSH sessions:

```bash
[ "$(tty)" = /dev/tty1 ] && stty rows 50 cols 160
```

**5. Home Wi‑Fi.** I added my real network as a **second netplan file** (`/etc/netplan/60-home-wifi.yaml`) next to the hotspot config, so the hotspot still works as a fallback. The file contains the Wi‑Fi password, so it's `chmod 600`. `netplan generate` checks for errors before `netplan apply`. After a reboot, the server rejoined home Wi‑Fi by itself.

**6. Updates and a firewall.** `apt upgrade` installed the 27 pending updates. Then `ufw` was set to allow only SSH. One caveat I learned: **Docker manages its own firewall rules and bypasses ufw** for published container ports. The real protection here is that my router forwards no ports at all, so nothing on the internet can reach the server directly. ufw is an extra layer.

**7. A fixed address.** My router (eero) normally gives the server the same IP, but that isn't guaranteed. A **DHCP reservation** in the eero app pins it, so bookmarks and configs never break.

## Installing Coolify

The install itself was one command:

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
```

It installed Docker and Coolify in a few minutes. Then I opened the dashboard on my phone on port 8000 and **created the admin account immediately**, because the first visitor becomes admin, and there's a 10-minute window.

During onboarding I picked **"This machine"** as the server. I had to stop and think about that one, since I was on my phone, but "this machine" means the computer Coolify runs on, not the device showing the dashboard.

The dashboard is only reachable on my home network, which I'm happy with for now.

## Cloudflare Tunnel: Getting Traffic In

This is the piece that makes self-hosting at home realistic. Instead of opening router ports, the server makes an **outbound** connection to Cloudflare, and Cloudflare routes visitors through it.

```
Visitor → *.cnordahl.com → Cloudflare → tunnel → MacBook → Coolify proxy → app
```

The setup follows Coolify's "all resources" approach:

1. Create a tunnel in Cloudflare and copy its **token**.
2. Deploy **cloudflared** as a one-click service in Coolify, with the token as an environment variable.
3. Add **one wildcard route**: `*.cnordahl.com` → `http://localhost:80`, which is Coolify's built-in proxy.

With the wildcard route in place, each new app only needs a domain set in Coolify. I don't have to touch Cloudflare again. Existing DNS records still win over the wildcard, so nothing already on the domain broke.

(I double-tapped a button along the way and ended up with two projects and two cloudflared services. One of them had exited, so it was easy to tell which to delete.)

The first test, `test.cnordahl.com`, returned a **503 page from Coolify**. That was actually good news: the request had travelled all the way to my laptop, and 503 only meant no app had that name yet.

## Lessons

- **Old hardware has quirks you can't plan for.** A missing space bar shaped the whole install. Be ready to improvise.
- **"Looks wrong" isn't always broken.** Hidden buttons and a 503 page each turned out to be a sign of progress once I understood what was producing them.
- **Measure before you fix.** The screen problem was solved by comparing what Ubuntu thought (`stty size`) with what was actually visible (`seq 100`).

## What's Next

- **Move a real project.** That's [part three](/notes/home-server-part-3-moving-my-projects-off-render).
- Add an **uptime monitor** that alerts me if the server goes down. It has to run somewhere else: a monitor on the server can't report its own death.
- **SSH keys** from my phone, then turn off password login.
- Automatic **backups** to Cloudflare R2 once a project with its own database moves over.

The server is up, reachable, and awake. It just has nothing to serve yet.
