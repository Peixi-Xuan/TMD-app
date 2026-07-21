# TMD Clinical Decision App (TMD智策)

A mobile clinical decision support tool for pediatric and adolescent temporomandibular disorders (TMD), built with Expo and React Native.

> My mom has spent 30+ years as a TMJ specialist at West China Hospital of Stomatology. This app is my way of turning her clinical expertise into something tangible: a structured decision support tool for dentists, built as part of her patent application journey.

---

## Screenshots

<img width="220" height="478" alt="IMG_8557" src="https://github.com/user-attachments/assets/011eeb09-a5b3-4b43-980f-ba017ec6476d" />
<img width="220" height="478" alt="IMG_8558" src="https://github.com/user-attachments/assets/969769e0-62f0-4546-8614-5a0a2af40010" />
<img width="220" height="478" alt="IMG_8559" src="https://github.com/user-attachments/assets/35e7563d-97de-470b-ba2f-b1ae694d5835" />

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
