---
title: "How I Jailbroke My Old E-Reader (and How You Can Too)"
date: 2026-11-23
tags: ["E-Readers", "Jailbreaking", "Device Modding", "AI Assistants"]
---

![Impressionist painting of a woman in a garden by a lily pond, smiling at an e-reader as books, pictures and broken chains stream out of it with the words Unlocked, Custom Art, PDF, EPUB and Airplane Mode](/images/notes/e-reader-jailbreak/hero.jpg)

I've had an older e-reader for years. It worked fine, but it was locked down: only the vendor's own formats, a fixed lock screen, and nowhere good to put my PDFs and Word documents. I finally decided to open it up. I did it together with an AI assistant that guided me one step at a time. This note covers what I wanted, how it went, a step-by-step version you can follow yourself, and the prompt I'd use to get an AI assistant to guide you the same way.

## What I Wanted

I had four goals, in this order:

1. **Jailbreak the device** without it updating itself and closing the exploit.
2. **Install a better third-party reading app** that handles PDFs and Word documents natively.
3. **Send web articles to the device** with one click, without running a server.
4. **Use my own art on the lock screen**, both in the stock interface and in the new reading app.

I also wanted to do it calmly. A single wrong move, like letting the device download an update at the wrong moment, can close the door for good. So the rule was one action from me at a time, with a check after every step.

## How I Did It

### Preparation

The first surprise was that **my work laptop blocked the e-reader as a USB drive**. Its security software wouldn't allow it, and I didn't try to get around it. I moved the whole project to my personal computer instead.

Then I protected the device against updates in two ways:

- I turned on **airplane mode** and left it on.
- I ran a small script that **filled the storage with dummy files** until only about 50 MB was left. The device can't download an update it has no room for.

The assistant read the script before I ran it. It was short and only wrote inside one folder on the device.

### The Jailbreak

I rebooted the device, copied the exploit's files onto it (including a hidden folder), and ejected it properly. Then I opened the built-in store. The exploit's page loaded instead, and I tapped its button. After about 30 seconds the screen showed some text and the interface restarted. A "you are jailbroken" text file appeared in the documents folder, which confirmed it worked.

Before deleting the filler files, we checked the root of the device for half-downloaded update files. There were none, so the filler went and I got almost 3 GB back.

### The Guides Had Changed

My plan was based on older instructions with several extra steps: a hotfix, an app launcher, a package installer, and then disabling updates by hand. When the assistant checked the current community guide, all of that had been moved to a "legacy" section. The jailbreak now blocks updates by itself and comes with a package manager.

To be careful, I checked on the device before turning Wi-Fi back on. The "update your device" option in settings was greyed out, which is a good sign that updates are blocked.

### The Reading App

With Wi-Fi on, I typed two commands into the device's search bar: one to update the package list and one to install the reading app. A success message appeared. The icon took a while to show up, so I started the app with a third command instead. It opened right away.

PDFs worked immediately. The first Word test file failed, but only because it had been built by hand with too few internal parts. A complete file opened fine, and changing the font size worked too.

### Articles

For articles I used the vendor's own browser extension. It sends the article to the device in one click, and it showed up in the library a few minutes later. It lands in the stock reader rather than the new app, but that's fine for me since I don't need a server.

### Custom Lock Screen

This was the trickiest part. The modern screensaver tool required a slightly newer firmware than mine. It turned out to be an advantage, though: an older screensaver hack **only works on older firmware**, and mine was just below the cutoff.

That hack needed the "legacy" pieces after all: an app launcher menu and a package installer. We copied all three onto the device, I opened the launcher menu and tapped "install packages," and the device rebooted. The hack showed its own test lock screen, which confirmed the install.

The assistant converted my own image to the exact format the hack requires and replaced the test image with it. I restarted the device with the cable unplugged, and my image appeared on the lock screen.

One last thing: inside the third-party reading app, the lock screen only showed a small "Sleeping" box. The app handles sleep itself. In its sleep-screen settings, I chose a custom image, picked the same file, and removed the message. Now the same image shows everywhere.

## How You Can Do It Yourself

Exactly which files and exploit you need depends on your model and firmware, so always use the current community guide for your device. But the overall order and the checks along the way are the same.

### 1. Prepare

- **Use a personal computer**, not a work machine. Work laptops often block USB drives, and you shouldn't try to get around that.
- **Find your model and firmware version** in the device's settings. Use them to find the right exploit in the community guide.
- **Turn on airplane mode** and leave it on until updates are confirmed blocked.
- **Fill the storage** to around 20–50 MB free with a filler script. Read the script first.

**Done when:** the device has very little free space and airplane mode is on.

