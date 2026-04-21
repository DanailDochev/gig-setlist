# Gig Setlist — Project Guide for Claude

## Two codebases — never confuse them

|             | `src/`                                      | `prototype/`                                            |
| ----------- | ------------------------------------------- | ------------------------------------------------------- |
| What it is  | The real React app                          | Throwaway design sandbox                                |
| How it runs | `npm start` / `npm run build`               | Open `prototype/Setlist.html` directly in browser       |
| Data format | ES module exports (`export const`)          | Browser globals (`window.PROGRAM = ...`)                |
| Components  | `src/components/*.jsx` imported via bundler | Inline functions inside `filmic.jsx`, `unlock.jsx` etc. |
| Deployed    | Yes — `build/` folder                       | No                                                      |

**Always work in `src/`. Never treat `prototype/` as the source of truth.**  
Don't contribute code to the prototype but not in `src/`, it needs to be ported — it is not live yet.

---

## Real app structure

```
src/
  App.js                  — root: screen state, theme, unlock logic
  data/
    songs.js              — single source of truth for all content
  components/
    Cover.jsx             — landing/cover screen
    ProgramView.jsx       — song list with breaks and karaoke divider
    LyricView.jsx         — lyrics display for a song
    PasswordView.jsx      — PIN entry screen
    SealView.jsx          — wax seal break animation
    RiddleView.jsx        — hangman riddle (final unlock step)
    Grain.jsx             — film-grain canvas overlay
    PhotoBg.jsx           — abstract background photo
    Icons.jsx             — WineGlass, CigaretteIcon SVGs
```

### Screen flow

```
cover → program → [tap surprise row] → password → seal → riddle → program (unlocked)
                                                                  ↑
                                         karaoke section appears here
```

---

## Data (`src/data/songs.js`)

All content lives here. Edit only this file for setlist changes.

- `SECRET_PIN` — 4-digit unlock code (currently `"2104"`)
- `PROGRAM` — ordered array of `song | break | surprise` items
- `KARAOKE_SONGS` — secret songs shown after unlock (all have `secret: true`)
- `LYRICS` — lyrics keyed by song `id` (number)
- `KARAOKE_LYRICS` — lyrics for karaoke songs keyed by `id` (e.g. `"S1"`)

### Song fields

```js
{
  type: "song",
  id: 1,           // number for regular songs, "S1"–"S5" for karaoke
  title: "...",
  duration: "3:42",
  key: "Am",
  karaoke: false,  // NOT used for badge display — badge uses item.secret
  hidden: false,   // true = excluded from the live program
  secret: true,    // only on KARAOKE_SONGS — triggers the ♪ badge
}
```

---

## Karaoke unlock sequence

1. User taps the "Изненада" surprise row
2. `PasswordView` — enter PIN (`2104`)
3. `SealView` — press-and-hold to break the wax seal
4. `RiddleView` — hangman game, answer is КАРАОКЕ
5. On solve → `localStorage.setItem("setlist-secret-unlocked", "1")` → karaoke songs appear

---

## Key decisions

- **Badge (`♪ пей с нас`)** shows only on `item.secret === true` (karaoke section), not on `item.karaoke`. The `karaoke` field on regular songs is legacy data and is not used for display.
- **"secret-divider"** was renamed to **"karaoke-divider"** throughout `src/`.
- The `build/` folder may be stale — run `npm run build` before deploying after any change to `src/`.
- The prototype uses hardcoded `window.PROGRAM` globals and its own PIN/data — changes there have zero effect on the real app.
