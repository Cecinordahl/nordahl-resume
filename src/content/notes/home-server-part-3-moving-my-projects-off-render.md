---
title: "Home Server, Part 3: Moving My Projects Off Render"
date: 2026-11-04
tags: ["Self-Hosting", "Coolify", "Cloudflare", "Render", "Vercel"]
---

In [part two](/notes/home-server-part-2-giving-an-old-macbook-a-second-life) the old MacBook became a server: Ubuntu, Coolify, and a Cloudflare Tunnel that routes `*.cnordahl.com` to it. This part moves the first real project onto it, plus the checklist I now use for the rest.

The result: my Wherewear app's backend runs on a laptop on my shelf, starts in under four seconds, and no longer falls asleep.

## The First Project: Wherewear

Wherewear is a React frontend on Vercel and a Spring Boot backend on Render. Only the **backend** had the cold-start problem, so I moved just that and left the frontend on Vercel, which is good at frontends and doesn't sleep.

What made this one easy: the database is **Firestore**, so there was **no data to migrate**. The backend is a stateless Docker container.

**Building it in Coolify:**

- Source: **Public Git Repository**. The GitHub App option needs GitHub to reach Coolify from the internet, and my dashboard is home-only for now.
- Build pack: **Dockerfile**, with base directory `/backend`.
- **Gotcha:** the Dockerfile location is **relative to the base directory**. Coolify pre-filled `backend/Dockerfile`, which became `/backend/backend/Dockerfile` and failed. Changing it to `/Dockerfile` fixed it.
- Domain: `wherewear-api.cnordahl.com`, with protocol **http** and no HTTP→HTTPS redirect. Cloudflare provides HTTPS to visitors, and the tunnel talks plain HTTP to Coolify. Forcing HTTPS on the Coolify side can cause redirect loops.

**Environment variables:** I copied four of them from Render. The Firebase service account JSON needed **multiline** + **literal** (no `$` interpolation) so the private key wasn't altered. Secrets were set to **not available at build time**. The CORS variable got both the old and new frontend origins.

**Naming gotcha:** I used `wherewear-api.cnordahl.com` rather than `api.wherewear.cnordahl.com`. Cloudflare's free certificate covers `*.cnordahl.com`, which is only **one level deep**. A two-level subdomain would have thrown HTTPS errors.

The deploy built in about two minutes, and the log showed:

```
Started WherewearApplication in 3.685 seconds
```

Then `/api/health` returned **401 Missing bearer token**. That was also the right result: the backend was up and asking for a Firebase login.

**Wiring up the frontend:**

- On Vercel, I pointed `VITE_API_BASE_URL` at the new backend and redeployed. Vite bakes the value in at build time, so the redeploy is required. Vercel refused to store a `VITE_` variable as a **Secret**, since anything with that prefix ends up in browser code anyway. I recreated it as a **Config** variable instead, which is fine because a backend URL isn't a secret.
- I added `wherewear.cnordahl.com` as a domain on Vercel, with a CNAME in Cloudflare set to **DNS only** (grey cloud) so Vercel can issue its own certificate.
- I added the new domain to **Firebase Authentication → Authorized domains**, or Google login would fail there.

The app now lives at `wherewear.cnordahl.com`, and its data loads instantly.

## Lessons

- **A 401 can be good news.** It came from the app itself, which meant the backend was up and only asking for a login.
- **Paths are relative to something.** The only failed deploy came from two path settings adding up.
- **Subdomains only go one level deep** on Cloudflare's free certificate. `<app>-api` instead of `api.<app>` avoids the problem entirely.

## What's Next

- Leave Render running for a few days as a safety net, then **suspend and delete** it, including its Blueprint.
- Move the **other six Render backends**. With the tunnel and proxy in place, each one should be quick.
- **Auto-deploy on push**, so it really works like Render.

The laptop is closed on a shelf, plugged in, quietly serving traffic. Not bad for something that was headed for a drawer.

---

## Appendix: Moving a Project to the Server (Reference Checklist)

This is the checklist I use for the rest of my projects. Once the server, tunnel and proxy are in place, each move is quick.

### 0. Before you start

- **Which parts need to move?** Backends on Render sleep, so move them. Frontends on Vercel don't sleep, so moving them is optional (see B).
- **Database?** An external one (Firebase, Supabase, Neon, MongoDB Atlas) means **nothing to migrate**. A Render Postgres needs a dump and restore, which isn't covered here.
- **Collect from Render:** Root Directory, Dockerfile Path, and the *names* of the environment variables (Settings and Environment tabs).
- **Collect from Vercel:** environment variables, build command, output directory.
- **Pick the names:** `<app>.cnordahl.com` for the frontend and `<app>-api.cnordahl.com` for the backend. Use **one level only**: `api.<app>.cnordahl.com` gets HTTPS errors with Cloudflare's free certificate.

