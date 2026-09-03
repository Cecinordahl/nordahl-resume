---
title: "Attention Is a Team Resource, Not a Personal Virtue"
date: 2026-09-03
tags: ["Focus", "Team Practices", "Developer Experience"]
---

![Abstract illustration of a person's attention fragmenting into a stream of notification icons and screens](/images/notes/attention-is-a-team-resource-not-a-personal-virtue/hero.jpg)

![Cover of Stolen Focus by Johann Hari](/images/notes/attention-is-a-team-resource-not-a-personal-virtue/stolen-focus-cover.jpg)

I got to thinking about this because I'm currently reading *[Stolen Focus](https://www.bloomsbury.com/uk/stolen-focus-9781526620245/)* by Johann Hari — a book about why attention has collapsed over the last couple of decades. Its central claim has stuck with me: broken attention isn't a personal failing you can willpower your way out of. It's something the environment takes from you. For software development, that environment is unusually good at taking — and I think the implications for how teams organise themselves are underrated.

## The switching cost is the whole story

What makes interruption expensive for developers isn't the minute of conversation. It's that the work lives in working memory. Being deep in a piece of a system means holding a model of it in your head: which call goes where, what the invariants are, which three things need fixing in what order. That model is fragile and expensive to build.

An interruption doesn't cost a minute. It costs the model. Rebuilding takes far longer than the exchange that destroyed it, and often the rebuild isn't exact — you reconstruct a slightly worse version and carry on.

This is also why the "just check it quickly" reflex is so corrosive. A notification catching the eye mid-thought does the same damage as a full conversation, because the damage is eviction, not duration.

## "Do you have five minutes?" is already too late

There's a structural detail here that I think gets missed. When someone opens with a request for your time, the cost has already been paid by the time you answer. The model is gone either way.

Which means declining buys nothing. You lose the context *and* become the person who says no. The polite instinct — take the question, be helpful — turns out to be the rational one at that point, because the decision was made for you the moment you were addressed.

That reframes where an intervention has to sit. It has to fire *before* the interruption arrives. Anything downstream of that is theatre.

## Why individual fixes tend to fail

The common approaches all put the burden on the person being interrupted. Headphones as a do-not-disturb signal is the classic example, and it tends to half-work, which is to say it fails.

The failure modes are fairly predictable:

- It's an **opt-in signal** that depends on everyone else remembering and interpreting it correctly.
- There's **no cost to ignoring it**, and no penalty for defecting.
- It leaves the interrupted person holding the enforcement burden — they have to be the one who bristles, which nobody wants to be.
- Most importantly, it **says where not to go without saying where to go instead**. Someone with a real blocker will come over anyway, because their alternative is staying blocked.

This mirrors the book's argument against digital detoxes. You unplug, feel wonderful, return to the identical environment, and lose it within a week. A fix requiring individual discipline against a structural pressure will lose to the structural pressure eventually. Every time.

## Route, don't block

If attention is a collective resource, the defence has to be collective too.

The pattern I find most convincing is some form of **rotating interrupt duty** — one named person each day whose job is to field the drive-by questions, the quick clarifications, the where-does-this-live queries. Everyone else is genuinely protected, and there's a clear, socially acceptable answer to "who do I ask?"

What makes it work:

- It gives the interrupter a **better destination**, not a closed door. Nobody has to be told no.
- The cost is **bounded and shared** — one day in rotation instead of every day partially.
- Nobody personally enforces anything. The norm lives in the team, not in individuals.
- The person on duty *expects* interruption, so they naturally take shallower work that day. The switching cost is low when there's no deep model to evict.

Some adjacent patterns follow the same shape:

| Individual framing (fragile) | Collective framing (durable) |
|---|---|
| "Mute your chat when focusing" | Async-by-default: questions go to a shared channel, not a direct message |
| "Block focus time in your calendar" | A shared no-meeting block, same hours across the team |
| "Respect the headphones" | A named interrupt-duty rotation |
| "Turn off your notifications" | Explicit expectations on response times — non-urgent gets hours, urgent gets a call |

The move is identical each time: take the rule out of individual willpower and put it into a team agreement with a default behaviour attached.

## Framing matters more than the mechanism

One thing I think is worth being deliberate about: any of these proposed as a personal preference collapses straight back into an individual fix. It reads as an accommodation for one person's temperament, and it lasts exactly as long as everyone's goodwill.

Framed around a shared cost, it holds better — rework caused by dropped context, decisions made with half a model in mind, days that end without a clear sense of what was actually built. Those are team problems with team consequences, and they justify team-level agreements.

## Where I've landed

It's tempting to treat focus as something you're either good or bad at on a given day. The more useful model is that it's a resource the working environment continuously draws down, and the only durable defences are the ones built into the environment itself.

Individual habits still matter — notification settings and deep-work blocks are worth having. But expecting them to hold on their own is the mistake. They're the last line, not the first.
