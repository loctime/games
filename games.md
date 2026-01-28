# Game Plugin Contract (for AI Agents)

This repository implements a **single-page, offline party games app**.
Games are added as **plugins**, not as routes or pages.

This document defines the **non-negotiable contract** for adding new games.

---

## 1. Core architecture (DO NOT BREAK)

- The app uses a **single-page state machine**.
- Screen rendering is controlled by `currentScreen`.
- These files are **LOCKED**:
  - `app/page.tsx`
  - `lib/game-context.tsx`
  - PWA files (manifest, sw, layout)

❌ Never modify these files when adding a game.

---

## 2. What a “game” is

A game is a **self-contained module** under:

