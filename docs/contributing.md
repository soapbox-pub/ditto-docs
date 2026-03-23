---
outline: [2, 2]
description: "How to contribute to Ditto — from building your own Nostr app to submitting merge requests."
og_image: /og-image-contributing.jpg
---

<div class="page-hero">
  <div class="page-hero-emoji">🤝</div>

# Contributing to Ditto

  <p class="page-hero-sub">Build something real, prove it works, then bring it upstream.<br>Here's the gameplan.</p>
</div>

<div class="page-section">
<div class="big-idea">
<div class="big-idea-emoji">🌍</div>
<div class="big-idea-text">

## Build on Nostr, not just Ditto

Ditto is one client in a much larger ecosystem. The best contributions start as standalone Nostr apps — things that work on their own, prove their value, and *then* get integrated. This page lays out the path from idea to merge request.

If you're looking for tools and setup info, see **[Hacking on Ditto](/hacking)**.

</div>
</div>
</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">🗺️</span>

## Adding new features

</div>

Want to bring a new Nostr kind or feature into Ditto? Great — here's the roadmap. These steps are **prerequisites for consideration**, not suggestions.

### 1. Build a dedicated Nostr app

Before touching Ditto's codebase, build a standalone, open-source app for the user experience you have in mind. This forces you to think through the UX end-to-end and gives you something concrete to show.

<div class="fun-card">
  <div class="fun-card-emoji">🎭</div>

#### Shakespeare

The easiest way to start. Open your browser, describe what you want, and Shakespeare builds it for you. No setup required.

<a href="https://shakespeare.diy" target="_blank" class="card-link-hint">Open Shakespeare &rarr;</a>

</div>

More advanced users can also scaffold a Nostr app with [mkstack](https://gitlab.com/soapbox-pub/mkstack) and build it out with [OpenCode](https://opencode.ai) in the terminal.

### 2. Integrate your kinds into Ditto

Once you have a solid, working app, prompt Shakespeare (or your preferred AI tool) to explore it and incorporate support for your new kinds into Ditto. This is where your standalone work feeds back into the main project.

### 3. Ship it and get feedback

Post your app publicly. Share it on Nostr. Get real people using it. User feedback is the best signal that a feature is worth integrating — both for you and for us.

### 4. Submit a merge request

When your app is working, tested, and has some traction, submit a merge request on [GitLab](https://gitlab.com/soapbox-pub/ditto). Include a link to your app and its source code in the MR description.

<div class="callout-fun">
  <span class="callout-emoji">💡</span>
  <p>Convince yourself first, then convince others. The more love your app gets, the stronger the case to merge it.</p>
</div>

</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">🐛</span>

## Fixing bugs

</div>

Bug fixes are welcome and don't need the full process above. The rule is simple:

**One bug, one merge request.** Keep it tiny. Fix exactly one thing. Don't bundle unrelated changes, don't sneak in refactors, don't "clean up while you're in there." Small, focused MRs get reviewed and merged fast. Large ones sit.

Submit bug fix MRs directly on [GitLab](https://gitlab.com/soapbox-pub/ditto/-/merge_requests).

</div>

<div class="page-divider"></div>

<div class="page-cta">
  <div class="page-cta-emoji">🔧</div>

## Ready to build?

Start with the tools and setup guide, then come back here when you're ready to contribute upstream.

  <div class="page-cta-actions">
    <a href="/hacking" class="btn btn-primary">
      <span>Hacking on Ditto</span>
    </a>
    <a href="https://gitlab.com/soapbox-pub/ditto" target="_blank" class="btn btn-ghost">View on GitLab &#8599;</a>
  </div>
</div>
