---
title: "Reviving a Userscript as a Bookmarklet"
date: 2026-07-25
tags: ["Bookmarklets", "JavaScript", "Userscripts", "Browser Tools"]
---

A recent OS upgrade at work came with locked-down browser policies and no extension support. That killed a userscript I'd been relying on daily — a small tool that enhanced a web app's search page by aggregating results into a floating panel. I didn't want to lose it, and waiting on IT to allowlist a userscript manager felt optimistic. So I converted it into a bookmarklet. The conversion is straightforward on paper but has enough gotchas that I want to write down what actually worked.

## Why a bookmarklet at all

There are a few escape hatches when extensions are off-limits: DevTools Snippets (paste, run, done — but nothing persists across page loads), local proxies (heavy), or portable browsers if your machine allows them. A bookmarklet lives in the bookmarks bar, works on any managed browser, and requires zero admin rights. The tradeoff is that it doesn't run automatically — you click it once per page load.

For a tool I use several times a day on the same domain, that's fine.

## The conversion itself

A bookmarklet is just a `javascript:` URL. You take the script, encode it, and prepend the scheme. Two characters absolutely must be percent-encoded because they have URL meaning: `#` (fragment delimiter — and my script had dozens of hex colors in CSS) and `%` itself. Everything else is optional but safer to encode.

I wrote a small Python script to do the encoding — it's essentially just wrapping the source in an IIFE, appending `void(0)` as insurance so the browser never navigates to the return value, then running it through a URL-encode function equivalent to JS's `encodeURIComponent`.

## The installer page trick

My final bookmarklet came out to around 55 KB. Pasting that into a browser's "Add bookmark" URL field is miserable, and copy-paste sometimes mangles it. The much nicer approach is a tiny local HTML file with a draggable link — a single anchor element whose `href` is the entire bookmarklet. Open the HTML, drag the link to the bookmarks bar, done. This is also how sites like the classic "Send to Kindle" bookmarklets distribute themselves. The user never has to see or touch the giant URL.

## The guard trap (the bit that bit me)

Userscripts run exactly once per page load — the userscript manager enforces that. Bookmarklets don't. So my first instinct was to add a naive guard using a flag on `window` to prevent double-installing the network interceptors when you click the bookmark twice.

This works. Right up until the moment the app's client-side navigation nukes your injected UI from the DOM. Now you click the bookmark expecting your panel back and… nothing happens. The flag says "already loaded" and the code refuses to rebuild anything. Result: the bookmark works the first time, then feels randomly broken.

The fix is to separate two concerns that a userscript conflates:

- **Interceptor installation** must happen exactly once per page load. Wrapping `fetch` or `XMLHttpRequest` twice creates a chain of interceptors that all fire on every request, which gets ugly fast.
- **UI creation** should happen whenever the UI isn't on the page — which might be the first click, or might be after the app scrubbed the DOM.

The cleaner design is to keep your state (whatever the bookmarklet has collected so far) on `window` so it survives re-runs, then treat both the style injection and the UI creation as idempotent operations that check whether their target already exists before doing anything. Interceptor installation gets its own separate boolean gate. Now clicking the bookmark on a fresh page installs everything, clicking it after the app scrubbed the DOM rebuilds just the UI, and clicking it when everything's fine is a harmless no-op.

## The diagnostic toast

The single most useful debugging aid I added is a tiny toast notification that appears at the top of the page whenever the bookmarklet fires. It's just an absolutely-positioned div appended to the body, styled inline, that removes itself after a couple of seconds.

Two details matter:

- Reset inherited styles with `all: initial` so the toast doesn't accidentally pick up a `font-size: 0` or `display: none` from some parent selector on the host page.
- Use the maximum 32-bit z-index so it sits above literally anything the host app might render.

With three different messages — "loaded", "UI restored", "already running" — I can immediately tell what state the page is in. And crucially: **no toast means the browser blocked the bookmarklet before it ran** (Content Security Policy, corporate policy, truncated URL). Wrapping the whole thing in `try/catch` and surfacing errors as a red toast catches the rest. Silent failure is the enemy — a bookmarklet with no visual acknowledgement is indistinguishable from a broken one, and you'll waste an afternoon trying to figure out which.
