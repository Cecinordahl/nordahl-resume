---
title: "AI Won't Replace Me, But It Might Move the Goalposts"
date: 2026-08-04
tags: ["\"AI\"","\"Software Engineering\"","\"Career\"","\"AI Regulation\""]
---
I keep coming back to the same tension: AI is the most useful tool I've been handed in my career, and also the thing most likely to quietly hollow out parts of the job I love. Both are true at once, and I think pretending otherwise — in either direction — is where people go wrong.

## The "junior assistant" model

The mental model that's worked best for me is treating AI like a junior assistant with more raw knowledge than me, but zero institutional memory and zero accountability. That combination is what makes it both useful and risky:

- **Useful** for boilerplate, first drafts, brainstorming, and getting a second opinion on an approach before I commit to it.
- **Risky** because it will produce confident, plausible, *wrong* architecture for my specific context — legacy constraints, compliance requirements, team conventions — because it doesn't actually know any of that unless I spell it out every time.

The failure mode isn't "the AI is bad." It's trusting fluency as a proxy for correctness — the exact same trap junior engineers fall into with senior engineers, except the AI never accumulates the scar tissue that would normally teach it better.

## What's actually still bottlenecked on humans

The more I think about it, the less useful "will AI replace developers" is as a question. The sharper version is: AI eats the parts of the job that were never really the hard part — scaffolding, glue code, first-pass tests. What's left is the stuff that was always the actual skill:

- System design tradeoffs under real, messy constraints (legacy systems, compliance, org politics)
- Debugging emergent failures in live, distributed systems
- Knowing when to push back on a bad requirement
- Owning the consequences of a decision

That last one matters more than it sounds. AI has no skin in the game. I do.

## The fear underneath the optimism

Here's the part I'm less settled on. I genuinely love the deep-work side of this job — debugging hard problems, working through complex algorithms, the specific satisfaction of tracing a failure to its root cause. My real fear isn't unemployment, it's that the *texture* of the work changes: that in a decade or two I'm mostly prompting and reviewing rather than actually thinking.

I've talked myself partway out of that fear, though not all the way. A few things I keep landing on:

- Prompting and thinking aren't opposites. A good prompt for a genuinely hard problem *is* the thinking, just compressed. What matters is the hypothesis-forming and judgment, not which hands type the fix.
- Every past abstraction layer — assembly to compiled languages, manual memory management to garbage collection, hand-rolled infra to cloud platforms — moved the "hard part" up a level rather than eliminating it. Nobody debugging memory leaks in the 90s thought future engineers "weren't really programming" once garbage collection existed; the interesting problems just relocated to distributed systems and architecture.
- Where I genuinely don't have a confident answer is the longer horizon — 15, 20 years out. If capability keeps compounding, "the hard part just moves up a level" might eventually run out of room to move. Nobody serious actually knows if or when that happens, and I'd distrust anyone who claims certainty in either direction.

What's actually in my control regardless of how that resolves: leaning toward architecture and system-judgment over pure execution, staying hands-on with the tools instead of avoiding them out of principle, and treating "I love debugging" as "I love problem-solving" rather than "I love typing" — an appetite that should still have an outlet even if the activity around it mutates.

## Regulation is lagging further than people assume

This is the part I underestimated. I assumed AI-specific regulation was creeping into place roughly alongside the technology. It isn't — the gap is wider than expected, and it's getting wider, not narrower.

In my part of the world, the comprehensive AI-specific legislation that's supposed to govern high-risk AI use has been pushed back repeatedly — implementation dates have slipped from mid-2026 to somewhere in 2027, partly due to cross-border legal negotiation delays and partly because the underlying rules kept getting amended mid-process. The practical upshot: there's currently a real window where the AI-specific legal framework simply isn't in force yet, even though the technology is already in daily production use.

The trap I'd flag for anyone in a regulated industry: treating "AI-specific law isn't in force yet" as "AI use here is currently unregulated." It isn't. General data protection law, sector-specific regulation, and existing liability frameworks already apply to anything AI touches that involves personal data or consequential decisions — the AI-specific law is really a second, more explicit layer arriving late, not the only layer that exists. The actual risk in this gap isn't some dramatic AI failure — it's teams assuming "no AI law yet" means "no rules yet," and nobody having explicitly decided what's allowed to touch production data or influence a real decision in the meantime.

## Where I've landed, for now

Cautiously optimistic, with the caveat clause left intentionally open. AI is a tool that's already changed how I work day to day — better boilerplate handling, a genuinely useful brainstorming partner for complex problems, faster iteration. I don't think that adds up to replacement, at least not on any horizon I can reason about with confidence. But I'm trying to hold that belief loosely rather than as settled fact, and to keep building the kind of judgment-heavy, context-heavy skill set that stays valuable regardless of how the next decade plays out.
