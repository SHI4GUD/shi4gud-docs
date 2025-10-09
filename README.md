<p align="center">
  <a href="https://shi4gud.com" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="static/img/shi4gud-light.svg">
      <source media="(prefers-color-scheme: light)" srcset="static/img/shi4gud-dark.svg">
      <img alt="SHI4GUD Logo" src="static/img/shi4gud-dark.svg" width="250">
    </picture>
  </a>
</p>

<h1 align="center">SHI4GUD Docs — Technical Documentation</h1>

<p align="center">
  <a href="https://docusaurus.io" target="_blank"><img src="https://img.shields.io/badge/Docusaurus-3.x-3FB950?style=flat&logo=docusaurus&logoColor=white" alt="Docusaurus"></a>
  <a href="https://react.dev" target="_blank"><img src="https://img.shields.io/badge/React-19-20232A?style=flat&logo=react&logoColor=61DAFB" alt="React"></a>
  <a href="https://www.typescriptlang.org" target="_blank"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://docs.shi4gud.com" target="_blank"><img src="https://img.shields.io/badge/Live%20Docs-docs.shi4gud.com-000000?style=flat" alt="Live Docs"></a>
</p>

<p align="center">
  The source for the official SHI4GUD technical documentation.
  <br />
  <a href="https://docs.shi4gud.com"><strong>Explore the docs »</strong></a>
</p>

## Table of Contents

1.  [About The Project](#about-the-project)
    - [Built With](#built-with)
    - [Architecture Overview](#architecture-overview)
2.  [Support and Contact](#support-and-contact)
3.  [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Local Development](#local-development)
    - [Build](#build)
    - [Available Scripts](#available-scripts)
4.  [Acknowledgments](#acknowledgments)
5.  [License](#license)

---

## About The Project

This repository powers the public, versioned documentation for the SHI4GUD ecosystem. It covers smart contracts, off-chain nodes, the dApp technical overview, the charitable burn mechanism, official deployment addresses, and operational guides.

### Built With

- **Site generator**: [Docusaurus](https://docusaurus.io/) (v3)
- **Framework**: [React](https://react.dev/) (v19)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (v5)
- **Content**: [MDX](https://mdxjs.com/) (v3), [Prism](https://prismjs.com/) for syntax highlighting

### Architecture Overview

- `docs/`: Source markdown for all sections (contracts, nodes, dApp overview, charity, bot).
- `src/`: Theme overrides and components for the site.
- `static/`: Static assets (images, headers, etc.).
- `docusaurus.config.ts`: Site config (navbar, footer, plugins, metadata).
- `sidebars.ts`: Sidebar and section structure.

---

## Support and Contact

Connect with us:

- **Project on X (Twitter)**: [@SHI4GUD](https://x.com/SHI4GUD)
- **Developer on X (Twitter)**: [@CryptoMonark](https://x.com/CryptoMonark)
- **Website**: [shi4gud.com](https://shi4gud.com)
- **dApp**: [app.shi4gud.com](https://app.shi4gud.com)
- **Docs**: [docs.shi4gud.com](https://docs.shi4gud.com)

---



## Getting Started

### Prerequisites

Before you begin:

- [Node.js](https://nodejs.org/) (version 18.0 or higher)
- [npm](https://www.npmjs.com/) (bundled with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SHI4GUD/shi4gud-docs.git
   ```
2. Navigate to the project directory:
   ```bash
   cd shi4gud-docs
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Local Development

Start the dev server:

```bash
npm start
```

The site will be served at `http://localhost:3000`. Edits hot-reload automatically.

### Build

Create a static production build into `build/`:

```bash
npm run build
```

Optionally preview the production build locally:

```bash
npm run serve
```

### Available Scripts

| Script | Description |
| --- | --- |
| `npm start` | Start local dev server (Docusaurus). |
| `npm run build` | Build static site into `build/`. |
| `npm run serve` | Serve the production build locally. |
| `npm run clear` | Clear cache and generated files. |
| `npm run deploy` | Deploy using Docusaurus preset (if configured). |
| `npm run swizzle` | Eject/override theme components. |
| `npm run write-translations` | Extract translation strings. |
| `npm run write-heading-ids` | Generate stable heading IDs. |
| `npm run typecheck` | TypeScript project type-check. |

---

## Acknowledgments

- The [Shina Inu (SHI)](https://shinatoken.com) team for pioneering the Charity Burn Mechanism (CBM).
- The Docusaurus and broader open-source communities.

## License

This project is licensed under the terms of the license in [`LICENSE`](./LICENSE).
