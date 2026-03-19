---
description: Hack on Ditto with AI-powered tools. Use Shakespeare or OpenCode to build features, fix bugs, and ship changes without wrestling build systems.
---

# Hacking on Ditto

Ditto is open source and designed to be hacked on. Whether you want to add a feature, fix a bug, tweak the UI, or build something entirely new on top of it, these tools make it easy to get started -- even if you've never touched the codebase before.

The two main entryways are **Shakespeare** (browser-based, zero setup) and **OpenCode** (terminal-based, full control). Both use AI to help you understand the code, make changes, and ship results. **MKStack** is the framework that ties it all together -- it's the shared foundation that Ditto and other Nostr apps are built on.

## Shakespeare

[Shakespeare](https://shakespeare.diy) is Soapbox's open source, browser-based AI development environment. It runs entirely in your browser -- no installation, no terminal, no local dev setup required. Just import the Ditto repo and start building.

### How it works

1. Go to [shakespeare.diy](https://shakespeare.diy) and sign in with a Nostr browser extension (Alby, nos2x, etc.)
2. Import the Ditto repository by pasting the GitLab clone URL: `https://gitlab.com/soapbox-pub/ditto.git`
3. Describe what you want to change in natural language -- "add a dark purple theme option", "fix the avatar upload on mobile", "add a new sidebar link for bookmarks"
4. Shakespeare's AI reads the codebase, understands the project structure, and makes the changes
5. See results in the live preview, iterate through conversation, and export or push when you're done

### What makes it useful for Ditto

- **Zero setup.** No Node.js, no `npm install`, no build tooling. Everything runs in the browser via WebAssembly.
- **Built-in Git.** Clone, commit, push, and pull -- all from the browser. Push changes to a GitLab branch and open a merge request without ever touching a terminal.
- **Nostr-native tools.** Shakespeare has 13+ built-in tools for working with Nostr events, NIPs, relay queries, and NIP-19 identifiers. It understands the protocol Ditto is built on.
- **Any AI model.** Choose from 50+ models across OpenRouter, Anthropic, OpenAI, xAI, and local models. No vendor lock-in.
- **Live preview.** See your changes rendered in real time as the AI makes edits.

Shakespeare is the fastest path from "I have an idea" to a working change. It's especially good for UI tweaks, theme work, adding components, and exploring the codebase.

**Source code:** [gitlab.com/soapbox-pub/shakespeare](https://gitlab.com/soapbox-pub/shakespeare)

## OpenCode

[OpenCode](https://opencode.ai) is an open source AI coding agent that runs in your terminal. It's a more powerful option for developers who want full control over their environment -- local file access, shell commands, LSP integration, and multi-session support.

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

From there, describe what you want to do in natural language. OpenCode reads your files, runs commands, makes edits, and verifies the results -- all while you watch and guide it.

### What makes it useful for Ditto

- **Full local environment.** Access to the real filesystem, real build tools, real test runners. Run `npm run dev` in one terminal, OpenCode in another.
- **LSP-enabled.** OpenCode automatically loads language servers for TypeScript, giving the AI better understanding of types, imports, and project structure.
- **Multi-session.** Run multiple agents in parallel on different parts of the codebase.
- **Human-in-the-loop.** You see every change before it lands. This is the pattern Soapbox uses to build its own AI agents -- including [Sheila](https://soapbox.pub/blog/announcing-sheila/), an accounting agent built entirely with OpenCode.
- **Any model.** 75+ providers through Models.dev, including local models, GitHub Copilot, and ChatGPT Plus/Pro.

OpenCode is the right choice when you need to run the full build pipeline, debug runtime issues, work across multiple files, or iterate deeply on complex changes.

**Source code:** [github.com/anomalyco/opencode](https://github.com/anomalyco/opencode)

## MKStack

[MKStack](https://mkstack.xyz) is the framework that Ditto and other Soapbox Nostr apps are built on. It's a batteries-included React + TypeScript + Tailwind starter with deep Nostr integration, and it's what both Shakespeare and OpenCode understand when they work on Ditto.

### What's in the box

- **Nostrify** for relay connections, event queries, and protocol handling
- **React 18** with TypeScript and TanStack Query for data fetching
- **shadcn/ui** component library (48+ components) with TailwindCSS
- **Built-in Nostr features:** authentication (NIP-07), relay management (NIP-65), direct messages (NIP-04/NIP-17), zaps (NIP-57), file uploads via Blossom, and NIP-19 routing
- **AI agent support:** an extensive `AGENTS.md` system prompt and MCP server configs so AI tools understand the full stack

### Using MKStack to build new Nostr apps

If you want to build something new -- not modify Ditto itself, but create your own Nostr app using the same stack -- MKStack is the starting point:

```bash
# Install Stacks CLI
npm install -g @getstacks/stacks

# Create a new project from the MKStack template
stacks mkstack

# Start the AI agent
stacks agent
```

The `stacks agent` command launches **Dork**, an AI assistant that understands the full MKStack framework, all 50+ Nostr NIPs (via [Nostrbook MCP](https://nostrbook.dev)), and the React/TypeScript patterns used across the project. Describe what you want to build and Dork handles the implementation.

When you're ready to ship:

```bash
npm run deploy
```

This builds your app, uploads it to Blossom servers, publishes it to Nostr relays, and makes it live on [NostrDeploy.com](https://nostrdeploy.com).

**Source code:** [gitlab.com/soapbox-pub/mkstack](https://gitlab.com/soapbox-pub/mkstack)

## Which tool should I use?

| | Shakespeare | OpenCode | MKStack + Stacks |
|---|---|---|---|
| **Best for** | Quick changes, UI work, exploring the codebase | Deep changes, debugging, full build pipeline | Building new Nostr apps from scratch |
| **Setup** | None (browser) | Install CLI + clone repo | Install Stacks CLI |
| **AI models** | 50+ via providers | 75+ via Models.dev | Via Stacks `configure` |
| **Environment** | Browser (IndexedDB filesystem) | Local terminal (real filesystem) | Local terminal |
| **Git** | Built-in (browser) | Your local Git | Your local Git |
| **Live preview** | Yes (in-browser) | Run `npm run dev` separately | Run `npm run dev` separately |

**New to Ditto?** Start with Shakespeare. Import the repo, explore, and make your first change in minutes.

**Comfortable with a terminal?** Use OpenCode for the full development experience.

**Building something new?** Use MKStack to scaffold a fresh Nostr app with the same stack Ditto uses.

## Further reading

- [MKStack: Vibe Coding for Everyone](https://soapbox.pub/blog/mkstack-tutorial/) -- step-by-step guide to building Nostr apps with Stacks and MKStack
- [The Shakespeare Origin Story](https://soapbox.pub/blog/shakespeare-origin-story/) -- how Shakespeare evolved from Block's Goose to a browser-based AI builder
- [Announcing Sheila](https://soapbox.pub/blog/announcing-sheila/) -- how Soapbox built an AI agent with OpenCode
- [Coding Doesn't Die. It Evolves.](https://soapbox.pub/blog/coding-doesnt-die/) -- why AI tools like these are the future of development
