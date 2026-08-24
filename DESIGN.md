# Pattern / Press — Design System

## Overview

Pattern / Press treats a JavaScript regular expression as a piece of type. The visitor composes it on the left and reads the highlighted proof and indexed impressions on the right.

## Colors

- Charcoal room: #20272B with soft charcoal #354046.
- Paper: #F4EFE4.
- Ink: #192125.
- Press red: #C94238 for marks, errors, and active flags.
- Proof blue: #3C6687 for the copy utility.
- Warm line: #B9AD9B.

## Typography

- Georgia is the letterpress display face.
- Geist Sans keeps explanatory UI calm and readable.
- Geist Mono is the compositor's voice for patterns, flags, indexes, and proof text.
- Code text keeps a generous line height so matched marks remain scannable.

## Layout

- The sheet opens with a proof thesis and match count, then splits into compose and proof rooms.
- Compose owns pattern, flags, test string, copy, and error state.
- Proof owns highlighted text and indexed match rows.
- Mobile becomes a vertical press sequence: compose first, proof second.

## Elevation & Depth

- The paper sheet has one soft shadow against the charcoal room.
- The proof sheet is inset with a small soft lift to feel like paper on a desk.
- Match marks use a flat ink wash rather than glow or glass.

## Shapes

- Hairline rules, square flag blocks, slash delimiters, and paper surfaces.
- Red is a printed mark, not a generic accent.
- No rounded containers or decorative icon tiles.

## Components

- Pattern field: slash delimiters plus monospace expression.
- Flag block: individually pressed JavaScript flags.
- Proof sheet: test-string metadata and highlighted output.
- Impression list: stable ordinal, match value, index, and groups.
- Error notice: names the JavaScript engine problem directly.

## Do's and Don'ts

- Do keep JavaScript semantics and invalid-pattern errors explicit.
- Do show the actual text being tested and the exact index.
- Don't imply PCRE, Python, API execution, or saved workspaces.
- Don't bury the proof below a marketing explanation.
