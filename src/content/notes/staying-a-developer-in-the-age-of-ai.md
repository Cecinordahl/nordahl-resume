---
title: "Staying a Developer While the Ground Moves"
date: 2026-08-12
tags: ["AI", "Software Engineering", "Career", "Learning"]
---
The question I keep sitting with isn't whether AI will change software development — it obviously already has. It's how to stay a genuine, hands-on developer through that change rather than either ignoring it out of stubbornness or dissolving into someone who just prompts and reviews without really thinking. I don't think those are the only two options, but getting the third option right takes some deliberate direction.

## Two tracks, not one

I've landed on treating this as two parallel tracks rather than one blended "learn AI" initiative: core fundamentals, and applied AI fluency. They reinforce each other, but they're not the same skill, and I think conflating them is where people go wrong.

The fundamentals track is the unglamorous one — data structures and algorithms, how the underlying platform actually works, networking, database internals. None of this is new or trendy, and that's exactly the point. This is what lets me evaluate whether AI-generated code is actually correct rather than just plausible-looking. Weak fundamentals plus heavy AI use is the genuinely dangerous combination — you can't catch what you don't understand well enough to catch.

The AI fluency track is different: understanding how these systems actually behave under the hood — why they hallucinate, what context limits actually mean in practice, the difference between fine-tuning a model versus giving it retrieval access to real data versus just prompting it well. Not because I need to build models myself, but because that understanding is what separates "power user of a chat tool" from someone who can actually architect systems that use AI well.

## The skill isn't knowing more AI facts — it's calibrated trust

The most useful reframe I've landed on: getting good at AI isn't a knowledge problem, it's a trust-calibration problem. Some categories of work I can hand off to an AI assistant almost blindly — boilerplate, test scaffolding, a first draft of something repetitive. Other categories need heavy scrutiny — anything touching core business logic, concurrency, or the kind of domain complexity that doesn't show up cleanly in a prompt. That calibration doesn't come from a course. It only comes from deliberately reviewing AI output critically, over and over, until the pattern of "this is the kind of thing it gets subtly wrong" becomes instinct rather than something I have to consciously check every time.

Architecturally, this pushes toward a specific mindset shift too: designing systems that treat AI components as unreliable, probabilistic pieces sitting inside otherwise deterministic infrastructure. That's a genuinely different design problem than the one I was trained on — building in fallback paths, verification layers, and human checkpoints for a component that might be right nine times out of ten rather than one that's either right or throws an exception.

## Where this shows up in the actual workday

The clearest place I've found this playing out is bug analysis in a large, distributed system — lots of services talking to each other, where the root cause is rarely visible in a single stack trace. The instinct is to paste an error into an AI coding assistant and ask "what's wrong," but that framing tends to produce a shallow, overconfident guess. What's worked better is asking for a ranked list of hypotheses along with a way to verify each one — that keeps the AI as a hypothesis generator and keeps me as the one actually doing the diagnosis, rather than quietly outsourcing judgment I should be exercising myself.

The bigger unlock, though, wasn't a prompting trick at all — it was realizing the actual bottleneck was upstream of the AI entirely. In a system with many interacting services, the real question is whether you can reliably trace one request's full path across every service it touches. If correlation and trace IDs are consistently propagated and searchable, an AI assistant fed the *entire* cross-service trace reasons about the problem completely differently than one fed a single isolated screenshot of an error. No amount of clever prompting compensates for missing the plumbing that lets you see the whole picture in the first place. That's a good general lesson: sometimes the "AI skill" that matters most is actually a logging and observability skill.

## What I believe the fundamentals actually are

Before getting into what I'm doing about it, it's worth naming what I actually believe gives a developer a solid foundation for an AI-saturated future — independent of any specific course. This is the stuff I'd bet on mattering in fifteen years even if I have no idea what the tooling looks like by then.

