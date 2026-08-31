# Luxembourgish review checklist

**Status: approved.** The site's owner approved the Luxembourgish text on
2026-08-31. In that same commit, both markers described below were removed from
the four `lb/` pages and the four `/lb/` URLs were added to `sitemap.xml`. The
pages are now indexable and live like any other page on the site.

The four pages under `lb/` were originally written by a language model that
could not vouch for Luxembourgish, and neither could the site's owner at the
time. They shipped with two markers:

- `<meta name="robots" content="noindex">` in each `<head>`
- `<!-- Machine-authored Luxembourgish. Not yet reviewed by a native speaker. -->`
  at the top of each file

The twelve-item list below (of the full twenty-four) is retained as-is: it is
the record of exactly what the translator was unsure about, and stays useful if
anyone revisits the Luxembourgish prose later.

---

## 7. Low-confidence translation choices

**This is the section that matters.** Everything below is something I wrote
without being able to verify it. The list is ordered by consequence, not by how
wrong I think it is. Items 1–12 are the ones I would put in front of a native
speaker first.

### 1. The nationality sentence — administrative register

- **English:** "with a Luxembourgish nationality application filed and under review"
- **Wrote:** `Eng Demande fir déi lëtzebuergesch Nationalitéit ass agereecht a gëtt am Moment gepréift.`
- **Unsure because:** the *hedge* is right and I am confident about that. What I
  cannot vouch for is the administrative register, which is exactly what a
  Luxembourgish reader will be sensitive to. `Demande` is the ordinary borrowing
  for an application, but Luxembourg administrative language may prefer a fixed
  formula (`eng Demande op d'lëtzebuergesch Nationalitéit`, or a specific term
  for reacquisition — the French page uses *recouvrement*, which the English does
  not, so I followed the English). I am also unsure of `agereecht` (from
  *areechen*, to submit) and `gëtt gepréift` (is being examined) as the natural
  verbs here. **Check this sentence first.**

### 2. `Aschränkung` for "Constraint"

- **Wrote:** `Aschränkung` as the section heading and `<dt>` label, from German
  *Einschränkung*.
- **Unsure because:** I could not confirm it is the word a Luxembourgish engineer
  would use for a design constraint rather than a restriction in the legal sense.
  `fr/` chose *Contrainte*, and keeping the French borrowing may be more natural
  here too. **This appears 16 times across the four pages** — if it is wrong it
  is wrong everywhere, so it is cheap to fix but worth deciding early.

### 3. `Wat ech anescht maache géif` for "What I'd do differently"

- **Unsure because:** two things at once — the conditional formed with `géif`,
  and the eifeler-Regel elision of `maachen` → `maache` before it. Some speakers
  would order it `Wat ech anescht géif maachen`. It is an `<h2>` on three pages.
  A reviewer can reword it freely — the checker now takes the *last* `<h2>`
  section rather than matching its text, so no Luxembourgish wording on these
  pages is pinned by the test suite.

### 4. The eifeler Regel throughout

- **Wrote:** final `-n` dropped before consonants other than n, d, t, z, h and
  vowels; kept before punctuation.
- **Unsure because:** I applied it by rule rather than by ear, and it is the
  single most visible marker of non-native Luxembourgish. Every instance is a
  place I could be wrong. The ones I am least sure of: `u seng Grenze stéisst`
  (`un` → `u`), `a mam Späicher` (`an` → `a`), `opruffe kann`, `erausgi muss`,
  `virukomme kann`, `Bedéngunge vun`, `entstane sinn`, `Ofhängegkeete mat`. I
  also avoided `schonn schafft` entirely by rewriting to `souwisou schafft`,
  because I did not know whether `schonn` elides.

### 5. Adjective declension

- **Unsure because:** this is where I am least reliable overall, and it is spread
  across every page. Worth a sweep: `déi intern Android-Equipe`,
  `en hybriden Opbau`, `déi angenehmst Entscheedung`,
  `dat eenzegt dauerhaft Resultat`, `am selwechte Code`,
  `vun engem eidele Repository`, `déi aktuell Standarde`,
  `mat alen an neie Patterns`, `den éischten Instagram-DM-Agent`.
- I dodged the problem once rather than guess: **"Selected work"** became
  `Eng Auswiel vun Aarbechten` ("a selection of works") instead of
  `Ausgewielt Aarbechten`, purely because I was unsure of the plural attributive
  ending. The heading is wordier than the English as a result.

### 6. `zweeanhallef` for "two and a half"

- **English:** "A fifteen-minute pipeline cut to two and a half."
- **Wrote:** `Eng Pipeline vu fofzeng Minutten op zweeanhallef erofgesat.`
- **Unsure because:** I formed `zweeanhallef` by analogy with German
  *zweieinhalb* and am not confident of the spelling or that Luxembourgish builds
  it this way. Writing `2,5` would be safe and is what the same page's proof-item
  and both case pages already do.

### 7. `E MCP-Client` — the indefinite article before an acronym

- **Wrote:** `<strong>E MCP-Client.</strong>`
- **Unsure because:** the article depends on the *sound*, not the letter. If
  "MCP" is read out as *Em-Cee-Pee* it begins with a vowel sound and may want
  `En`. I picked the consonant form. Same question applies to `kee API-Schlëssel`.

### 8. `Apparat` vs `Handy`, and the gender of `Handy`

- **Wrote:** `Apparat` for "device", `Handy` for "phone", and treated `Handy` as
  masculine — `den Handy verloossen`, `um Handy`.
