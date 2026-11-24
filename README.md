# Vowel Quest
Explore the Sounds of English! An interactive website for English vowel sounds (traditional British RP teaching model). HTML, CSS and vanilla JavaScript only.

## Run it
Unzip and open `index.html` in a modern browser. No server or install needed. (Fonts load from Google Fonts if online; system fonts are used otherwise.)

## Pages
index, learn, detective (Vowel Detective), mouth (Mouth Position Guide), library, flashcards, studio (Pronunciation Studio), practice, game, progress. Progress is saved in `localStorage` (no login). Use the reset button on My Progress to clear it.

## Audio
Two options appear on every audio control:
1. **Recorded audio** plays `assets/audio/<word>.mp3`. No recordings are included. If a file is missing, the site shows a friendly message.
2. **Browser voice** uses the Web Speech API with `en-GB`. It is only an approximation of RP and may use a different voice on your device.

### Add your own verified recordings
1. Record each word clearly (for example with Audacity), export as MP3.
2. Name the file after the word in lowercase, e.g. `see.mp3`, `ship.mp3`.
3. Put the files in `assets/audio/`. Nothing else needs changing.
4. To use another format or folder, edit `AUDIO_DIR` and `AUDIO_EXT` at the top of the audio section in `js/main.js`.

Words used: about, bad, beat, bed, bird, bit, book, boy, car, cat, caught, cot, cup, cut, day, e, food, fool, full, go, hair, heart, hot, hurt, law, lock, luck, my, near, now, pain, pan, pen, pool, pull, seat, see, sheep, ship, sit, tour.

## Add or change content
Vowel data and minimal pairs are in `js/data.js`.

## Academic note
This site uses the traditional RP teaching inventory (12 monophthongs, 8 diphthongs). /ʊə/ is not a distinct diphthong for all modern British speakers.

## References
Roach, *English Phonetics and Phonology*; Cruttenden, *Gimson's Pronunciation of English*; Jones, *Cambridge English Pronouncing Dictionary*; Wells, *Longman Pronunciation Dictionary*; IPA, *Handbook of the International Phonetic Association*. Check editions before citing.

## Version 2.0 additions
- **Pronunciation Studio** (`studio.html`): MediaRecorder-based recording with Record, Stop, Replay, Delete, a timer, a recording indicator, comparison with the reference and a self-assessment checklist. Recordings stay in the browser tab, are never uploaded and are not saved permanently. There is no automatic pronunciation scoring. The microphone needs a supported browser and permission; open the site from https or localhost if the browser blocks it.
- **Practice Zone**: 48 questions (4 categories x 12), shuffled each session, with retry of missed questions.
- **Flashcards** (`flashcards.html`), **Mouth Position Guide** (`mouth.html`) and an upgraded **My Progress** page (accuracy, sections, flashcards, recordings, new badges).
- Practice keys changed: practice-A is now IPA recognition and practice-B is Listening, so old practice scores may show under different names.
- Diagrams are simplified learner sketches, not precise articulatory measurements.

## Testing notes
Checked: JavaScript syntax, internal links, element IDs, quiz generation (48 questions, answer-position balance) and the localStorage helpers, using Node. Not tested in a real browser here: microphone recording, audio playback and mobile layout. Please test these on your own device.

## Version 3.0
- **Audio fix:** every audio control (Flashcards, Library, Practice, Game, Detective, Studio) is the same component in `js/main.js`. It checks whether `assets/audio/<word>.mp3` exists. If it does not, the Recorded button changes to "Recording not available" and explains why. Browser voice (en-GB) is the fallback, with Stop and error messages. Browser voice is not guaranteed to be authentic RP.
- **Learning Passport:** one localStorage key (`vq3`), saved automatically after every answer. Old `vq` data is migrated; corrupted data falls back to a clean state. Data is per browser and per device and is not synchronised. Studio recordings are never saved.
- **Vowel Detective:** four unlockable cases (`detective.html`, `js/detective.js`).
- **Weak-sound tracker:** per-vowel results and confusions drive the recommendations on My Progress (no random suggestions).
- **Flashcards:** saved Mastered / Still learning marks and a Review collection.

## Testing notes (3.0)
Tested in Node: syntax of all scripts, internal links, element IDs, corrupted/legacy localStorage handling, saving, best score and attempt counts, reset, weak-sound states, recommendations and all four detective cases. Not tested in a real browser here: audio playback, microphone recording and mobile layout. Please check these on your own devices.

## Version 4.0 Pass 1: Astral Phonetics Academy
- New dark "Astral" theme in `css/style.css` (Cosmic Navy, Nebula, Stardust, Aether, Starlight; serif headings).
- 24 RP consonants added (`CONS` in `js/data.js`); `SOUNDS` holds all 44. Explorer, Studio and Practice E use them.
- New pages: `index.html` (Astral Command Center), `world.html` (Astralis map), `explorer.html` (Sound Archive).
- Navigation is now 7 items; Mouth Guide, Vowel Chart, Flashcards, Detective and Game sit under Learn and Practice & Games.
- Sound EXP, explorer levels, daily quests and sound collection are calculated from saved quiz results, mastered flashcards, solved cases and Studio recordings. Opening pages earns nothing.
- Characters in this pass: Echo (floating mascot) and simple chibi guides (Lyra, Aster, Vexa) as code-drawn SVG. Full-body art is planned for Pass 2.

## Run locally
Unzip, then open `index.html`. For microphone use, serve over localhost: `python3 -m http.server 8000` in the project folder, then visit http://localhost:8000.

## Publish
Upload the whole folder to any static host: GitHub Pages (push to a repo, enable Pages), Netlify Drop (drag the folder), or Cloudflare Pages. The site needs https for the microphone. Add verified recordings to `assets/audio/` before publishing.
