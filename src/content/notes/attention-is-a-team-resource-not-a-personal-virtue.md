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

That reframes where the intervention has to sit. It has to happen *before* the interruption arrives, and it has to happen on the interrupter's side. Anything downstream of that is theatre.

## Signals only work if the team agrees they're binding

The usual approach is a do-not-disturb signal — headphones on, or a status set in the chat client. These get dismissed as ineffective, but I don't think the signal is the problem. The problem is that they're often introduced as one person's preference rather than as a team agreement, so respecting them becomes optional and there's no shared understanding of what each state actually means.

A signal with defined semantics is a different thing entirely. Something like:

- **Do not disturb / explicit focus state** — genuinely do not interrupt. Not in person, not with a message. Whatever it is, it waits.
- **Busy** — don't walk over, but a short message is fine. Something like "got 2 minutes?" and then wait to see if there's a response. The key part is that no response is an acceptable answer, not a prompt to escalate to a tap on the shoulder.
- **Available** — normal rules, walk over if you like.

The important word is *agreed*. Signals don't fail because signals are weak; they fail when half the team treats them as decoration. That's fixable with an explicit conversation, and it's a much lighter intervention than restructuring how the team handles questions.

## The question the interrupter should ask first

The higher-leverage piece, though, sits entirely on the interrupter's side. Before breaking someone's focus, there are two questions worth internalising as a team habit.

**Am I stuck, or do I need a rubber duck?** A surprising share of interruptions are really requests for a sounding board. Articulating the problem out loud is what resolves it — the other person is incidental, and often barely gets a word in. That work can be done alone, in writing, or with an actual rubber duck. If explaining it clearly would solve it, the interruption wasn't needed.

**Am I blocked right now, or does it just feel urgent?** Being genuinely unable to proceed until you get an answer is rare. Much more common is being mildly stalled on one thread while three others remain open. If the answer might exist elsewhere — in documentation, in a search of past discussions, in an already-answered question in a shared channel, or from someone with more slack — that's the cheaper route. Sometimes the honest answer is to park it, get a coffee, and come back; a fair number of these questions dissolve on the walk.

Neither question is about discouraging people from asking. Asking is good, and a team where people are afraid to ask is worse than a team with too many interruptions. The point is to make the asker briefly aware that there's a cost on the other side, because that cost is invisible from where they're standing. Someone deep in a problem looks exactly like someone doing nothing in particular.

## Why this is still a collective fix

It might look like this pushes the burden back onto individuals, which is the failure mode the book warns about — the digital-detox pattern, where you unplug, feel wonderful, return to an identical environment, and lose it within a week.

I think the distinction holds, and it's a useful one. The burden isn't on the *interrupted* person here. Nobody has to bristle, enforce, or perform their unavailability. What's being asked is that the team share a norm about interrupting: what the signals mean, and what to check before overriding them. That's an agreement about collective behaviour, and it survives without anyone having to be the bad guy.

The rule of thumb I'd extract: any focus practice that requires the person losing focus to defend it will erode. Practices that live on the interrupter's side don't have that weakness.

## Framing matters more than the mechanism

One thing worth being deliberate about: any of this proposed as a personal preference collapses straight back into an individual fix. It reads as an accommodation for one person's temperament, and lasts exactly as long as everyone's goodwill.

Framed around a shared cost, it holds better — rework caused by dropped context, decisions made with half a model in mind, days that end without a clear sense of what was actually built. Those are team problems with team consequences, and they justify team-level agreements.

## Where I've landed

It's tempting to treat focus as something you're either good or bad at on a given day. The more useful model is that it's a resource the working environment continuously draws down, and the only durable defences are the ones built into how a team agrees to behave.

Individual habits still matter — notification settings and deep-work blocks are worth having. But expecting them to hold on their own is the mistake. They're the last line, not the first.
