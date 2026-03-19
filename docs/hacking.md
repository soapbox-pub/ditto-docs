---
outline: false
description: "Hack on Ditto with Shakespeare, a browser-based AI builder. Edit the code, tweak the UI, add features — no setup required."
---

<div class="page-hero">
  <div class="page-hero-emoji">⚡</div>

# Hacking on Ditto

  <p class="page-hero-sub">The carnival needs new rides. Grab a tool and start building.<br>No gatekeeping, no build-system hazing — just ideas and instant results.</p>
</div>

<div class="page-section">
<div class="big-idea">
<div class="big-idea-emoji">🎪</div>
<div class="big-idea-text">

## Anyone can build the future

Ditto is open source and designed to be hacked on. The codebase isn't a fortress — it's a playground. Whether you want to add a new theme, invent a game, tweak the UI, or build something nobody has imagined yet, these tools make it possible *today* — even if you've never touched a line of code.

The golden era of the internet won't be built by a small team. **It'll be built by everyone who shows up.**

</div>
</div>
</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">🎭</span>

## Edit with Shakespeare

</div>

Shakespeare is a browser-based AI development environment. No installation, no terminal, no local dev setup — just import the Ditto repo and start building. Describe what you want in plain language and watch it happen in real time.

<div class="three-cards">
<div class="fun-card">
  <div class="fun-card-emoji">🌐</div>

### Zero setup

No Node.js, no `npm install`, no build tooling. Everything runs in the browser via WebAssembly. Open a tab and you're in.

</div>
<div class="fun-card">
  <div class="fun-card-emoji">🔮</div>

### Nostr-native tools

13+ built-in tools for working with Nostr events, NIPs, relay queries, and NIP-19 identifiers. It speaks the protocol Ditto is built on.

</div>
<div class="fun-card">
  <div class="fun-card-emoji">👁️</div>

### Live preview

See your changes rendered in real time as the AI makes edits. Git is built in — clone, commit, push, and open a merge request without ever touching a terminal.

</div>
</div>

### How it works

1. Click **[Edit with Shakespeare](https://shakespeare.diy/clone?url=https://gitlab.com/soapbox-pub/ditto.git)** — it opens the Ditto repo in your browser, ready to go
2. Describe what you want — *"add a dark purple theme option"*, *"fix the avatar upload on mobile"*, *"add a new sidebar link for bookmarks"*
3. Shakespeare reads the codebase, understands the structure, and makes the changes
4. See results live, iterate through conversation, and push when you're done

<div style="margin-top: 20px;">
  <a href="https://shakespeare.diy/clone?url=https://gitlab.com/soapbox-pub/ditto.git" target="_blank" class="btn btn-primary">
    <span>Edit with Shakespeare &#8599;</span>
  </a>
</div>

</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">📂</span>

## Source code

</div>

Ditto's code lives on GitLab. Clone it, browse it, fork it — it's all yours.

<div class="big-quote">
  <span class="big-quote-mark">"</span>
  <p>gitlab.com/soapbox-pub/ditto</p>
</div>

```bash
git clone https://gitlab.com/soapbox-pub/ditto.git
cd ditto
```

<div style="margin-top: 20px;">
  <a href="https://gitlab.com/soapbox-pub/ditto" target="_blank" class="btn btn-primary">
    <span>View on GitLab &#8599;</span>
  </a>
</div>

</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">🧰</span>

## Tech stack

</div>

Ditto is built on [MKStack](https://mkstack.xyz), a batteries-included Nostr application framework. Here's what's under the hood:

<div class="three-cards">
<div class="fun-card">
  <div class="fun-card-emoji">⚛️</div>

### React + TypeScript

React 18 with full TypeScript coverage. TanStack Query for data fetching. shadcn/ui component library with TailwindCSS (48+ components).

</div>
<div class="fun-card">
  <div class="fun-card-emoji">📡</div>

### Nostrify

First-class Nostr protocol support — relay connections, event queries, NIP-07 auth, NIP-65 relay management, NIP-04/17 DMs, NIP-57 zaps, and Blossom file uploads.

</div>
<div class="fun-card">
  <div class="fun-card-emoji">🤖</div>

### AI-ready

An extensive `AGENTS.md` system prompt and MCP server configs are baked in, so AI tools like Shakespeare and OpenCode understand the full stack out of the box.

</div>
</div>

### Running locally

```bash
npm install
npm run dev
```

That's it. The dev server starts and you can see your changes live at `localhost`.

<div class="callout-fun">
  <span class="callout-emoji">✨</span>
  <p>You don't need to understand the full stack to contribute. Shakespeare and OpenCode both have deep context on the project — describe what you want and let the AI handle the wiring.</p>
</div>
</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">📚</span>

## Further reading

</div>

<div class="two-cards">
<div class="fun-card">
  <div class="fun-card-emoji">🏗️</div>

### [MKStack](https://mkstack.xyz)

The framework Ditto is built on. Use it to scaffold new Nostr apps with the same stack.

</div>
<div class="fun-card">
  <div class="fun-card-emoji">🖥️</div>

### [OpenCode](https://opencode.ai)

Terminal-based AI coding agent. Full local filesystem, LSP, multi-session — the power tool for deep changes.

</div>
</div>

<div class="two-cards">
<div class="fun-card">
  <div class="fun-card-emoji">📖</div>

### [MKStack Tutorial](https://soapbox.pub/blog/mkstack-tutorial/)

Step-by-step guide to building Nostr apps with Stacks and MKStack.

</div>
<div class="fun-card">
  <div class="fun-card-emoji">🎬</div>

### [Shakespeare Origin Story](https://soapbox.pub/blog/shakespeare-origin-story/)

How Shakespeare evolved from Block's Goose to a browser-based AI builder.

</div>
</div>
</div>

<div class="page-divider"></div>

<div class="page-cta">
  <div class="page-cta-emoji">🔥</div>

## The carnival needs you

Ditto isn't trying to be another platform. It's trying to be the most fun place on the internet — and that takes more than one team. Grab a tool, break something, build something better. The golden era won't build itself.

  <div class="page-cta-actions">
    <a href="https://shakespeare.diy/clone?url=https://gitlab.com/soapbox-pub/ditto.git" target="_blank" class="btn btn-primary">
      <span>Edit with Shakespeare &#8599;</span>
    </a>
    <a href="/philosophy" class="btn btn-ghost">Ditto Philosophy</a>
  </div>
</div>
