# Changelog

## 2.0.0 (30 October 2026)

A full rebuild. The data was re-extracted from the source PDFs, every study word was given a complete entry, and the app was redesigned.

### Problems found in 1.0.0 and 1.0.1.1, and how 2.0.0 fixes them

**Publishing**
1. The 1.0.x GitHub zip held the **older 1.0.0** `index.html` (1,851 words), not 1.0.1.1 (2,964 words), so uploading it would have published the old app. 2.0.0 ships one package built from one source.
2. The service worker used a fixed cache name (`vocab-mas-v1`) and served `index.html` cache-first, so phones that installed the app would **never receive an update**. 2.0.0 versions the cache and loads `index.html` network-first.
3. The photos were embedded in `index.html` as base64 (a 160 KB line) and also shipped as two unused JPEGs (1.1 MB). 2.0.0 uses two compressed files (237 KB).

**Word data**
4. Only **355 of 2,964 words (12%)** had a meaning. The other 2,609 were empty shells that relied on live web APIs, so they failed offline and in the Claude preview. All 6,483 study words now have a full offline entry.
5. Only **36 words** had five or more example sentences. Every study word now has exactly five practical, everyday sentences (32,415 in total).
6. Only **60 words** had synonyms and antonyms, and 35 had related words. Every entry now has ranked synonyms, antonyms and related words.
7. **277 words** showed the placeholder part of speech "WORD".
8. The Gregmat, TOEFL, Oxford and Everyday tags were **invented**: hand-assigned to the 40 starter words with no source list (for example *susceptible* was tagged Barron's and Gregmat, but among the PDFs it appears only in Word Smart II). In 2.0.0 every tag comes from a real list: TOEFL is Coxhead's Academic Word List, Everyday is the Oxford 3000. No GregMat list was supplied, so instead of a fake tag there is an **Import a list** feature.
9. **Extraction errors:** GRE 500 Essential had 498 of 500 cards and Advanced 499 (words with accents or punctuation such as *naïve*, *précis*, *e.g.* and *pre-empt* were dropped); the IBA list kept 78 inflected forms as separate words (*abating*, *advocates*, *shone*, *crept*) and OCR typos (*fimidity*, *delinquish*); the Word Smart list included word roots and jargon as words (*extra*, *hyper*, *hypo*, *para*, *anim*, *ante*, *chron*, *ascii*); *strut* appeared twice. All are fixed: 500/500 cards, base forms with corrected spelling, and only real headwords.
10. The "IPA" was the respelling lowercased (`[suh-SEP-tuh-bul] / suh-sep-tuh-bul /`), and most words had no pronunciation. 2.0.0 shows a Thesaurus.com-style respelling with the stressed syllable in bold, plus real IPA (`/səˈsɛp tə bəl/`).
11. Barron's meanings were copied word for word, typos included ("subside , or moderate"), into a public repository. 2.0.0 uses only headwords from the source books and writes its own definitions.
12. There were no Bangla meanings. Every full entry now has one.

**App**
13. On a 390 px phone the header menu ran off screen (About was cut off), the theme button wrapped onto its own row, and the page scrolled sideways. 2.0.0 has a bottom tab bar and no horizontal scrolling.
14. Labels used `font: … Barlow` with no fallback, and the fonts came from Google Fonts, which the service worker did not cache, so offline they fell back to Times New Roman. 2.0.0 self-hosts the fonts with proper fallback stacks.
15. Tapping a synonym that was not a headword jumped to the home page. Now 20,599 words open a page, and the rest open a "not found" page with spelling suggestions and online dictionary links.
16. Flashcards and the quiz only used the 355 words with meanings, and nothing was remembered. 2.0.0 adds spaced-repetition flashcards, learned/learning progress for every list, a streak, and quiz modes for meaning, synonym, Bangla and fill-in-the-blank.
17. The page title and footer said "Vocab Master". They now say **Vocab MASter**.

### New in 2.0.0
- Entry pages laid out like Thesaurus.com, with no ads: section tabs, sense cards, Strongest/Strong/Weak synonym tiers, antonyms, examples, related words, lists and WordNet definitions.
- An animated synonym map, Word of the Day with an archive, Spin the Wheel, a Match game, saved words and history.
- IBA year filter (BBA 05-06 to MBA 2018) and AWL sublist filter.
- MAS Studio branding: truss-"M" logo, Barlow typography, green and red palette, About page with photos and links to every MAS Studio app.
- `verify.js` data check.
