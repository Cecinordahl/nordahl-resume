---
title: "Making Git Feel Less Like Typing: A Note on Aliases"
date: 2026-06-09
tags: ["Git", "CLI", "Productivity"]
---

I type the same handful of Git commands dozens of times a day, and `checkout`, `commit`, `status`, `branch` add up. Git aliases let you map short shortcuts to longer commands — `co` for `checkout`, `st` for `status` — so the muscle memory gets cheaper. Here's what I've found worth knowing, including the bit that tripped me up: what these actually affect and how safely.

## The basic idea

An alias is just a stored mapping: a short name that expands to a longer command. You set them once and they persist across every terminal session. The syntax is a config command that takes an alias name and the command it stands for. A space in the value (like committing with an inline message flag) just needs quoting so it's treated as one setting.

The ones I reach for most: `st` for status, `co` for checkout, `br` for branch, `cm` for committing with a message.

## Scope: this is the part I wanted to be sure about

Git config has three scopes, and understanding them removes the fear of breaking something shared:

| Scope | Affects | Lives in |
|-------|---------|----------|
| Global | Just my user, on this one machine | A config file in my home folder |
| Local | A single repository | That repo's internal config |
| System | All users on the machine | A system-level config |

For personal shortcuts you want **global**. It touches only your user account on that specific machine or VM — nothing is pushed, shared, or sent to the remote, and no teammate inherits it. The flip side: if the machine or VM gets wiped, the aliases go with it, since they live in a local file. Worth re-running the setup when you spin up a fresh environment.

## A gotcha with branches

Aliasing `branch` to `br` is fine, but it exposed a conceptual thing I'd half-forgotten. Listing or creating a plain branch is one command; **creating a branch and switching to it in one move** is a *flag on checkout*, not on branch. So the "new branch" workflow I actually want runs through the checkout alias with that flag, not the branch alias. If I use it constantly, it's worth its own dedicated alias so the whole create-and-switch is a single short word.

The naming is free-form — you can call a status alias `s` or `st` or both. The one rule I'd keep: don't reuse the name of a real Git command, or you shadow it. Short invented names are safe precisely because Git has nothing built in by those names.

## Chaining commands into one alias

The more powerful trick: an alias can run *multiple* commands, or arbitrary shell, if you prefix the value with `!`. Without it, Git assumes whatever you wrote is a Git subcommand; the `!` says "run this as a normal shell command instead."

The example that sold me was combining "stage everything" and "fold it into the previous commit" into a single word. Chaining them with `&&` means the second step only runs if the first succeeds. Adding a "keep the existing message" flag skips the editor prompt entirely, so the whole thing becomes a frictionless "oops, add this to my last commit."

```bash
git config --global alias.amend '!git add . && git commit --amend --no-edit'
```

## The one real warning

Amending rewrites the last commit — it doesn't add a new one, it replaces the old one with a new identity. That's harmless while the commit is still only on your machine. But if you've **already pushed** it to a branch other people use, rewriting it means your next push is rejected unless you force it, and forcing can clobber someone else's work. So: amend freely on local-only commits, tread carefully on anything already shared.

## Takeaway

Aliases are a low-stakes, high-repetition win. Global scope keeps them personal and local to the machine, so there's nothing to break for anyone else. The only place to stay alert is where an alias wraps a *history-rewriting* command — the shortcut makes it fast, and "fast" plus "rewrites shared history" is exactly the combination to be deliberate about.
