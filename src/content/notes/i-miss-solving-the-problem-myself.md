---
title: "I Miss Solving the Problem Myself"
date: 2026-10-31
tags: ["AI", "AI-Assisted Development", "Developer Experience", "Code Review", "Craftsmanship"]
---
In August I wrote that my real fear about AI wasn't unemployment, but that [the texture of the work would change](/notes/ai-won-t-replace-me-but-it-might-move-the-goalposts) — that in a decade or two I'd mostly be prompting and reviewing rather than actually thinking. I gave that a decade. It took a few months.

I used to write code from scratch, dig through language documentation, ask colleagues, and search forums until something clicked. Now I mostly build or borrow agents, hand them tasks, let another agent review the result, skim the diff, and approve. The tasks I hand over keep getting bigger, and the more often the agent gets it right, the less carefully I review. The result: I'm shipping code I don't know as well as I used to.

Two things pushed me to write this down — a hiring manager at an AI company saying they've dropped coding interviews because the model is better at small coding challenges than candidates anyway, and a veteran developer describing the job as a conveyor belt where you just keep pressing "Accept."

My earlier notes were about staying valuable. This one isn't. It's about what I've lost even while staying useful, and what I can do about it.

## What actually changed

The shift isn't really "less coding." It's a change in role:

- **From author to reviewer.** Before, I struggled with a problem and understood it deeply by the time it was solved. Now I order a solution, skim it, and sign off.
- **Comprehension debt.** Every approved-but-not-understood change adds to a pile of code I own but don't really know.
- **Trust erodes attention.** In [Staying a Developer While the Ground Moves](/notes/staying-a-developer-in-the-age-of-ai) I called the core skill *calibrated trust*: learning what the AI gets subtly wrong and checking exactly that. In practice, calibration drifts. The more often the agent is right, the further my trust slides toward "probably fine." It's the classic automation trap from aviation: when a system is almost always right, people stop watching — and then nobody catches the one time it's wrong.

There's also pressure baked in. If everyone else is moving at agent speed, choosing to do things by hand feels like falling behind. Though I've noticed that *feeling* faster and *being* measurably more productive aren't always the same thing.

## What I actually miss

When I dug into it, it wasn't owning the code I missed most. It was **the problem-solving itself** — being the one who figures out the solution.

Pull request reviews were always the most boring part of the job. Now review *is* the job. The fun part used to be discussing different approaches with colleagues, and I can still do that — but the solution on the table is never mine anymore. I don't get to think through how I would have solved it.

It even leaks into the fun stuff. Our office used to compete on an advent-of-code-style puzzle calendar every December. Now anyone can point an agent at it. If I decide to solve it by hand, I end up far down the leaderboard, competing against people who didn't. The motivation drains out.

## The paradox in "just have taste"

The hiring manager I mentioned said they now look for small prototypes that show taste, empathy and principled thinking. I agree that judgment matters more now. But taste comes from having struggled with problems yourself. The tools are removing exactly the friction that used to produce good developers — and then asking for the thing that friction produced. That's worth taking seriously, especially for people just starting out.

## What I'm trying

**Think first, prompt second.** Before handing a task to the agent, I spend 5–10 minutes sketching how *I* would solve it — bullet points, pseudocode, whatever. Then I let the agent do it and compare. Review stops being a checklist and becomes a comparison of two solutions, which is the part I actually enjoyed. If the agent's version is better, I learn something. If mine is better, I've caught something it missed.

**Make the agent explain, not just deliver.** I ask for two or three alternative approaches and why it picked one. That keeps me in the reasoning instead of only seeing the conclusion.

**Read documentation with no goal.** Reading language docs and proposals for new features used to be one of my favorite things. It doesn't need a productivity justification.

**Treat review as where the craft lives now.** If I can't explain a piece of the change in my own words, it isn't done — however correct it looks.

**Change the scoreboard, not just my behavior.** For the puzzle calendar, the problem isn't solving by hand; it's that the leaderboard measures something I don't care about. A separate "no agents" board, or sharing and discussing solutions instead of racing, would bring the fun back. I'm probably not the only one who misses this.

## Pushing back on my own argument

In the first note I leaned on a comforting idea: every abstraction layer moves the hard part up a level rather than removing it. As a tech lead and architect, I can see that happening — a lot of my problem-solving has moved to design, constraints, and saying no. That's real problem-solving.

But I used that argument to talk myself out of a fear, and I don't think it fully works. Moving up a level keeps the job interesting. It doesn't give back the joy of cracking a puzzle yourself, and I don't think I should pretend it does. That joy needs protecting on purpose.

## The smallest step

Next time I give an agent a task, I'll write three lines on how I'd solve it before sending the prompt. That's it.
