/* =========================================================
   LOVE GIFT — CONFIG
   This is the ONLY file most people need to edit.
   Change the text, photo filenames, names, and messages below.
   Photos go in: assets/photos/
   Song file goes in: assets/audio/  (see AUDIO_FILE below)
   ========================================================= */

const CONFIG = {

  // ---- Screen 1: Lock screen ----
  lockTitle: "This is just for you 🔒",
  lockSubtitle: "Enter the passcode to unlock",
  // Set a real 4-digit code here if you want it to matter.
  // Leave as null to keep the reel-style behavior: wrong once, then unlocks.
  passcode: 1805,

  // ---- Screen 3: Heart jar — "Everything I love about you" ----
  jarHeading: "Everything I love<br>about you",
  jarSubtitle: "tap a heart",
  hearts: [
    { label: "your smile", note: "The way you laugh at your own jokes before finishing them." },
    { label: "how you care for me", note: "You remember the tiny things I forget about myself." },
    { label: "your gestures", note: "Even on your worst days, you still ask about mine first." },
    { label: "your voice", note: "Calm, steady, and somehow always exactly what I need to hear." },
    { label: "your eyes", note: "They light up a second before the rest of your face does." },
    { label: "how you listen to me", note: "Full attention, no phone, like nothing else exists." }
  ],

  // ---- Screen 4: Song ----
  songTitle: "Until I Found You",
  songArtist: "a little something that reminds me of you",
  // Put an mp3 in assets/audio/ and put its filename here to make Play work for real.
  // Leave as null to keep the fake animated player.
  audioFile: null,        // e.g. "song.mp3"
  albumArtImage: null,    // e.g. "assets/photos/album.jpg" — leave null to keep the 💿 emoji
  lyrics: [
    "\"Georgia, wrap me up in all your love...\"",
    "\"I want you in my arms tonight...\"",
    "\"Every road I've walked led me here...\"",
    "\"Until I found you, I was searching...\""
  ],

  // ---- Screen 5: Memories ----
  memoriesHeading: "A little reminder<br>of us",
  memoriesCaption: "every one of these, I'd choose again",
  // Put photos in assets/photos/ and reference the filename here.
  // If a photo is missing, it will fall back to a soft placeholder automatically.
  memories: [
    { photo: "memory1.jpg", caption: "our first date 🌻" },
    { photo: "memory2.jpg", caption: "that road trip 🚗" },
    { photo: "memory3.jpg", caption: "your birthday 🎂" },
    { photo: "memory4.jpg", caption: "just us, lazy sunday ☕" }
  ],

  // ---- Screen 6: Click-to-open gift box ----
  giftHeading: "click on items to open",
  giftSubtitle: "one more thing before you go...",
  giftItems: [
    { emoji: "📼", message: "A mixtape of every song that's ever reminded me of you." },
    { emoji: "💐", message: "For every bouquet I owe you and haven't given yet." },
    { emoji: "📷", message: "Our favorite photo, the one where you weren't ready but it's perfect anyway." },
    { emoji: "🎖️", message: "Best Girlfriend Award — one more screen away 👉" }
  ],

  // ---- Screen 7: Award certificate ----
  awardTitle: "Best Girlfriend Award",
  awardPresentedTo: "this award is presented to",
  herName: "[Her Name]",
  awardMessage: "You are the most precious part of my life. I just wanna say thank you for being here, for listening to all my rants, and for being there when I needed you the most. Happy National Girlfriend Day 🤍",

  // ---- Particles ----
  // Emoji that float upward on every screen. Add/remove as you like.
  particleEmojis: ["💗", "💕", "✨", "💫", "🤍", "⭐"],
  particleFrequencyMs: 550   // lower = more particles, higher = fewer

};
