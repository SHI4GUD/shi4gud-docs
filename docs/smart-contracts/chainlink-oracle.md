---
sidebar_label: 'Chainlink Oracle'
---

# Chainlink Oracle for UI Price Display

This section describes how the project's user interface (UI) uses Chainlink data oracles to provide convenient, real-time price information.

-   **Contract Addresses**: For a list of officially deployed contracts, please see the [Official Deployments Addresses](./../official-deployments-addresses/README.md) page.

## Role in the Ecosystem

To provide users with a familiar and intuitive experience, the application's UI uses **Chainlink Price Feeds**. These industry-standard oracles fetch the current USD value of tokens used within the application, allowing for an informational display of staking balances and donation amounts in a familiar currency (e.g., "$10.50").

This functionality is for **front-end purposes only** and is entirely separate from the core smart contract logic.

## Why Separate Oracles?

The project uses two different types of oracles for two distinct purposes, which is a critical design choice for security and accuracy:

1.  **Chainlink Oracles (for UI)**:
    -   **Purpose**: Displaying USD-denominated values to the user.
    -   **Reason**: Chainlink provides highly reliable, aggregated price data from many off-chain sources, making it the gold standard for general-purpose price information trusted by top DeFi applications.

2.  **Uniswap Oracle (for Contract Logic)**:
    -   **Purpose**: Calculating the on-chain token-to-ETH price for the `give()` function's burn calculation.
    -   **Reason**: For core contract functions that move value on-chain, it is crucial to use a price source that reflects the *actual* on-chain liquidity and execution price. Using the Uniswap pool directly ensures that the burn calculation is based on the same market where a swap would occur, preventing any possible arbitrage or price discrepancies between off-chain and on-chain sources.

## Official Chainlink Resources

To learn more about Chainlink Price Feeds or to find the specific feed for a token, you can use the official resources below:

-   **[Chainlink Price Feeds Documentation](https://docs.chain.link/data-feeds/price-feeds)**: The official developer documentation for integrating and understanding Chainlink Price Feeds.
-   **[Finding Price Feed Addresses](https://docs.chain.link/data-feeds/price-feeds/addresses)**: A comprehensive list of available Price Feeds across various blockchain networks. 