---
title: "Explaining My Job to Non-Coders"
date: 2026-11-20
tags: ["AI", "Developer Workflow", "Communication"]
---

![Impressionist painting of a woman writing at a garden table by a lake, gesturing toward floating pages and three ethereal helper figures with a quill, a globe and a blueprint](/images/notes/explaining-my-job-to-non-coders/hero.jpg)

I recently tried to explain my coding setup to someone outside tech. I use one editor with a "bank" of AI models I can switch between, so I'm not tied to a single provider. It went badly. Every sentence I said needed three more sentences of explanation.

The problem was the framing, not the audience. I was describing tools before I'd explained the job. Here's what I've found works instead.

## Start with a story, not a tool list

Abstract descriptions don't stick. A concrete client does. My go-to scenario is someone who wants a personal resume website.

- **The request:** "I want my resume online, with my photo and a contact button."
- **The questions:** Before writing anything, I ask what it should feel like, what matters most, and what the details are. Turning a vague wish into precise requirements is half the job.
- **The writing:** I write instructions as text in a program that looks a bit like a word processor.
- **The AI helper:** A chat window sits beside my text. I ask it to draft sections or explain why something looks wrong.
- **The check:** I open the result, click everything, and test it on a phone.
- **The delivery:** I put it online. The AI helped, but I'm responsible for it working.

## Code is a recipe, not an essay

The best bridge I've found is a word processor. Code is text in files, so the comparison holds, with one catch: the computer follows it *literally*. Running the files means pressing play and letting the computer do exactly what they say.

A concrete example helps more than the abstraction. Say the client wants a photo on the site. For her, that's one instruction. For the computer, it's about ten decisions:

- How big? Half the page, or passport-sized?
- Left, right, or centered?
- Beside the text, or on its own line?
- Square, round, or with soft corners?
- In the background, faded, or fully visible?
- What happens on a narrow phone screen?

If nobody answers these, the computer falls back on defaults. It uses the photo's real size and puts it in a corner, which can mean a giant image pushing everything off the page. So my job is to ask the questions that get all ten answered before I build.

## Chat AI versus an agent

The second thing that was hard to explain is the difference between chatting with an AI and using an agentic tool. The word processor works here too.

| | Chat | Agent |
|---|---|---|
| Comparison | Phoning a friend who writes well | That friend sitting at your computer |
| What it sees | Only what I paste in | The whole project |
| What it does | Suggests text for me to copy | Edits files, runs the result, reads errors, tries again |

The real difference is access plus action. A chat assistant advises. An agent does the work.

Agents are fast and touch many files, so reviewing their changes matters more, not less. I think of it as Track Changes: I see every edit and accept or reject it.

## Switching models

There are two levels of choice, and I explain them separately.

- **Within one provider:** Most providers offer several models. One is fast and good for everyday work. Another is slower and more thorough for hard problems. I pick based on the task.
- **Across providers:** My editor collects models from several companies into one dropdown. I don't need a separate app for each. It works like a taxi app: one interface, many drivers, and I choose by price, speed and quality.

This also protects me from lock-in. If one provider has a bad day or changes its pricing, I switch and keep working the same way.

## The core idea

The AI is the mechanic, not the engineer. It's quick and knowledgeable, but sometimes confidently wrong. I decide what ships, and I review everything it produces.

## What I'd say next time

> "I turn vague requests into exact instructions a computer can follow. I write them in a word-processor-like program, and I have an AI helper I can swap depending on the job. It's fast, but I'm the one who checks it and signs off."

## Summary

- **Open with a client story,** not a list of tools.
- **Code is a literal recipe.** One human sentence becomes many decisions, and asking about them is the job.
- **Chat advises, agents act.** Review agent changes like Track Changes.
- **Model choice has two levels:** within a provider, and across providers.
- **The human stays accountable** for what ships.
