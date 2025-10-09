---
sidebar_position: 1
---

# Architecture & Codebase

This guide provides a technical overview of the SHI4GUD dApp for developers and community members interested in understanding its inner workings. As an open-source project, we prioritize transparency. This document walks you through our architecture, technology stack, and codebase, so you can see for yourself how everything works.

## Architecture Overview

The SHI4GUD dApp is a modern web application built on a robust and transparent stack. The source code is available in the [shi4gud/shi4gud-dapp](https://github.com/shi4gud/shi4gud-dapp) GitHub repository. Here's a high-level look at its components:

*   **Frontend:** The user interface is built with [React](https://react.dev/) and powered by [Vite](https://vitejs.dev/) for a fast, modern development experience.
*   **Blockchain Interaction:** We use [wagmi](https://wagmi.sh/) and [viem](https://viem.sh/) to handle blockchain interactions. Wallet connections are managed by [RainbowKit](https://www.rainbowkit.com/).
*   **Smart Contracts:** The application's core logic is decentralized in a suite of smart contracts. You can find detailed documentation for each contract in the ["Contract & Oracles"](./../smart-contracts/ktv2factory-contract.md) section of these docs.

## Exploring the Codebase

For those who want to dive deeper into the code, you can start by cloning the repository:

```bash
git clone https://github.com/shi4gud/shi4gud-dapp.git
cd shi4gud
```

## Built With

This project leverages the power of modern web and blockchain development tools.

*   **Frontend Framework**: [Vite](https://vitejs.dev/) (v6+), [React](https://react.dev/) (v19+)
*   **Language**: [TypeScript](https://www.typescriptlang.org/) (v5.8+)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4+)
*   **Web3 Integration**: [wagmi](https://wagmi.sh/) (v2.14+), [RainbowKit](https://www.rainbowkit.com/) (v2.2+), [viem](https://viem.sh/) (v2.27+)
*   **State Management**: [TanStack React Query](https://tanstack.com/query/latest) (v5.75+)
*   **Routing**: [React Router DOM](https://reactrouter.com/) (v7.6+)
*   **UI Components**: [Lucide React](https://lucide.dev/) (v0.508+), [React Select](https://react-select.com/) (v5.10+)
*   **Development Tools**: [ESLint](https://eslint.org/) (v9+), [Prettier](https://prettier.io/)

---

## Running the dApp Locally (For Contributors)

This section is for developers who wish to run a local instance of the application for development or testing purposes.

### Prerequisites

*   **Node.js**: Version 20.x or newer is recommended. Download from [nodejs.org](https://nodejs.org/).
*   **API Keys & Project ID**:
    *   **WalletConnect Project ID:** Get a Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/) to enable wallet connections.
    *   **Alchemy API Key:** An Alchemy API key is required for reliable RPC communication. Get one from [Alchemy's website](https://www.alchemy.com/).
    *   **Infura API Key (Optional):** An Infura API key can be used as a fallback RPC for Alchemy. Get one from [Infura's website](https://www.infura.io/).

### Installation

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone https://github.com/shi4gud/shi4gud-dapp.git
    cd shi4gud
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    *   Create a `.env` file in the project root.
    *   **Important:** Ensure `.env` is listed in your `.gitignore` file to protect your keys.
    *   Add the following variables to your `.env` file, replacing the placeholder text with your actual credentials.

    ```dotenv
    # WalletConnect Project ID (Required for wallet connections)
    VITE_WALLETCONNECT_PROJECT_ID="your_walletconnect_project_id_here"

    # RPC Provider API Key (Required for fetching blockchain data)
    VITE_ALCHEMY_ID="your_alchemy_id_here"

    # Optional RPC Provider as fallback for Alchemy
    VITE_INFURA_ID="your_infura_id_here"

    # Application URL
    VITE_APP_URL="http://localhost:5173"

    # Optional: URL to a separate main website. If set, the header logo will link here.
    VITE_WEBSITE_URL="https://shi4gud.com"
    ```

### Usage

Run the development server with the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

<br/>

**Available Scripts**

| Script            | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Starts the development server.                       |
| `npm run build`   | Builds the app for production.                       |
| `npm run preview` | Previews the production build locally.               |
| `npm run lint`    | Lints the codebase using ESLint.                     |
| `npm run lint:fix`| Lints and automatically fixes issues.                |
| `npm run format`  | Formats code using Prettier.                         |
| `npm run typecheck`| Performs a static type check using TypeScript.     |
