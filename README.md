# TOW Companion (WIP)

Mobile companion app for Warhammer: The Old World, designed to assist players during match setup, gameplay, and scoring.

This project is currently a Work In Progress and represents an effort to design a scalable, modular React Native application with a feature-based architecture and domain-driven approach.

---

## Status

Work In Progress

Core systems are implemented, including:

- Scenario management
- Objectives system
- Terrain and map layouts
- Battle setup and scoring engine
- Player and army structures

---

## Goals

- Provide a complete in-game companion tool
- Improve gameplay flow and reduce manual tracking
- Support competitive formats (f.e. ETC-style layouts)
- Create a scalable architecture for future features
- Integrate seamlessly with the official TOW wiki: https://tow.whfb.app for player-facing documentation.
- Enable flexible game-following options:
  - Single-device play.
  - LAN play, with one device as host and others connecting.
  - Online play via a classic backend server, serving updates through pulls or sockets.
---

## Key Features

### Battle System
- Match setup and configuration
- Turn management
- Allow timer configuration
- Scoring system with objective evaluation
- Battle summary and results

---

### Scenarios & Objectives
- Multiple scenarios with structured data
- Objective system with scoring timing
- Multi-language support (EN / ES / CAT)

---

### Terrain & Maps
- Predefined map layouts (ETC-style)
- Terrain types and positioning
- Visual representation of battlefield elements

---

### Players & Armies
- Player management
- Army structure and unit grouping
- Command group logic

---

### Settings System
- Theme switching
- Language selection
- Audio settings
- Persistent configuration

---

## Tech Stack

- React Native 0.80
- TypeScript
- React Navigation (Custom Drawer)
- MMKV (high-performance local storage)
- i18next (internationalization)
- NativeWind (Tailwind for React Native)
- Context API (global state management)

---

## Architecture

The application follows a **feature-based modular architecture**, inspired by Domain-Driven Design principles.

### Feature Structure

Each feature is isolated and organized into:

- `components`
- `screens`
- `services`
- `repositories`
- `types`
- `helpers / utils`

Example:

```bash
features/battle/
├── components/
├── screens/
├── services/
├── repositories/
├── types/

```

---

## Core Concepts

### Repository Pattern
Used to abstract data access (MMKV storage).

### Service Layer
Encapsulates business logic (e.g. scoring, events, objectives).

### Context API
Used for global concerns:

- Theme
- Settings
- Audio

### Data-Driven Design
Game logic is heavily driven by structured JSON data:

- Scenarios
- Objectives
- Terrain
- Game length

## Internationalization

### Supported languages:
- English
- Spanish
- Catalan

Implemented using i18next with modular translation files.

## App Initialization

On startup, the app preloads core data through repositories:
```typescript
await TerrainItemRepository.init();
await ObjectiveRepository.init();
await ScenarioRepository.init();
...

```
This ensures all domain data is available before rendering the UI components.

## Project Structure
```bash
src/
├── assets/              # Images and visual resources
├── components/          # Reusable UI components
├── features/            # Domain features (DDD-inspired)
├── lib/                 # Core logic (i18n, storage, theme, audio)
├── navigation/          # Navigation system (drawer-based)
├── shared/              # Shared hooks, utils, types
└── App.tsx              # Root component
```

---

## Running the App
```bash
# Install dependencies
npm install

# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

---
## Testing
Basic setup with Jest is included, but tests are not yet implemented.

---

## Current Limitations
- No backend (local storage only)
- No sync between devices
- Limited validation on user inputs
- UI still evolving
- No automated tests yet

---

## Future Improvements
- Add unit and integration tests
- Introduce state management for complex flows (Zustand / Redux Toolkit)
- Sync data across devices (backend/API)
- Improve UX for in-game usage
- Add army builder integration
- Offline-first enhancements
- Performance optimizations for large datasets

---

## License

[ ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

---

## Author

Antonio González García
Full-stack developer
Java - Spring Boot - React - Angular

GitHub: https://github.com/agongar-dev
LinkedIn: https://www.linkedin.com/in/antonio-gonzález-garcía/