# ConsultBench Website

Public website for ConsultBench, a benchmark for AI agents performing consulting-style knowledge work across spreadsheets, slides, and memos.

This repository is intended for GitHub Pages. It contains the public website, blog, open calibration metadata, and reference-solution validation rows. It does **not** contain sealed evaluation tasks or private benchmark checks.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

GitHub Pages is the only deployment target for this project.

Build the static export with the GitHub Pages base path:

```bash
npm run build:pages
```

Publish the generated `out/` directory to the `gh-pages` branch:

```bash
npm run deploy:pages
```

GitHub Pages should serve the `gh-pages` branch from `/`.

For a custom domain or organization root site, remove or update the base path before building.