- **Unsure because:** the gender is a guess from German *das Handy* versus what I
  believe is Luxembourgish *den Handy*; if it is neuter, `den Handy` is wrong in
  two places. The split between the two nouns is also mine, not the English's —
  English uses "device" and "phone" in specific spots and I may not have matched
  them.

### 9. Technical vocabulary I formed by analogy rather than found

Each of these was built from a German or French pattern because I could not
confirm an established Luxembourgish term. Any of them may be a word a
Luxembourgish engineer would simply not use, preferring the English:

| English | Wrote | Built from |
|---|---|---|
| quantization | `Quantiséierung` | de. *Quantisierung* / fr. *quantification* |
| runtime (at ~) | `zur Lafzäit` | de. *zur Laufzeit* |
| full-text search | `Volltextsich` | de. *Volltextsuche* |
| loop (program) | `Schleef` | de. *Schleife* |
| order, sequence | `Reiefolleg` | de. *Reihenfolge* |
| datacentre | `Rechenzentrum` | de. *Rechenzentrum* |
| tacit knowledge | `stëllschweigend Wëssen` | de. *stillschweigendes Wissen* |
| inversion of control | `Ëmkéierung vun der Kontroll` | calque of the English |
| loyalty programme | `Fidelitéitsprogramm` | fr. *fidélité* |
| home page (aria-label) | `Startsäit` | de. *Startseite* |
| filesystem | `Fichier-System` | LB *Fichier* + de. *System* |
| CI runs (plural) | `CI-Leef` | plural of `Laf`; plural form uncertain |

For `Fichier` I am fairly confident of the singular and less so of the plural
`Fichieren`, which appears in all three case pages.

### 10. Two places where I deliberately said something slightly weaker than the English

Both are meaning changes, not just wording, so they need a decision rather than a
proofread:

- **"or the old way wins by inertia"** → `soss gewënnt deen ale Wee duerch
  d'Gewunnecht` — *"by habit"*. I could not vouch for a Luxembourgish word for
  *inertia* in the figurative sense, and `Trägheet` felt like an invention. Habit
  is close but not the same idea.
- **"another implementation compiled into the binary"** → `eng weider Ëmsetzung
  … déi mat an d'App kompiléiert gouf` — *"into the app"*. I had no confident
  word for *binary*: `Binärdatei` is German and mixes badly with Luxembourgish
  `Fichier`. Loses a little precision.

### 11. `iwwer de Kapp gewuess` for "outgrew"

- **English:** "The tool layer outgrew the app."
- **Wrote:** `D'Tool-Schicht ass der App iwwer de Kapp gewuess.`
- **Unsure because:** this is the German idiom *über den Kopf wachsen*, which
  carries "grew beyond one's control" — close to the English but not identical,
  and I do not know whether the idiom exists in Luxembourgish at all. A plain
  `ass méi grouss ginn wéi d'App` would be safe if it does not.

### 12. `D'Iwwerginn` for "the handover"

- **Wrote:** `D'Iwwerginn vum Code huet ënner engem lafende Betrib misse
  geschéien` and `d'Iwwerginn als Erlaabnes ze gesinn`, but also `d'Iwwernahm`
  ("the takeover") in the same page's reflection.
- **Unsure because:** I am not confident `Iwwerginn` nominalises this way, and
  using two different nouns for what the English calls one thing (the handover)
  on one page may read as inconsistent even if both words are valid.

### Remaining smaller items

13. `KI` for AI. Luxembourgish media use `KI`, `AI` and `IA`; I chose the German
    form throughout, including `KI-Assistent` in an `<h1>`. A house style may
    differ.
14. `Parcours` as the "Track record" heading — a French borrowing. `Karriär` may
    be more natural.
15. `Rendez-vousen` as the plural of *Rendez-vous* for in-store appointments —
    plural formation and hyphenation both uncertain. Appears twice per HUGO BOSS
    page.
16. `Butteker` for "stores" in the Pitaia result. I believe *Buttek*/*Butteker*
    is right, but in an e-commerce context a native might say *Online-Shops*.
17. `Erlaabnes` for "licence/permission", `lassleeën` for "get going",
    `virukommen` for "make progress", `auskommen mat` for "make do with" — all
    plausible, none verified in these senses.
18. `Clipboard` left in English rather than invent a compound from German
    *Zwischenablage*. Flagging in case a native term is preferred.
19. Month names: `Mäerz`, `Abrëll`, `Februar`, `August`, `Juni`. I am confident
    about `Mäerz` and `Abrëll` and less so about the rest.
20. `Quellcode` for "source" in the Brownie link and meta line — German. `Code
    source` (French) or plain `Source` may fit better.
21. `Sproochmodell` for "language model", treated as neuter (`E Sproochmodell,
    dat …`). Gender is a guess.
22. `verléisst` (from *verloossen*) in `Näischt verléisst den Apparat` — third
    person singular form.
23. `Aart a Weis ze schaffen` for "way of working" — used three times on the HUGO
    BOSS page. Reads naturally to me but I cannot confirm the fixed phrase.
24. `Marketplace fir Luxusmode` — kept "Marketplace" in English, as the French
    page does.

### What is *not* on this list

Structure, paths, metadata and markup were mechanical and are verified above —
those I am confident in. The uncertainty is entirely in the Luxembourgish prose.
Removing the two markers is the checklist for "Luxembourgish validated", and
nothing else about these pages changes at that point.

---

