---
title: "The Terminal's Canvas: A Deep Dive into CLI Text Editors"
date: 2026-07-25
tags: ["Terminal", "Workflow", "Tools"]
---

I used to dread getting trapped in a terminal text editor, but over time, I've found that
understanding what they are and why they exist takes away the fear. If you've ever stared
at a blinking terminal cursor not knowing how to save your work, this guide is for you.

## What is a CLI Text Editor?

To dummy it down: text editors are basically programs used to edit files. They might seem
similar to word processors like Microsoft Word or Google Docs at first glance, but they
serve entirely different purposes. While a word processor focuses on how a document looks
(adding invisible code for things like bold text or page breaks), text editors only support
pure text.

A Command-Line Interface (CLI) text editor takes this a step further by ditching the
graphical interface (GUI) completely; these programs run strictly inside your text-based
console.

## Why Do We Even Use Them?

These editors have been an integral part of the Unix tradition since the early 1970s. I've
found they are still highly relevant today for a few key reasons:

- **Server access** — they were designed to let users edit code and scripts directly on a
  server or remote system that simply doesn't have a graphical interface.
- **Keyboard-centric speed** — for software development and system administration, they
  allow for a fully keyboard-centric approach, keeping your hands on the keys and off the
  mouse for maximum efficiency.
- **Ubiquity** — tools like `vi` are installed on almost every Linux system by default,
  meaning they are guaranteed to be available in any server environment.

## The Heavyweights

When working in the terminal, these are the primary editors you will encounter:

- **Nano** — my go-to for quick, simple edits. It is a simple and user-friendly editor for
  terminal users, and it completely eliminates the scariest part of the command line for
  beginners — not knowing how to exit — by keeping a helpful cheat sheet of commands at the
  bottom of the screen.
- **Vim & vi** — the ubiquitous terminal editor. `vi` is the original screen-oriented Unix
  editor. Its successor, Vim, is a highly efficient modal editor meant for power users and
  serious productivity.
- **Emacs** — the famous rival to Vim. It is an extensively customizable display editor, so
  versatile and extensible that it can easily become much more than just a simple text
  editor.

## The Modern Challengers

In recent years, the open-source community has built some incredible new tools that
modernize the terminal editing experience. I've been keeping an eye on these:

- **Neovim** — an extensible fork of Vim that focuses on improved performance and a modern
  UI.
- **Micro** — a modern and intuitive terminal-based editor. It features full mouse support,
  which makes it feel incredibly natural if you are used to GUI editors.
- **Helix** — a post-modern, modal editor written in Rust. It draws heavy inspiration from
  Neovim and Kakoune but is generally more user-friendly. It integrates beautifully with
  Tree-sitter for handling syntax and features powerful multiple cursor selections straight
  out of the box.
- **Amp** — another Rust-based editor designed with a "batteries included" philosophy. Its
  standout feature right after installation is an incredibly fast, built-in file finder.
- **Kakoune** — a modern modal editor that puts its primary focus on efficient,
  selection-based editing.

## The Weird and the Wonderful

The terminal ecosystem is vast, and there are some truly bizarre and unique editors out
there that I've stumbled across:

- **ed** — one of the absolute oldest Unix editors, operating purely as a line-oriented text
  editor. It is famously weird because it provides absolutely no visual feedback and relies
  strictly on cryptic commands.
- **Wordgrinder** — this defies the "plain text only" rule by acting as a cross-platform word
  processor meant to run entirely inside the terminal.
- **Hexapoda** — a colorful modal hex editor designed specifically for the terminal.

## Switching Between Them

If you ever find yourself stuck in a Git commit using an editor you hate (usually Vim), you
can easily change Git's default behavior globally. I usually force my setup back to Nano
using this command:

```bash
git config --global core.editor "nano"
```
