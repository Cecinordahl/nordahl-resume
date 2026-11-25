---
title: "How I Jailbroke My Kindle Paperwhite (and How You Can Too)"
date: 2026-11-23
tags: ["Kindle", "Jailbreaking", "KOReader", "AI Assistants"]
---

![Impressionist painting of a woman in a garden by a lily pond, smiling at an e-reader as books, pictures and broken chains stream out of it with the words Unlocked, Custom Art, PDF, EPUB and Airplane Mode](/images/notes/e-reader-jailbreak/hero.jpg)

I've had a Kindle Paperwhite 3 (7th generation, 2015) for years. It worked fine, but it was locked down: only Amazon's formats, a fixed lock screen, and nowhere good to put my PDFs and Word documents. I finally decided to open it up. I did it together with an AI assistant that guided me one step at a time. This note covers what I wanted, how it went, which jailbreak fits which Kindle, a step-by-step version you can follow yourself, and the prompt I'd use to get an AI assistant to guide you the same way.

## What I Wanted

I had four goals, in this order:

1. **Jailbreak the Kindle** without it updating itself and closing the exploit.
2. **Install KOReader**, a better reading app that handles PDFs and Word documents natively.
3. **Send web articles to the Kindle** with one click, without running a server.
4. **Use my own art on the lock screen**, both in the normal Kindle interface and in KOReader.

I also wanted to do it calmly. A single wrong move, like letting the Kindle download an update at the wrong moment, can close the door for good. So the rule was one action from me at a time, with a check after every step.

## How I Did It

My starting point: Kindle Paperwhite 3, firmware **5.16.2.1.1**, registered to my Amazon account. That made **WinterBreak** the right jailbreak (see the table further down).

### Preparation

The first surprise was that **my work laptop blocked the Kindle as a USB drive**. Its security software wouldn't allow it, and I didn't try to get around it. I moved the whole project to my personal computer instead.

Then I protected the Kindle against updates in two ways:

