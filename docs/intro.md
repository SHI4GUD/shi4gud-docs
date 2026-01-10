---
sidebar_position: 1
sidebar_label: Introduction
slug: /
title: SHI4GUD Docs
description: Explore the SHI4GUD dApp Ecosystem, smart contracts, oracles, nodes and more.
---

# SHI4GUD Technical Documentation

This documentation provides a comprehensive architectural overview of the SHI4GUD platform, offering a deep dive into its on-chain and off-chain components. It is the definitive technical resource for understanding our smart contracts, oracles, node operations, and the underlying mechanics of the ecosystem.

---

## About The Project

**SHI4GUD** is a multichain DeFi platform featuring a Burn Bank mechanism that combines staking with charitable donations and token burning. The core principle is simple: stake your tokens to become part of the ecosystem and/or donate ETH to automatically burn tokens from the staking pool. This process creates deflationary pressure on the staked token while supporting good causes and rewarding a lucky staker from the pool.

The dApp integrates directly with the Charity Burn Mechanism (CBM) technology developed by the [Shina Inu (SHI)](https://shinatoken.com) team. The front-end is built with a modern tech stack including Vite, React, TypeScript, and wagmi for a fast and secure user experience. You can find the source code for the dApp on [GitHub](https://github.com/shi4gud).

### Key Features


-   ✅ **Flexible & Multichain**: The architecture supports staking for any ERC-20 token on any EVM-compatible blockchain.
-   🔥 **Token Burning**: Donations trigger automatic burning of tokens from the staking pool.
-   💖 **Charitable Donations**: A portion of every donation is routed to a registered charity through an [Endaoment Fund](./charity/README.md).
-   🎁 **Random Rewards**: Win a share of donations in a lottery-like drawing just by staking.
-   📈 **On-Chain Price Oracles**: The burn mechanism relies on Uniswap V2/V3 pools directly for real-time, on-chain pricing.
-   ⚖️ **Weighted, Verifiable Rewards**: Stakers are chosen for rewards based on their minimum stake held throughout an entire epoch, with randomness sourced from future block hashes.
-   🤝 **Decentralized Voting**: A network of off-chain nodes executes the reward selection and votes on-chain to achieve consensus.

---

## Technical Documentation Guide

-   **[Official Deployments Addresses](./official-deployments-addresses/README.md)**: A complete list of supported chains, tokens, and official contract addresses.
-   **[Contracts & Oracles](./smart-contracts/ktv2factory-contract.md)**: A function-by-function explanation of the core smart contracts and the oracles that power them.
-   **[Off-Chain Nodes](./node/ktoc.md)**: An explanation of the off-chain node system, including the core vote-and-reward process and guides for operators.
-   **[Charitable Donations](./charity/README.md)**: An explanation of the on-chain donation mechanism and its integration with our official charity partner, Endaoment.
-   **[dApp Technical Overview](./dapp-technical-overview/architecture-and-codebase.md)**: A technical overview of the dApp, its architecture, and guidance on exploring the open-source codebase.
-   **[Telegram Bot](./telegram-bot/README.md)**: A guide to the SHI4GUD Telegram Bot for monitoring Burn Banks and receiving real-time event notifications.

For a general overview of the platform's features (like staking, rewards, and burning), please refer to the [FAQ](https://shi4gud.com/faq) on our main website.

-   🌐 **Main Website**: [shi4gud.com](https://shi4gud.com)
-   ❓ **FAQ**: [shi4gud.com/faq](https://shi4gud.com/faq)
-   🚀 **dApp**: [app.shi4gud.com](https://app.shi4gud.com)

---

## Community & Support

Engagement from the community is vital for the growth and security of the platform.

### Contact

-   **Project on X (Twitter)**: Follow [@SHI4GUD](https://x.com/SHI4GUD) for official announcements.
-   **Developer on X (Twitter)**: Reach out to [@CryptoMonark](https://x.com/CryptoMonark) for technical questions or discussions.
-   **Website**: [shi4gud.com](https://shi4gud.com)

### Support the Project
If you find this project useful and want to support its continued development and the underlying technology, you can make a donation to the following address on the Ethereum network.

**ETH/ERC-20 Donation Address:**
```
0x16078d45dAcAFBBA7F2890C6d8E428657ec9EFFf
```

---

## Acknowledgments

-   The **[Shina Inu (SHI)](https://shinatoken.com)** team for developing the core Charity Burn Mechanism (CBM) technology.
    -   **Website**: [shinatoken.com](https://shinatoken.com)
    -   **X (Twitter)**: [@ShinaToken](https://x.com/ShinaToken)
    -   **Telegram**: [t.me/newShinaTokenPortal](https://t.me/newShinaTokenPortal)
-   All the incredible **open-source libraries** and their contributors that made this project possible.
