---
title: SHI4GUD Telegram Bot
---

# SHI4GUD Telegram Bot

The SHI4GUD Telegram Bot allows anyone to monitor a Burn Bank smart contract directly within their Telegram group. It provides real-time notifications for key events, helping communities stay up-to-date with a project's Burn Bank activity.

The official bot can be found on Telegram at **[@Shi4gudBot](https://t.me/Shi4gudBot)**.

## Getting Started

Anyone can add the SHI4GUD Bot to a Telegram group and start monitoring a Burn Bank.

1.  **Add the Bot to Your Group:**
    -   Open your Telegram group settings.
    -   Click "Add Members" and search for `@Shi4gudBot`.
    -   Add the bot to your group. It's recommended to grant it administrator permissions so it can reliably send messages and handle commands.

2.  **Register a Burn Bank:**
    -   Once the bot is in your group, a group administrator can use the `/registerbank` command to start monitoring a contract.
    -   For example: `/registerbank 0x123...` (replace with a valid Burn Bank contract address).
    -   The bot will validate the address and, if successful, begin sending notifications for that contract to the group.

## Features

- **Real-time Event Notifications:** Receive automated alerts for important contract events such as `Staked`, `Gave`, `Burned`, and `GotReward`.
- **Detailed Contract Status:** Use the `/burnbank` command to get a real-time snapshot of the contract's statistics, including rewards pool, total staked amount, token price, and more.
- **Admin-Only Controls:** Sensitive commands like `/registerbank` and `/unregisterbank` can only be executed by group administrators to prevent unauthorized changes.
- **Spam Prevention:** The `/burnbank` command is rate-limited to ensure the bot remains stable and responsive for all users.

## Available Commands

-   `/start` - Displays a welcome message.
-   `/gudhelp` - Shows the list of available commands and quick-action buttons.
-   `/registerbank <address>` - **(Admin only)** Registers a Burn Bank contract for monitoring. The bot validates that it's a valid contract before adding it.
-   `/unregisterbank` - **(Admin only)** Unregisters the current Burn Bank contract from the chat.
-   `/burnbank` - Shows the status of the currently registered Burn Bank contract, including detailed stats and links to Etherscan. This command is rate-limited to prevent spam. 