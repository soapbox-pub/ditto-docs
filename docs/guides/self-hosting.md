# Self-Hosting Ditto

Ditto is a static web application. Once built, it's just HTML, CSS, and JavaScript files that can be served from anywhere. This makes self-hosting straightforward.

## Prerequisites

- **Node.js 22** and **npm 10.9.4** (required for building)
- A web server or static hosting service

## Quick start

```bash
# Clone the repository
git clone https://gitlab.com/soapbox-pub/ditto.git
cd ditto

# Install dependencies
npm install

# Build
npm run build

# The built site is in dist/
```

The `dist/` directory now contains everything you need. Upload it to any web server.

## Deployment options

### GitHub Pages

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to `main`:

1. Fork the Ditto repository
2. Enable GitHub Pages in your repository settings
3. Push to `main`
4. Your instance is live at `https://yourusername.github.io/ditto/`

### GitLab Pages

The repository also includes a `.gitlab-ci.yml` that builds and deploys to GitLab Pages on pushes to the default branch.

### Netlify / Vercel

Just connect your fork and deploy. Ditto includes a `_redirects` file for SPA routing on these platforms.

### VPS / Any web server

```bash
# Build locally
npm run build

# Upload to your server
rsync -avz dist/ user@yourserver:/var/www/ditto/
```

Make sure your web server serves `index.html` for all routes (SPA routing). For Nginx:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/ditto;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Configuration

Create a `ditto.json` file in the project root before building. This file lets you customize your instance:

```json
{
  "theme": "dark",
  "relayMetadata": {
    "relays": [
      { "url": "wss://your-relay.example.com", "read": true, "write": true }
    ],
    "updatedAt": 0
  },
  "blossomServers": [
    "https://your-blossom.example.com/"
  ]
}
```

See the [Configuration guide](/guides/configuration) for all available options.

::: tip
The `ditto.json` file is in `.gitignore` by default, so each deployment can have its own configuration without conflicts.
:::

## Android app

Ditto includes a Capacitor project for building native Android apps:

```bash
# Build the web app first
npm run build

# Sync with Capacitor
npx cap sync

# Open in Android Studio
npx cap open android
```

This lets you distribute Ditto as a branded Android app for your community.

## Custom branding

Beyond themes, you can customize:

- **Logo** -- Replace `public/logo.svg`
- **App name** -- Update in `index.html` and `public/manifest.webmanifest`
- **Default relays** -- Set in `ditto.json`
- **Upload servers** -- Set your own Blossom servers in `ditto.json`
- **OG image** -- Replace the OG image in `public/` for social sharing previews
