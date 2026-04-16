# Figma-driven implementation workflow

This portfolio is built to match designs in Figma. Use the **Figma Desktop** app and the Figma MCP so the AI can read your file.

## What you need

- **Figma Desktop** open with your portfolio file.
- The **node ID** of the frame or component to implement:
  - From the URL: `https://figma.com/design/...?node-id=1-727` → node ID is `1:727` (use colon).
  - Or right-click the frame in Figma → Copy link → the URL contains `node-id=...`.

## How to implement a section or component

1. **Share the Figma node**  
   Send the Figma URL (with `node-id` in the query) or the node ID (e.g. `1:727`).

2. **Design context**  
   The AI will use `get_design_context` to get structure, styles, and suggested code for that node.

3. **Design tokens (optional)**  
   For colors, spacing, and typography, the AI can use `get_variable_defs` on the same node (or the file root) and map them into `src/app/globals.css` and Tailwind.

4. **Visual reference (optional)**  
   `get_screenshot` can be used to get a screenshot of the node while implementing.

5. **Implementation**  
   The AI will add or update React components in `src/components/` and use them in `src/app/page.tsx`, with responsive breakpoints and the existing design tokens.

## Design tokens (current)

Defined in `src/app/globals.css` from Figma variables:

- `--text-primary`: #070707  
- `--text-secondary`: #4b4d53  
- `--icon-secondary`: #727680  
- `--card-shadow`: 0 2px 8px 1px rgba(0, 0, 0, 0.1)

When you add or change variables in Figma, share the file (or node) again and we can sync these tokens.

## MCP tools used

| Tool                 | Use                                                                 |
| -------------------- | ------------------------------------------------------------------- |
| `get_design_context` | UI structure, styles, and suggested code for a frame/component.     |
| `get_variable_defs`  | Design tokens (colors, spacing, typography) for theme/CSS.          |
| `get_screenshot`     | Screenshot of a node for visual reference.                          |
| `get_metadata`       | Page structure and node IDs when the file has many frames.          |
