# Change log: Vowel Quest 3.0
## Added
- Vowel Detective (4 unlockable cases, detective points, clues, explanations).
- Learning Passport and weak-sound tracker with recommendations from saved results.
- Flashcards: Mastered / Still learning, saved flags, Review collection, progress bar.
- Detective link on the home page and in the navigation.
## Modified
- Single localStorage structure (`vq3`) with migration from `vq`.
- Pairs in `data.js` now include vowel symbols so confusions can be tracked.
- Quiz engine records the target vowel and confusions on the first try only.
- My Progress rewritten (accuracy, incorrect, attempts, vowel grid, next steps).
## Fixed
- Audio controls: file check before playback, clear unavailable message, fallback, stop, error handling, one shared component.

# Version 4.0 Pass 1
## Added
Astral theme; 24 consonants (44 sounds total); World Map; Sound Archive; Astral Command Center; EXP, levels, daily quests, sound collection; Practice E (consonants); consonant support in Studio.
## Modified
Navigation grouped into 7 sections with sub-menus; Passport shows EXP, quests and world progress.
## Kept
All earlier pages, quiz engine, audio component, recording, flashcards, detective cases and saved progress.
