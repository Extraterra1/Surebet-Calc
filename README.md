# 3WaySurebet Calculator

A minimal, focused 3-way betting calculator that distributes your budget across all match outcomes to minimize potential loss. Built with React + Vite.

## Purpose

If you have freebet balance on betting sites and need to withdraw it, you often have to bet on all three outcomes (home win, draw, away win). This calculator tells you exactly how much to stake on each outcome so your return is balanced across all possibilities, minimizing your loss regardless of the result.

## Features

- Distributes budget optimally across 3 outcomes
- Real-time calculation as you type
- Multilingual: English and Portuguese (PT-PT)
- Mobile-friendly input (decimal keyboard on mobile)
- Accessibility: screen reader support, keyboard navigation, focus indicators

## Tech Stack

- React 19 + Vite
- i18next for translations
- OKLCH design tokens
- No external UI libraries

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open `http://localhost:5173` in your browser.

## Design

The interface follows the "Cashier's Window" aesthetic: clean, matter-of-fact, and trustworthy. No dark neon sportsbook vibes or manufactured excitement — just clear numbers.

## License

MIT