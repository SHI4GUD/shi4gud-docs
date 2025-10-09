# Custom Nodes (KTOC)

## Overview

The integrity of the Off-Chain Rewards & Voting system, described in the `Ktv2` contract documentation, is maintained by a network of custom, open-source nodes running the `KTOC` software.

The `KTOC` application interacts with a specific `Ktv2` (Burn Bank) contract instance to facilitate a decentralized voting and reward process. At the end of each reward epoch, nodes perform the following automated tasks:
1.  **Fetch Stakers**: The node gets the list of all addresses that have staked in the contract.
2.  **Select Winner**: It probabilistically selects a winner from the pool of eligible stakers. The selection is weighted by the amount staked, and the randomness is seeded by a future block hash, ensuring a fair and unpredictable outcome.
3.  **Vote**: The node casts a vote for the selected winner on-chain.
4.  **Reward**: If enough nodes vote for the same winner to reach consensus, the node that cast the final vote will trigger the reward payout, sending the accumulated ETH in the contract to the winner.

Node operators earn fees for their participation in securing this process. The node software is written in Go and is designed to be lightweight and run on any standard cloud infrastructure or local machine.

For a detailed explanation of the vote, reward, and winner selection process, please refer to the [Vote & Reward documentation](./vote-and-reward.md).

---

## Getting Started: Running a Node

This guide provides all the necessary steps to set up and run your own `KTOC` node.

- **Node Repository**: [https://github.com/shi4gud/shi4gud-node](https://github.com/shi4gud/shi4gud-node)

### Prerequisites

-   Go (version 1.18 or later) installed and configured.
-   Access to an Ethereum JSON-RPC endpoint (e.g., Infura, Alchemy, or a local `geth` node).

### 1. Configuration (.env file)

Before running the application, you must create a `.env` file in the root directory of the node software. This file stores the necessary configuration variables for the node to operate.

```
MY_PUBLIC_KEY=
MY_PRIVATE_KEY=
DEAD_ADDR=
TARGET_ADDR=
FACTORY_ADDR=
POOL_ADDR=
TKN_ADDR=
TKN_PRC_ADDR=
KT_ADDR=
ETH_ENDPOINT=http://127.0.0.1:8545
KT_START_BLOCK=
```

**Variable Definitions:**

-   `MY_PUBLIC_KEY`: The public Ethereum address of your node's wallet. This address must be registered as an "OC Rewarder" in the `Ktv2` contract.
-   `MY_PRIVATE_KEY`: The private key for `MY_PUBLIC_KEY`.
    -   **SECURITY WARNING**: Never expose this key or commit it to version control. The `.env` file should be listed in your `.gitignore`.
-   `ETH_ENDPOINT`: The full URL of the Ethereum JSON-RPC endpoint your node will connect to.
-   `KT_ADDR`: The address of the specific `Ktv2` contract (Burn Bank) you want your node to service.
-   `KT_START_BLOCK`: The block number when the `Ktv2` contract at `KT_ADDR` was created. You can find this using a block explorer.
-   The other addresses (`DEAD_ADDR`, `TARGET_ADDR`, etc.) are required by the application's libraries but are not actively used in the voting/reward process. They should correspond to the addresses used when the `Ktv2` contract was deployed.

### 2. Building the Application

The repository includes simple build scripts for different operating systems.

#### Windows
```powershell
.\build.ps1
```

#### Linux/macOS
```sh
./build.sh
```
After a successful build, an executable file named `ktoc` (or `ktoc.exe` on Windows) will be created in the root directory.

### 3. Running the Application

You can run the application from your terminal.

-   To see a full list of available commands and flags:
    ```
    ./ktoc -h
    ```
-   To run the node with the configuration from your `.env` file:
    ```
    ./ktoc -run
    ```

---

## Local Testing Environment

For development and testing purposes, you can run a local `geth` development chain. This requires a full sync mode to allow the node to query historical contract data.

Run the following command to start a properly configured local chain:
```
geth --datadir dev-chain --dev --syncmode=full --gcmode=archive --http --http.api admin,web3,eth,net --ws --ws.api admin,web3,eth,net --http.corsdomain "https://remix.ethereum.org"
```
You will need to deploy the `Ktv2Factory` and a `Ktv2` instance on this local chain first to have contracts to interact with. 