- I turned on **airplane mode** and left it on.
- I ran [Kindle-Filler-Disk](https://github.com/iiroak/Kindle-Filler-Disk), a small script that **fills the storage with dummy files** until only about 50 MB is left. The Kindle can't download an update it has no room for.

The assistant read the script before I ran it. It was short and only wrote inside one folder on the Kindle.

### The Jailbreak

I rebooted the Kindle, copied the [WinterBreak](https://github.com/KindleModding/WinterBreak) files onto it (including the hidden `.active_content_sandbox` folder), and ejected it properly. Then I opened the Kindle Store. WinterBreak's launcher (Mesquito) loaded instead of the store, and I tapped the WinterBreak button. After about 30 seconds the screen showed some text and the interface restarted. A `JAILBROKEN.txt` file appeared in the documents folder, which confirmed it worked.

Before deleting the filler files, we checked the root of the Kindle for half-downloaded update files. There were none, so the filler went and I got almost 3 GB back.

### The Guides Had Changed

My plan was based on older instructions with several extra steps: install a hotfix, then the KUAL app launcher, then the MRPI package installer, then disable updates by hand. When the assistant checked [kindlemodding.org](https://kindlemodding.org/), all of that had been moved to a "legacy" section. WinterBreak now blocks updates by itself, includes the hotfix, and comes with KPM, a package manager.

To be careful, I checked on the Kindle before turning Wi-Fi back on. "Update Your Kindle" in settings was greyed out, which is a good sign that updates are blocked.

### KOReader

With Wi-Fi on, I typed two commands into the Kindle's search bar: `;kpm update` and `;kpm install koreader`. A success message appeared. The icon took a while to show up, so I started it with `;kpm launch koreader` instead. KOReader opened right away.

PDFs worked immediately. The first Word test file failed, but only because it had been built by hand with too few internal parts. A real `.docx` opened fine, and changing the font size worked too.

### Articles

For articles I used Amazon's own **Send to Kindle** browser extension (publisher: AMZN Mobile LLC). It sends the article to the Kindle in one click, and it showed up in the library a few minutes later. It lands in the normal Kindle reader rather than KOReader, but that's fine for me since I don't need a server.

### Custom Lock Screen

This was the trickiest part. The modern screensaver tool required firmware 5.16.3 or newer. It turned out to be an advantage, though: NiLuJe's older **ScreenSavers Hack** (linkss) **only works up to firmware 5.16.2.1.1**, which was exactly mine. Around 5.16.3, Kindles switched to a different binary architecture (soft-float to hard-float), and the old hack only runs on the old one.

That hack needed the "legacy" pieces after all: KUAL (installed with PEKI) and MRPI. We copied all three onto the Kindle, I opened KUAL, tapped **Helper → Install MR Packages**, and the Kindle rebooted. The hack showed its own test lock screen, which confirmed the install.

The assistant converted my own image to the exact format the hack requires and replaced the test image with it. I restarted the Kindle with the cable unplugged, and my image appeared on the lock screen.

One last thing: inside KOReader, the lock screen only showed a small "Sleeping" box, because KOReader handles sleep itself. Under **Settings → Screen → Sleep screen → Wallpaper**, I chose a custom image, picked the same file, and removed the message. Now the same image shows everywhere.

## Which Jailbreak Fits Your Kindle?

Which jailbreak you need depends on **your model, your exact firmware, and whether the Kindle is registered** to an Amazon account. This table is based on [kindlemodding.org's own data](https://kindlemodding.org/jailbreaks.json), read on **25 November 2026**. Jailbreaks and firmware change often, so always confirm with the [Find my Jailbreak wizard](https://kindlemodding.org/jailbreak-wizard.html) before you start.

Find your firmware under **Settings → Device Options → Device Info**.

| Jailbreak | Firmware | Must be registered? | Models |
|---|---|---|---|
| **WinterBreak** | 5.6.1.1 – 5.18.0.2 | Yes | Paperwhite 1–6, Voyage, Oasis 1–3, Kindle 7th–12th gen, Scribe, Scribe 2024, Colorsoft |
| **WinterBreak2** | 5.6.1.1 – 5.16.3 (and 5.16.5) | No | Paperwhite 1–5, Voyage, Oasis 1–3, Kindle 7th–11th gen, Scribe |
| **SpiderCat** | 5.16.3 – 5.19.5 | No | Paperwhite 4–6, Oasis 3, Kindle 10th–12th gen, Scribe, Scribe 2024, Colorsoft |
| **Sanctuary** | 5.16.4 – 5.18.3 (not 5.16.5) | No | Paperwhite 4–6, Oasis 3, Kindle 10th–12th gen, Scribe, Scribe 2024, Colorsoft |
| **Nosebleed** | 5.16.4 – 5.18.6 (Paperwhite 6 / Kindle 12th gen: up to 5.17.1.0.4) | No | Paperwhite 5–6, Oasis 3, Kindle 11th–12th gen |
| **Véra** | 5.17.1 – 5.20.2.0.1 | No | Paperwhite 5–6, Kindle 11th–12th gen, Scribe, Scribe 2024, Colorsoft |
| **SpringBreak** | 5.18.1 – 5.19.2.0.1 (Paperwhite 4 / Kindle 10th gen: 5.18.1 – 5.18.1.1.1) | Yes | Paperwhite 4–5, Kindle 10th–11th gen |
| **AdBreak** | 5.18.1 – 5.18.5.0.1 (Paperwhite 4 / Kindle 10th gen: only 5.18.1) | Yes, and needs ads ("Special Offers") | Paperwhite 4–6, Oasis 3, Kindle 10th–12th gen, Scribe |
| **Shadow** | 5.19.4 – 5.19.6 | No | Paperwhite 6, Kindle 12th gen, Scribe, Scribe 2024, Colorsoft |

Older Kindles (Kindle 1–4, Kindle Touch) have legacy jailbreaks listed on the same site.

A few things I learned from the table:

- **Older firmware often has more options.** My 5.16.2.1.1 fit both WinterBreak and WinterBreak2.
- **Check the exact version, not just the first numbers.** Some ranges end at a specific build, like 5.18.0.2, and some versions are excluded on purpose.
- **Some tools care about firmware too**, not just the jailbreak. The old screensaver hack stops at 5.16.2.1.1, while the newer one starts at 5.16.3.

## Newer Kindles: A Bluetooth Page Turner

My Paperwhite 3 has no Bluetooth, so **I haven't tried this myself**. But if your Kindle has Bluetooth, a jailbreak opens up a fun extra: turning pages with a cheap remote.

**Kindles with Bluetooth:** Oasis 2 and 3, Paperwhite 4 and newer, Kindle 10th generation and newer, Scribe and Colorsoft. Amazon added it for Audible, but it can be reused.

Two community projects I found:

- **[kindle-bt-clicker](https://github.com/zamai/kindle-bt-clicker)**: Uses a cheap Bluetooth clicker. Click turns to the next page, and a long press goes back. It was built on a Paperwhite 5 with firmware 5.19.2. The author recommends KOReader 2026.07 or newer with its plugin. The normal Kindle reader needs an extra button-mapping tool.
- **[kindle-bt-pageturner](https://github.com/migpbor/kindle-bt-pageturner)**: A KOReader plugin that turns **Bluetooth earbuds** into a page turner. Pressing play/pause turns the page. The author reports it working on the Kindle 11th gen, Paperwhite 5 and Paperwhite 12th gen.

Both are small hobby projects, so read their READMEs and check that your model and firmware match before installing.

## How You Can Do It Yourself

Exactly which files and jailbreak you need depends on your model and firmware, so always follow the current guide on [kindlemodding.org](https://kindlemodding.org/). But the overall order and the checks along the way are the same.

### 1. Prepare

- **Use a personal computer**, not a work machine. Work laptops often block USB drives, and you shouldn't try to get around that.
- **Find your model and firmware version**, and use the table above and the wizard to pick your jailbreak.
- **Turn on airplane mode** and leave it on until updates are confirmed blocked.
- **Fill the storage** to around 20–50 MB free with [Kindle-Filler-Disk](https://github.com/iiroak/Kindle-Filler-Disk). Read the script first.

**Done when:** the Kindle has very little free space and airplane mode is on.

### 2. Jailbreak

- **Reboot the Kindle first**, then connect it to your computer.
- **Unpack the jailbreak on your computer**, not directly on the Kindle. Then copy everything over, including hidden folders like `.active_content_sandbox`.
- **Eject properly**, unplug, and follow the guide's steps on the Kindle.

**Done when:** a `JAILBROKEN.txt` file appears in the documents folder.

### 3. Clean Up and Block Updates

- **Check the Kindle's root folder** for update files (names like `update*.bin` or `update.bin.tmp.partial`). Delete them **before** you remove the filler.
- **Delete the `fill_disk` folder.**
- **Check "Update Your Kindle"** in settings. If it's greyed out, that's a good sign updates are blocked. Only then turn Wi-Fi back on.

**Done when:** the filler is gone, the update option is greyed out, and Wi-Fi is on.

### 4. Install KOReader

- **Type `;kpm update`** in the Kindle's search bar, then **`;kpm install koreader`**.
- **If the icon doesn't show up**, start it with `;kpm launch koreader`.

**Done when:** KOReader opens and can open a PDF.

### 5. Send Articles to the Kindle

- **Install Amazon's Send to Kindle browser extension.** Check that the publisher is AMZN Mobile LLC, since there are many look-alikes.
- **Send one article as a test**, and check the library a few minutes later.

**Done when:** the test article shows up on the Kindle.

### 6. Custom Lock Screen (Optional)

- **Check which screensaver hack fits your firmware.** Up to 5.16.2.1.1: NiLuJe's ScreenSavers Hack (needs KUAL and MRPI). From 5.16.3: newer tools such as [kindle-custom-screensaver](https://github.com/chengandre/kindle-custom-screensaver).
- **Convert your image to exactly what the hack requires.** For my Paperwhite 3, that meant 1072×1448, portrait, 8-bit grayscale PNG, and no embedded colour profile. Scale to fit rather than crop if the image has a border.
- **Put the image in the hack's image folder** (`linkss/screensavers` for the old hack) and restart the Kindle **with the cable unplugged**.
- **Set the same image in KOReader** under Settings → Screen → Sleep screen, so you get it there too.

**Done when:** your image shows up both in the normal Kindle interface and in KOReader.

## A Copy-Paste Prompt for Your AI Assistant

What made this work for me was letting an AI assistant handle the research, downloads, copying and checks, while I only did what needed my fingers on the Kindle. Below is a prompt that sets that up. It works best with an assistant that can run commands and read files on your computer, but it also works in a normal chat if you do the computer steps yourself.

Fill in the brackets and paste it in as your first message, or save it as an instruction file in your project folder.

```text
You are my guide for jailbreaking and setting up my Kindle. Walk me
through it step by step.

## My Kindle
- Model: [MODEL AND GENERATION, e.g. Paperwhite 3 (7th gen)]
- Firmware: [FIRMWARE VERSION, from Settings → Device Options → Device Info]
- Free space: [FREE SPACE]
- Registered to my Amazon account: [YES / NO / NOT SURE]
- Ads on the lock screen ("Special Offers"): [YES / NO]
- Computer: [OPERATING SYSTEM], personal machine (not a work computer)

## My goals, in this order
1. Jailbreak with the method kindlemodding.org recommends for my
   model and firmware (use its "Find my Jailbreak" wizard data).
   Keep airplane mode on and the storage almost full until updates
   are confirmed blocked.
2. Block automatic updates, and verify that they are blocked before
   I turn Wi-Fi back on.
3. Install KOReader so I can read PDF and Word files.
4. Set up the simplest way to send web articles to the Kindle,
   with no server that has to run all the time.
5. Optional: a custom lock screen image that shows both in the normal
   Kindle interface and in KOReader.

## How to talk to me
- Give me one action at a time. Never two steps in the same message.
- Use this format whenever I need to do something:
  **Your turn:** [one concrete action]
  **You should see:** [what happens if it worked]
  Reply "done" or describe what you see.
- Keep messages short. Explain more only if I ask.
- Start each phase with one line on the goal and roughly how long
  it takes.
- If something goes wrong, say "No problem", what happened in one
  line, and the next small step.
- Keep a PROGRESS.md file with the current phase, what's done and
  what's next. Update it after every step. When I come back after a
  break, read it and tell me "We are here: ... Next: ..." in two lines.

## Safety rules
- Check every step against the current guide on kindlemodding.org
  before you ask me to do it. Don't rely on memory, because guides
  change often. Tell me if something differs from the plan.
- Only download from official sources: github.com/KindleModding,
  kindlemodding.org, and the tool's own repository. Tell me what
  you're downloading and from where before you do it, and read any
  script before running it.
- Remind me in one line, at every relevant step, that airplane mode
  must stay on until updates are blocked.
- Before deleting, overwriting or formatting anything on the Kindle,
  show me exactly what will change and wait for my yes. Back up
  instead of deleting when you can.
- After every step, check the Kindle's folders and free space, and
  tell me clearly if something is missing.
- If my computer blocks something (USB, downloads, installs), stop
  and tell me. Don't work around security rules.
- If something looks odd, stop and tell me. Never guess.

## Start
Look up the right jailbreak for my model and firmware, then ask me
only the first thing you need to know.
```

A few tips for using it:

- **Your firmware version matters most.** The same model can need completely different methods depending on the exact version.
- **Let the assistant say no.** If it tells you a guide has changed or a tool doesn't fit your firmware, that's the prompt doing its job.
- **Take breaks.** Because of the progress file, you can stop after any phase and continue another day.

## Tips I'd Give Myself Next Time

- **Check one step at a time.** After each copy, compare the files and the free space before moving on.
- **Close KOReader before plugging in USB**, or the Kindle may not show up as a drive.
- **After ejecting**, unplug and replug the cable if you need to copy something again.
- **Back up before deleting** anything on the Kindle.
- **Don't update the firmware afterwards.** It can undo the jailbreak and the custom lock screen.
