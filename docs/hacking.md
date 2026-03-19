---
outline: false
description: "Hack on Ditto with AI-powered tools. Use MKStack, OpenCode, or Shakespeare to build features, fix bugs, and ship changes — no gatekeeping required."
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
  <span class="section-emoji">🏗️</span>

## MKStack

</div>

[MKStack](https://mkstack.xyz) is the framework that Ditto and other Soapbox Nostr apps are built on. A batteries-included React + TypeScript + Tailwind starter with deep Nostr integration — and what both Shakespeare and OpenCode understand when they work on Ditto.

<div class="three-cards">
<div class="fun-card">
  <div class="fun-card-emoji">📡</div>

### Nostrify

Relay connections, event queries, and full protocol handling out of the box.

</div>
<div class="fun-card">
  <div class="fun-card-emoji">🧩</div>

### 48+ components

shadcn/ui component library with TailwindCSS. React 18, TypeScript, and TanStack Query for data fetching.

</div>
<div class="fun-card">
  <div class="fun-card-emoji">🔐</div>

### Nostr built-in

Auth (NIP-07), relay management (NIP-65), DMs (NIP-04/17), zaps (NIP-57), file uploads via Blossom, and NIP-19 routing.

</div>
</div>

### Build something new

If you want to create your own Nostr app using the same stack Ditto is built on:

```bash
# Install Stacks CLI
npm install -g @getstacks/stacks

# Create a new project from the MKStack template
stacks mkstack

# Start the AI agent
stacks agent
```

The `stacks agent` command launches **Dork**, an AI assistant that understands the full MKStack framework, all 50+ Nostr NIPs (via [Nostrbook MCP](https://nostrbook.dev)), and the React/TypeScript patterns used across the project.

When you're ready to ship:

```bash
npm run deploy
```

This builds your app, uploads it to Blossom servers, publishes it to Nostr relays, and makes it live on [NostrDeploy.com](https://nostrdeploy.com).

<div class="callout-fun">
  <span class="callout-emoji">🪐</span>
  <p>The Nostr ecosystem needs more rides in the carnival. MKStack is how you build them — with full AI support, first-class protocol integration, and one-command deployment to the decentralized web.</p>
</div>

**Source code:** [gitlab.com/soapbox-pub/mkstack](https://gitlab.com/soapbox-pub/mkstack)

</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">🖥️</span>

## OpenCode

</div>

[OpenCode](https://opencode.ai) is an open source AI coding agent that runs in your terminal. Full local filesystem access, shell commands, LSP integration, multi-session support — this is the option for developers who want total control.

### Getting started

```bash
# Install OpenCode
curl -fsSL https://opencode.ai/install | bash

# Clone Ditto and start hacking
git clone https://gitlab.com/soapbox-pub/ditto.git
cd ditto
npm install
opencode
```

Describe what you want to do in natural language. OpenCode reads your files, runs commands, makes edits, and verifies the results — all while you watch and guide it.

<div class="two-cards">
<div class="fun-card">
  <div class="fun-card-emoji">⚙️</div>

### Full local environment

Access to the real filesystem, real build tools, real test runners. Run `npm run dev` in one terminal, OpenCode in another.

</div>
<div class="fun-card">
  <div class="fun-card-emoji">🧠</div>

### LSP-enabled intelligence

OpenCode automatically loads language servers for TypeScript, giving the AI deep understanding of types, imports, and project structure.

</div>
</div>

<div class="two-cards">
<div class="fun-card">
  <div class="fun-card-emoji">🔀</div>

### Multi-session

Run multiple agents in parallel on different parts of the codebase. This is the pattern Soapbox uses to build its own AI agents — including [Sheila](https://soapbox.pub/blog/announcing-sheila/), an accounting agent built entirely with OpenCode.

</div>
<div class="fun-card">
  <div class="fun-card-emoji">🎯</div>

### Human-in-the-loop

You see every change before it lands. 75+ providers through Models.dev, including local models, GitHub Copilot, and ChatGPT Plus/Pro.

</div>
</div>

<div class="callout-fun">
  <span class="callout-emoji">🔥</span>
  <p>OpenCode is the right choice when you need the full build pipeline, runtime debugging, multi-file refactors, or deep iteration on complex changes.</p>
</div>

**Source code:** [github.com/anomalyco/opencode](https://github.com/anomalyco/opencode)

</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">🎭</span>

## Shakespeare

</div>

[Shakespeare](https://shakespeare.diy) is Soapbox's open source, browser-based AI development environment. No installation, no terminal, no local dev setup — just import the Ditto repo and start building. Describe what you want in plain language and watch it happen in real time.

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

1. Go to [shakespeare.diy](https://shakespeare.diy) and sign in with a Nostr browser extension (Alby, nos2x, etc.)
2. Import the Ditto repository: `https://gitlab.com/soapbox-pub/ditto.git`
3. Describe what you want — *"add a dark purple theme option"*, *"fix the avatar upload on mobile"*, *"add a new sidebar link for bookmarks"*
4. Shakespeare reads the codebase, understands the structure, and makes the changes
5. See results live, iterate through conversation, and push when you're done

<div class="callout-fun">
  <span class="callout-emoji">✨</span>
  <p>Shakespeare is the fastest path from <em>"I have an idea"</em> to a working change. It's especially good for UI tweaks, theme work, adding components, and exploring the codebase. Choose from <strong>50+ AI models</strong> across OpenRouter, Anthropic, OpenAI, xAI, and local models.</p>
</div>

**Source code:** [gitlab.com/soapbox-pub/shakespeare](https://gitlab.com/soapbox-pub/shakespeare)

</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">🧭</span>

## Which tool should I use?

</div>

<div class="two-cards">
<div class="fun-card">
  <div class="fun-card-emoji">🖥️</div>

### OpenCode

Terminal-based AI agent with full local filesystem access. Best for deep changes, debugging, multi-file refactors, and running the full build pipeline. The power tool.

  <div style="margin-top: 16px;">
    <a href="https://opencode.ai" target="_blank" class="btn btn-primary" style="padding: 12px 28px; font-size: 15px;">
      <span>Get OpenCode &#8599;</span>
    </a>
  </div>

</div>
<div class="fun-card">
  <div class="fun-card-emoji">🎭</div>

### Shakespeare

Browser-based AI builder with zero setup. Best for quick changes, UI tweaks, theme work, and exploring the codebase. Open a tab and start building.

  <div style="margin-top: 16px;">
    <a href="https://shakespeare.diy" target="_blank" class="btn btn-primary" style="padding: 12px 28px; font-size: 15px;">
      <span>Open Shakespeare &#8599;</span>
    </a>
  </div>

</div>
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

<div class="two-cards">
<div class="fun-card">
  <div class="fun-card-emoji">🤖</div>

### [Announcing Sheila](https://soapbox.pub/blog/announcing-sheila/)

How Soapbox built an AI accounting agent entirely with OpenCode.

</div>
<div class="fun-card">
  <div class="fun-card-emoji">🔮</div>

### [Coding Doesn't Die](https://soapbox.pub/blog/coding-doesnt-die/)

Why AI tools like these are the future of development.

</div>
</div>
</div>

<div class="page-divider"></div>

<div class="page-cta">
  <div class="page-cta-emoji">🔥</div>

## The carnival needs you

Ditto isn't trying to be another platform. It's trying to be the most fun place on the internet — and that takes more than one team. Grab a tool, break something, build something better. The golden era won't build itself.

  <div class="page-cta-actions">
    <a href="https://shakespeare.diy" target="_blank" class="btn btn-primary">
      <span>Open Shakespeare &#8599;</span>
    </a>
    <a href="/philosophy" class="btn btn-ghost">Ditto Philosophy</a>
  </div>
</div>