### 2. Jailbreak

- **Reboot the device first**, then connect it to your computer.
- **Unpack the exploit on your computer**, not directly on the device. Then copy everything over, including hidden folders.
- **Eject properly**, unplug, and follow the guide's steps on the device.

**Done when:** a "jailbroken" file appears in the documents folder.

### 3. Clean Up and Block Updates

- **Check the device root** for update files (names like `update*.bin` or `.partial`). Delete them **before** you remove the filler.
- **Delete the filler folder.**
- **Check the update option** in settings. If it's greyed out, that's a good sign updates are blocked. Only then turn Wi-Fi back on.

**Done when:** the filler is gone, the update option is greyed out, and Wi-Fi is on.

### 4. Install the Reading App

- **Update the package list** with the package manager, then install the reading app. On many jailbreaks you type these commands into the device's search bar.
- **If the icon doesn't show up**, start the app with a command instead.

**Done when:** the reading app opens and can open a PDF.

### 5. Send Articles to the Device

- **Install the vendor's own send-to-device browser extension.** Check the publisher, since there are many look-alikes.
- **Send one article as a test**, and check the library a few minutes later.

**Done when:** the test article shows up on the device.

### 6. Custom Lock Screen (Optional)

- **Check which screensaver hack fits your firmware.** The newer tools often need newer firmware, while the older hacks only work on older firmware.
- **Convert your image to exactly what the hack requires.** For mine, that meant the exact screen resolution, portrait, 8-bit grayscale PNG, and no embedded colour profile. Scale to fit rather than crop if the image has a border.
- **Put the image in the hack's image folder** and restart the device **with the cable unplugged**.
- **Set the same image in the reading app's sleep-screen settings**, so you get it there too.

**Done when:** your image shows up whether you're in the stock interface or the reading app.

## A Copy-Paste Prompt for Your AI Assistant

What made this work for me was letting an AI assistant handle the research, downloads, copying and checks, while I only did what needed my fingers on the device. Below is a prompt that sets that up. It works best with an assistant that can run commands and read files on your computer, but it also works in a normal chat if you do the computer steps yourself.

Fill in the brackets and paste it in as your first message, or save it as an instruction file in your project folder.

```text
You are my guide for jailbreaking and setting up my e-reader. Walk me
through it step by step.

## My device
- Model: [MODEL AND GENERATION]
- Firmware: [FIRMWARE VERSION, from Settings → Device info]
- Free space: [FREE SPACE]
- Registered to my account: [YES / NO / NOT SURE]
- Computer: [OPERATING SYSTEM], personal machine (not a work computer)

## My goals, in this order
1. Jailbreak with the exploit the community guide recommends for my
   model and firmware. Keep airplane mode on and the storage almost
   full until updates are confirmed blocked.
2. Block automatic updates, and verify that they are blocked before
   I turn Wi-Fi back on.
3. Install a third-party reading app that opens PDF and Word files.
4. Set up the simplest way to send web articles to the device,
   with no server that has to run all the time.
5. Optional: a custom lock screen image that shows both in the stock
   interface and in the reading app.

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
- Check every step against the current official community guide for
  my device before you ask me to do it. Don't rely on memory, because
  guides change often. Tell me if something differs from the plan.
- Only download from official sources: the exploit's own repository
  and the community guide. Tell me what you're downloading and from
  where before you do it, and read any script before running it.
- Remind me in one line, at every relevant step, that airplane mode
  must stay on until updates are blocked.
- Before deleting, overwriting or formatting anything on the device,
  show me exactly what will change and wait for my yes. Back up
  instead of deleting when you can.
- After every step, check the device's folders and free space, and
  tell me clearly if something is missing.
- If my computer blocks something (USB, downloads, installs), stop
  and tell me. Don't work around security rules.
- If something looks odd, stop and tell me. Never guess.

## Start
Look up the right jailbreak method for my model and firmware, then
ask me only the first thing you need to know.
```

A few tips for using it:

- **Your firmware version matters most.** The same model can need completely different methods depending on the exact version.
- **Let the assistant say no.** If it tells you a guide has changed or a tool doesn't fit your firmware, that's the prompt doing its job.
- **Take breaks.** Because of the progress file, you can stop after any phase and continue another day.

## Tips I'd Give Myself Next Time

- **Check one step at a time.** After each copy, compare the files and the free space before moving on.
- **Close the reading app before plugging in USB**, or the device may not show up as a drive.
- **After ejecting**, unplug and replug the cable if you need to copy something again.
- **Back up before deleting** anything on the device.
- **Don't update the firmware afterwards.** It can undo the jailbreak and the custom lock screen.
