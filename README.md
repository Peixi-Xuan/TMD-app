# TMD智策 · TMD Clinical Decision App

A mobile clinical decision support tool for pediatric and adolescent temporomandibular disorders (TMD), built with Expo and React Native.

> This app distills 30+ years of clinical expertise from West China Hospital of Stomatology into a structured, accessible tool for dentists and dental learners.

---

## Screenshots

<!-- Paste your 3 demo screenshots here -->

---

## Features

**Knowledge Dictionary** — A searchable reference of 30+ core clinical terms covering TMD etiology, diagnosis, imaging, and treatment modalities. Each entry supports cross-referencing and includes bilingual (Chinese/English) titles and abbreviations.

**Treatment Decision Engine** — A guided, multi-step clinical questionnaire that evaluates facial type, occlusion, behavioral habits, clinical symptoms, CBCT findings, and MRI findings to generate a structured treatment recommendation. The decision logic is proprietary and not included in this repository.

---

## Tech Stack

- **Expo** (SDK 53) + **React Native**
- **TypeScript**
- **Expo Router** — file-based navigation
- Custom **floating capsule tab bar** with animated active states
- **Bottom sheet** entry detail panel with navigation stack
- Font scaling support for accessibility

---

## Project Structure

```
app/
  index.tsx                  # Landing screen
  (tabs)/
    dictionary/              # Knowledge dictionary — list + detail
    treatment/               # Treatment decision — entry point only
components/
  FloatingTabBar.tsx         # Animated floating tab bar
  EntrySheet.tsx             # Slide-up entry detail panel
  EntryListItem.tsx          # Dictionary list row
  FigureView.tsx             # Clinical figure renderer
  JawIllustration.tsx        # SVG jaw anatomy illustration
  BodyText.tsx               # Markdown-aware body renderer
lib/
  dictionary.ts              # Entry lookup, search, and traversal utilities
  figures.ts                 # Figure asset mapping
  fontScale.tsx              # Accessible font scale context
constants/
  theme.ts                   # Design tokens — color, spacing, typography
```

---

## Content & IP Notice

The clinical content (knowledge base and treatment decision logic) powering this app is proprietary and not included in this repository. The repository demonstrates the application architecture, UI components, and navigation system only.

To run the app locally, you will need to supply your own `content/learning-module.json` conforming to the schema defined in [`lib/dictionary.ts`](lib/dictionary.ts).

---

## Getting Started

```bash
npm install
npx expo start
```

Scan the QR code with [Expo Go](https://expo.dev/go) on iOS or Android.

---

## License

MIT — UI and architecture code only. Clinical content is excluded and remains proprietary.
