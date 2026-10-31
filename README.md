# BB Locator

A small installable web app (PWA) that points you toward Backyard Builder. It reads your device's location and compass heading and shows an arrow toward the destination.

## Features

- Uses the Geolocation and Device Orientation APIs to compute the bearing to the target.
- Installable on Android/Chrome via a web app manifest and service worker.
- No build step or dependencies; plain HTML, CSS and JavaScript.

## Project structure

| Path | Purpose |
| --- | --- |
| `index.html` | App markup, styles and logic |
| `manifest.webmanifest` | PWA manifest |
| `sw.js` | Service worker (network first, offline fallback) |
| `assets/` | Images and arrow graphics |
| `assets/icons/` | Favicon and PWA icons, generated from `favicon.svg` |

## Running locally

Serve the folder with any static server:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

Geolocation, device orientation and service workers require a secure context. `localhost` qualifies; to test on a phone, serve the app over HTTPS (for example through a tunnel).

## Configuration

Destinations are defined in the `locations` array in `index.html` (`lat`, `lon`, image and background colour).

## Updating the service worker

If you add or rename cached files, update the `SHELL` list in `sw.js`. Bump `CACHE` to force clients to refresh their cache.

## Regenerating icons

Edit `assets/icons/favicon.svg`, then re-export the PNGs (192, 512, 180 for Apple touch, 32 for favicon, and a padded 512 maskable icon) with Inkscape/ImageMagick.

## License

[BSD 3-Clause](LICENSE)

## Trademarks

The character logo, Backyard Billy, is a trademark of Backyard Builder. The BSD 3-Clause license covers the source code only and does not grant any rights to use Backyard Billy or other Backyard Builder branding, including the character artwork in `assets/` and the icons derived from it.
