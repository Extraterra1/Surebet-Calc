<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->

---
name: 3WaySurebet
description: A 3-way surebet calculator for converting freebet balance into real money.
---

# Design System: 3WaySurebet

## 1. Overview

**Creative North Star: "The Cashier's Window"**

A tool that behaves like a precise, unhurried teller: no flourishes, no distractions, just accurate numbers presented clearly. The interface is functional without being cold. It acknowledges that the person using it is mid-decision, needs fast clarity, and will trust results more when they look earned rather than dressed up.

References: Wise for its matter-of-fact financial clarity; Linear for its discipline around information density; Monzo for making numbers feel approachable without sacrificing precision.

The system explicitly rejects the dark neon sportsbook aesthetic (Bet365, DraftKings, FanDuel) and the excitement-manufacturing design language of gambling platforms. This is a calculator, not a casino.

**Key Characteristics:**
- Light surface with deliberate, named color roles — not decorative color
- Single humanist sans-serif; hierarchy built on scale and weight, not style variety
- Inputs and results carry equal visual weight — both are primary
- Restrained motion: state feedback only, no choreography
- Numerical results are the hero; chrome and decoration serve them

## 2. Colors

Three to four named color roles, each carrying a distinct job. No color appears without a reason.

**The Full Palette Rule.** Every color in the system has a named role. A fifth color may not appear for decoration; if a new color is introduced, a role must be retired or redefined.

### Primary
- **Action Teal** [to be resolved during implementation]: The interactive color — primary buttons, links, active states. Pulled from the cool-to-teal range; precise and confident without defaulting to corporate blue.

### Secondary
- **Positive Green** [to be resolved during implementation]: Profit outcomes and guaranteed return figures. Muted, not neon — reads as "confirmed", not "exciting".

### Tertiary
- **Warm Amber** [to be resolved during implementation]: Caution states, edge-case warnings, breakeven thresholds. Semantic only; never decorative.

### Neutral
- **Warm Off-White** [to be resolved during implementation]: Page surface. Slightly warm, not clinical white.
- **Ink** [to be resolved during implementation]: Body text and numeric display. Near-black, warm-tinted, never pure #000.
- **Divider** [to be resolved during implementation]: Field borders and section separators. Low contrast; only where structure earns it.

**The Meaning Rule.** Secondary (green) and Tertiary (amber) are semantic colors. They appear only when their meaning applies: green = guaranteed positive outcome, amber = threshold or caution. Never for decoration, never just to add visual interest.

## 3. Typography

**Body Font:** Single humanist sans-serif [font pairing to be chosen at implementation — candidates: Inter, DM Sans, Plus Jakarta Sans]

**Character:** One typeface family, leaning humanist — warm enough to feel approachable, geometric enough to make numbers crisp. No display face; scale and weight carry all hierarchy.

### Hierarchy
- **Display** (light or regular weight, ~2.5–3.5rem, line-height ~1.1): The guaranteed return figure and section totals. The number the user came here to read.
- **Headline** (medium weight, ~1.5rem, line-height ~1.3): Input group labels and result category headings.
- **Title** (medium weight, ~1.1rem, line-height ~1.4): Individual field labels.
- **Body** (regular weight, ~1rem, line-height ~1.6, max 65–75ch): Explanatory copy and helper text. Used sparingly.
- **Label** (medium weight, ~0.75rem, uppercase, tracked ~0.06em): Unit indicators (€, %), status chips, section tags.

**The One Family Rule.** A single typeface throughout. No mixing of sans families. Hierarchy is built from scale and weight contrast alone.

## 4. Elevation

Flat by default. The tool is calculation-first; depth is a distraction. Input fields are distinguished from the surface by a stroke border, not a shadow. The result panel may carry a single ambient shadow at rest to separate output space from input space — no hover lift, no floating cards, no layered depth theater.

**The Flat-By-Default Rule.** Surfaces are flat at rest. One shadow is permitted: on the result panel, to mark the boundary between input and output. Nowhere else.

## 5. Components

[No components yet. Re-run `/impeccable document` once implementation begins to capture real component tokens and render live previews.]

## 6. Do's and Don'ts

### Do:
- **Do** use the full palette deliberately: each color appears only in its named role.
- **Do** make inputs and results equally prominent — both are the primary task.
- **Do** use weight and scale contrast (≥1.25 ratio between steps) to build hierarchy within one typeface.
- **Do** present the guaranteed return figure at Display scale — that number is why the user is here.
- **Do** label every color-encoded result with text as well (green figure + "Guaranteed return" label) — never color-only meaning.
- **Do** use restrained motion: transitions only on state changes (focus, hover, result reveal). Ease-out curves, no bounce.

### Don't:
- **Don't** use dark backgrounds, neon accents, or high-contrast flash — no Bet365, DraftKings, or FanDuel visual language.
- **Don't** use Secondary (green) or Tertiary (amber) decoratively. If it is not a profit confirmation or a caution signal, it is the wrong color.
- **Don't** animate CSS layout properties or add choreographed entrance sequences.
- **Don't** use side-stripe border accents (border-left > 1px as a colored accent on any card or list item).
- **Don't** use gradient text (background-clip: text with a gradient background).
- **Don't** use glassmorphism decoratively.
- **Don't** introduce a fifth color role without retiring one. The palette is defined.
- **Don't** use color-only encoding for any result meaning. Always pair color with a visible text label.
