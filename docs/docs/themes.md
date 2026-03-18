---
description: Make Ditto look exactly the way you want with 20+ built-in presets, full custom theming, custom fonts, and shareable themes.
---

# Custom Themes

One of Ditto's most beloved features is its theme engine. Here's how to make Ditto look exactly the way you want.

## Quick theme switching

The fastest way to change your theme:

1. Click your **avatar** in the bottom-left sidebar
2. In the popover, you'll see **theme presets** as small preview cards
3. Click one to apply it instantly

You can also switch between **Light**, **Dark**, and **System** modes from the same menu.

## Built-in presets

Ditto ships with 23 theme presets. Many include custom fonts and background images:

| Theme | Vibe |
|---|---|
| **Pink** | Soft pastel warmth with Comfortaa font |
| **Toxic** | Matrix green-on-black with JetBrains Mono |
| **Sunset** | Warm golden hour with Lora |
| **Skater** | Bold neon with Rubik Maps |
| **Kawaii** | Cute pink with Cherry Bomb One |
| **Grunge** | Dark purple with Lacquer |
| **MS Paint** | Retro desktop with Silkscreen |
| **Retro Pop** | Y2K vibes with Bungee Shade |
| **Bubblegum** | Bright purple with Barriecito |
| **Gamer** | Neon green/cyan with Press Start 2P |
| **Cottage** | Earthy greens with Lora |
| **Midnight** | City lights with Inter |
| **Sky** | Airy blue with Nunito |
| **Motherboard** | Classic computing with Courier Prime |
| **Plush** | Soft purple with Comic Neue |
| **Galaxy** | Deep space with DM Sans |
| **Ocean** | Cool teal depths with Nunito |
| **Forest** | Deep greens with Merriweather |
| **Clear Sky Vibes** | Night sky with Comfortaa |
| **Silent Torii** | Japanese red with DM Sans |
| **Quiet Horizon** | Muted earth with Lora |
| **Where Paths Meet** | Moody teal with DM Sans |
| **Once** | Random image with Outfit |

## Full appearance settings

For more control, go to **Settings > Appearance**:

- **Theme mode** -- Light, Dark, or System (follows your OS)
- **Theme preset** -- Choose from the built-in options
- **Content visibility** -- Toggle which content types appear in your sidebar and feed

## How themes work

Under the hood, each theme is defined by just **3 core colors**:

- `background` -- Main page background
- `text` -- Primary text/foreground color
- `primary` -- Brand accent (buttons, links, focus rings)

From these 3 values, Ditto automatically derives 19 CSS custom properties (tokens) that control every color in the interface -- card surfaces, secondary elements, muted text, borders, and more. You never need to set the derived tokens manually.

Themes can also include:

- **Custom fonts** -- Any web font loaded by URL
- **Background images or videos** -- Displayed behind the interface

## Theming for self-hosters

If you're running your own Ditto instance, you can set a default theme for all users in your `ditto.json`:

```json
{
  "theme": "custom",
  "customTheme": {
    "colors": {
      "background": "228 20% 10%",
      "text": "210 40% 98%",
      "primary": "258 70% 60%"
    },
    "font": {
      "family": "Inter",
      "url": "https://example.com/inter.woff2"
    }
  }
}
```

Or use the default dark/light/system modes:

```json
{
  "theme": "dark"
}
```

Users can still override this with their own preferences -- the precedence is:

```
User settings (localStorage) > Build config (ditto.json) > Hardcoded defaults
```

This means you can brand your community instance with a custom look while still letting individuals personalize their experience.