### A. Backend: Render → Coolify

1. **Coolify** → project → `production` → **+ New Resource** → **Public Git Repository**. (For a private repo, use a GitHub App or a deploy key instead.)
2. **Build settings:**
   - Build pack: **Dockerfile**
   - Base directory: the folder holding the Dockerfile, e.g. `/backend`
   - Dockerfile location: **relative to the base directory**, usually `/Dockerfile`
   - Port: the port in the Dockerfile's `EXPOSE`, e.g. `8080`
3. **Domain:** `http://<app>-api.cnordahl.com` (yes, `http`), with the port set, **no HTTP→HTTPS redirect**, and **not indexable**.
4. **Environment variables**, copied straight from Render:
   - Secrets: **Not available during build**
   - JSON or keys with line breaks: **Multiline** + **Literal**
   - CORS: list **every** frontend origin, comma-separated, no spaces
5. **Deploy.** The container logs should show the app starting (e.g. `Started …Application`).
6. **Test an endpoint** such as `/api/health`:
   - A 401 or 404 **from the app** means it's alive
   - A Coolify 503 page means it isn't running
   - Bad Gateway means the wrong port

### B. Frontend

**Option 1 (recommended): keep it on Vercel**

1. Vercel → **Environment Variables** → set the API URL (e.g. `VITE_API_BASE_URL=https://<app>-api.cnordahl.com`). Make it type **Config**, not Secret, for **Production + Preview**.
2. **Redeploy.** `VITE_` values are baked in at build time.
3. Custom domain: Vercel → **Domains** → add `<app>.cnordahl.com`. Then in Cloudflare, add a **CNAME** `<app>` → Vercel's target, set to **DNS only** (grey cloud).

**Option 2: move it to Coolify too**

1. Add a `Dockerfile` in the frontend folder (Vite example). Add one `ARG` line for each `VITE_` variable:

   ```dockerfile
   FROM node:20-alpine AS build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   ARG VITE_API_BASE_URL
   # ARG VITE_FIREBASE_API_KEY  …one line per VITE_ variable
   RUN npm run build

   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   RUN printf 'server { listen 80; root /usr/share/nginx/html; location / { try_files $uri /index.html; } }' \
       > /etc/nginx/conf.d/default.conf
   ```

   The `try_files` line does the same job as Vercel's rewrite: every route serves `index.html`.
2. **Coolify** → **+ New Resource** → same repo → Dockerfile, base directory `/frontend`, Dockerfile `/Dockerfile`, port `80`.
3. Env vars: `VITE_*` with **Available during build = on**. They end up in the browser anyway, so they're not secrets.
4. Domain: `http://<app>.cnordahl.com`, no redirect.
5. In Cloudflare, **delete the CNAME pointing to Vercel**. The `*.cnordahl.com` tunnel record then takes over. Remove the domain in Vercel.

### C. After the move

- **Auth:** add the new domain wherever logins are configured (Firebase → Authentication → Settings → **Authorized domains**, OAuth redirect URLs).
- **Test:** the page loads with 🔒, login works, data loads, saving works, and each external API feature works.
- **Render:** leave it running for 2–3 days → **Suspend** → then **delete** the service *and* its Blueprint if it has one.
- **Tidy the repo:** `render.yaml`, comments in `.env.example`, any cold-start "waking up" code.
- **Remember:** until auto-deploy is set up, click **Deploy** in Coolify after every `git push`.

### Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Build fails: `lstat …/backend/backend: no such file` | Dockerfile path added on top of the base directory | Dockerfile location relative to the base dir: `/Dockerfile` |
| Coolify **503** page | App not running, or domain doesn't match | Check container logs and the domain spelling |
| **Bad Gateway** | Wrong port | Set port to the app's port (`EXPOSE`) |
| `TOO_MANY_REDIRECTS` | HTTPS redirect or `https://` domain in Coolify | Use an `http://` domain, redirect off |
| Browser console: **CORS** error | Frontend origin missing | Update the CORS env var → Redeploy |
| Login popup: **unauthorized domain** | Domain not in Firebase | Add it under Authorized domains |
| HTTPS error on `api.<app>.cnordahl.com` | Two-level subdomain | Use `<app>-api.cnordahl.com` |
| Frontend still calls the old API | `VITE_` values are baked in at build | Redeploy the frontend |
| Vercel won't save a `VITE_` variable as Secret | Public prefix | Use **Config** |
