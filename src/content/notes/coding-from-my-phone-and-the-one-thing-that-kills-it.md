---
title: "Coding From My Phone, and the One Thing That Kills It"
date: 2026-09-03
tags: ["AI Coding Agents", "Remote Development", "Mobile Workflow", "macOS"]
---

I've been trying to get some real work done on side projects without being at my desk. Not writing code with my thumbs — steering an agent that writes the code. The agent does the typing, I read diffs and redirect. That part turns out to work surprisingly well on a phone. What took me longer to understand was that there are two fundamentally different ways to do it, they fail in completely different ways, and picking the wrong one cost me an afternoon.

## Two topologies, not one feature

The mental model that finally made this click: the question isn't "can I use the agent from my phone," it's **where does the code actually execute**.

In the first model — call it remote control — the agent process runs on my own laptop. My phone is a thin window into that session. The vendor's infrastructure acts as a relay: messages and tool results flow through it, but the filesystem, the toolchain, the environment variables, the credentials, all of it stays on my machine. Nothing gets copied anywhere.

In the second model, the session runs in a hosted sandbox. It clones a repo from a Git host, works inside an isolated VM, and pushes a branch back. My laptop isn't involved at all. It can be asleep, shut down, or sitting at the office.

Those sound like variations on a theme. They're not. One requires my machine to be alive and reachable; the other requires my code to live on a supported Git host. Every practical difference falls out of that.

## Which one I reach for

Remote control is the right call when the work genuinely depends on my local setup — a private package registry behind a VPN, containers running locally, a cloud CLI already authenticated on that machine, custom tooling wired into the session. None of that exists in a fresh sandbox, and reproducing it there is more work than it's worth.

Cloud sessions win for anything self-contained. A personal project with a public Git host and no exotic dependencies is the ideal case. They also parallelize in a way local sessions don't — several independent tasks, each in its own branch, without juggling worktrees on one machine.

The trade-off I keep coming back to: the sandbox only knows what's in the repo. No local config, no editor settings, no shell aliases. That makes the repo's own agent-instructions file (conventions, module layout, how to run the tests) matter far more than it does locally, where the agent can just look around my machine and figure things out. If the build needs a registry outside the sandbox's allowlist, you'll find out the hard way at session start.

## The failure I actually hit

I started a remote control session, left the house, and got a fair bit done. Then, in the middle of a thread, my phone told me the session was offline.

The laptop had gone to sleep. Obvious in hindsight — it's a managed work machine with an idle-sleep policy I didn't configure. And the phone is fundamentally unable to fix that. It's a window into a process that no longer exists. Nothing I tap from outside the house is going to wake the machine up.

What I appreciated, once I understood it: sleeping isn't actually destructive. The session reconnects on its own when the machine comes back online, and messages queued during the gap get delivered. If I'd simply walked back in the door, it would have resumed itself. The problem is purely that a sleeping laptop never comes back on its own, so "sleep" and "dead" are indistinguishable from a bus stop.

There's also a recovery window on the machine side — a few hours during which you can bring the same session back rather than starting fresh. Worth knowing before you assume the context is gone.

## Keeping the machine awake, properly

My first instinct was crude: start a long video, or wedge a key down. Both work in the sense that the machine stays awake. Both are bad. The key-holding one especially — those repeats go into whatever has focus, and eventually that's an editor with a file open.

macOS has a built-in utility for exactly this, and the good version wraps the command instead of running standalone:

```bash
caffeinate -dimsu <agent-command>
```

Wrapping matters. The wake lock is scoped to the child process, so it releases the instant the session ends. No orphaned process keeping the laptop awake for three days because I forgot about it. Stopping it is just interrupting the foreground process, and `pmset -g assertions` confirms nothing is still holding the lock.

Two things bit me here that the docs don't lead with. Closing the lid overrides all of it unless you're on power with an external display — clamshell sleep doesn't care about wake locks. And on a managed device, the MDM profile can enforce the sleep policy regardless of what you set locally. The assertions output will tell you which side won.

## The part worth sitting with

The keep-awake trick is a workaround, and I think it's worth being honest that it's circumventing a policy someone deliberately configured. Leaving a machine awake and unattended with an agent session live is a different security posture than a sleeping machine, even a locked one. On a personal device, fine. On a corporate one, the endpoint policy exists for reasons and I'm not the person who gets to weigh them.

Which points back at the topology question. Most of the time I wanted "work from my phone," I didn't actually need my laptop's environment — I just defaulted to the mode that mirrored how I work at the desk. The cloud session sidesteps sleep policy, VPN, battery, and lid state entirely, because there's no laptop in the loop to fail. The keep-awake dance is worth it only when the local environment is genuinely the point.
