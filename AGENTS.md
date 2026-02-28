# Agents

## Git

Always commit after making changes. Do not wait for the user to ask.

## Development

This is a VitePress site. The dev server (`npm run dev`) clears the Vite cache on startup, but if the user already has a dev server running, it may serve stale compiled components after you edit files. HMR does not always pick up changes made by external editors.

**After modifying `.vue` components**, always restart the user's dev server:

1. Kill the existing dev server process: `kill $(lsof -t -i :<PORT> -s TCP:LISTEN)`
2. Clear the cache: `rm -rf .vitepress/cache`
3. Restart: `npx vitepress dev --port <PORT> &>/dev/null &`

Verify the new code is being served before telling the user to test:
```
curl -s "http://localhost:<PORT>/@fs/$(pwd)/.vitepress/theme/components/<Component>.vue" | grep "<something unique to your change>"
```