- **Data structures and algorithms** — not competitive-programming trivia, but real intuition for why one approach scales and another doesn't. This is what lets you sanity-check AI-generated code instead of just trusting that it runs.
- **Computer architecture and operating systems basics** — memory, processes versus threads, how the CPU and cache actually affect performance. Explains the kind of slowness no framework doc or AI assistant will surface on its own.
- **Networking fundamentals** — how requests actually move between systems. In any non-trivial distributed setup, a huge share of "mystery bugs" live in the gap between services, not inside any one of them.
- **Database fundamentals** — not just writing queries, but indexing, transactions, and why a query is actually slow. This is close to daily-use knowledge for most backend work.
- **Concurrency and distributed systems thinking** — race conditions, message-driven architecture, why consensus across systems is hard. Increasingly relevant as more systems talk to each other asynchronously.
- **Software architecture and design tradeoffs** — the judgment layer that decides how all of the above fits together, and increasingly, where an unreliable AI component should and shouldn't sit inside an otherwise deterministic system.
- **Security fundamentals**, revisited periodically rather than mastered once — the kind of thing that's easy to let go stale under deadline pressure.

None of this is new advice. That's sort of the point — I think the fundamentals are exactly the part of the job that *doesn't* get disrupted, they're what determines whether someone can actually direct and verify AI well, or just be along for the ride.

## What I'm actually prioritizing right now

I've already knocked out [Microsoft's Azure AI Fundamentals (AI-900)](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/) — mostly just to lock down the vocabulary before going deeper, and it did exactly that. Everything past that point is sequenced roughly cheapest-win-first, split across the AI track, the fundamentals, and a yearly-refresh category.

**AI track, next up:**

- [**Azure AI Engineer Associate (AI-102)**](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/) — the hands-on follow-up to the fundamentals exam, covering retrieval-augmented generation, integrating AI services into real applications, and agents. This is the one that actually maps to my day job, since it's building AI *into* backend systems rather than just knowing AI theory in the abstract.
- A short **[DeepLearning.AI](https://www.deeplearning.ai/) specialization on LLM engineering and fine-tuning** — taught by people who've actually trained these systems. This is the layer that explains the *why* behind AI behavior, which the applied certification doesn't really cover on its own.

**Fundamentals, in parallel:**

- [**CompTIA Network+**](https://www.comptia.org/en-us/certifications/network/) — first among the fundamentals because it reinforces things I already half-know from working with distributed, message-driven systems daily. It's more formalizing existing intuition than learning from scratch.
- [**Fundamentals of Database Engineering**](https://www.udemy.com/course/database-engines-crash-course/) (and optionally the deeper [Databases: Indexes and Transactions](https://www.classcentral.com/course/edx-databases-indexes-and-transactions-19470) from Stanford) — high leverage almost immediately, since I touch a relational database constantly and understanding *why* a query is slow beats guessing.
- **Princeton's Algorithms, Part I & II** on Coursera — saved for once the quicker wins build some momentum, since it's the most time-intensive of the fundamentals and benefits from not being the first thing I attempt.
- [**Stanford's Computer Systems Architecture**](https://online.stanford.edu/courses/ee282-computer-systems-architecture) — placed last since it's the most abstract and least tied to immediate daily work, easier to stay motivated on once the more applied wins are behind me.

**Yearly brush-up:**

- [**CompTIA Security+**](https://www.comptia.org/en-us/certifications/security/) — revisited on a roughly yearly cadence rather than front-loaded now. The first pass will take real time, but refreshers after that should be much lighter.
- An informal yearly pass through **current language and framework idioms**, since what counts as clean, idiomatic code quietly shifts over time and it's easy to keep writing "correct but dated" code without noticing.
- [**Splunk Core Certified Power User**](https://www.splunk.com/en_us/training/certification-track/splunk-core-certified-power-user.html) — advanced search, correlation analysis, dashboarding. Getting genuinely fluent in the tool that surfaces cross-service problems turned out to matter as much as anything AI-specific, and it's tactical enough to revisit as the tool itself evolves.

I've deliberately left deep domain-specialist knowledge and heavy security work out of this pass — not because they don't matter, but because I'm optimizing for staying close to the craft I actually enjoy: writing code, architecture, and solving hard technical problems, with AI as leverage rather than replacement.

## Why I think this matters longer-term

Nobody can honestly predict what this job looks like in fifteen or twenty years — I don't think that uncertainty resolves cleanly in either direction. But the developers who combine strong fundamentals with genuine AI fluency seem like the ones best positioned regardless of how it plays out: not because they'll be immune to change, but because their value was never just "can write code the AI can now also write." It's judgment, verification, and the ability to direct powerful but unreliable tools toward the right problem — and that's a skill set that compounds rather than depreciates.
