# Custom Themes

One of Ditto's most beloved features is its theme engine. Here's how to make Ditto look exactly the way you want.

## Quick theme switching

The fastest way to change your theme:

1. Click your **avatar** in the bottom-left sidebar
2. In the popover, you'll see **theme presets** as small preview cards
3. Click one to apply it instantly

You can also switch between **Light**, **Dark**, and **System** modes from the same menu.

## Built-in presets

Ditto ships with 7 handcrafted theme presets:

| Theme | Vibe | Mode |
|---|---|---|
| **Black** | OLED true black | Dark |
| **Pink** | Soft pastel warmth | Light |
| **Midnight** | Deep blue night | Dark |
| **Toxic** | Matrix green-on-black | Dark |
| **Lavender** | Purple pastel dream | Light |
| **Ocean** | Cool teal depths | Dark |
| **Sunset** | Warm golden hour | Light |

## Full appearance settings

For more control, go to **Settings > Appearance**:

- **Theme mode** -- Light, Dark, or System (follows your OS)
- **Theme preset** -- Choose from the built-in options
- **Content visibility** -- Toggle which content types appear in your sidebar and feed

## Theme tokens

Under the hood, each theme is a set of 19 CSS custom properties (tokens) that control every color in the interface:

- `background` / `foreground` -- Main page colors
- `card` / `card-foreground` -- Card surfaces
- `primary` / `primary-foreground` -- Brand accent
- `secondary` / `secondary-foreground` -- Secondary elements
- `muted` / `muted-foreground` -- Subtle text and backgrounds
- `accent` / `accent-foreground` -- Interactive highlights
- `destructive` / `destructive-foreground` -- Danger/delete actions
- `border` -- Border colors
- `input` -- Form input borders
- `ring` -- Focus ring color

## Theming for self-hosters

If you're running your own Ditto instance, you can set a default theme for all users in your `config.json`:

```json
{
  "theme": "midnight"
}
```

Users can still override this with their own preferences -- the precedence is:

```
User settings (localStorage) > Build config (config.json) > Hardcoded defaults
```

This means you can brand your community instance with a custom look while still letting individuals personalize their experience.
