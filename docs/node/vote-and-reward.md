# Vote & Reward Process

This section explains the node voting process. 

# The Vote and Reward Process

The core responsibility of a `KTOC` node is to participate in the automated, decentralized process of selecting and rewarding a staker at the end of each reward epoch. This entire procedure, handled by the `VoteAndReward` function in the node's code, is designed to be fair, transparent, and verifiable. It can be broken down into five distinct steps.

### Step 1: Epoch Timing Check

Before taking any action, the node performs a simple timing check:

1.  It gets the current block number from its connected Ethereum endpoint.
2.  It queries the target `Ktv2` contract to read the `startBlock` of the current epoch and the `epochInterval` duration.
3.  The `endBlock` for the epoch is calculated (`startBlock + epochInterval`).
4.  The process only proceeds if the `currentBlock` is greater than the `endBlock`. If it is not yet time to vote, the node simply waits and checks again later.

### Step 2: Minimum Stake Calculation

This is the most critical step for ensuring fairness. The system does **not** simply look at staker balances at the end of the epoch. Instead, it calculates each user's **minimum effective stake** held throughout the entire epoch. This prevents users from staking a large amount just before the epoch ends to unfairly increase their chances.

1.  **Event Filtering**: The node scans the blockchain from the epoch's `startBlock` to its `endBlock`, collecting all `Staked` and `Withdrew` events emitted by the `Ktv2` contract.
2.  **Balance Reconstruction**: It uses these events to reconstruct a historical timeline of each user's staked balance at every point during the epoch.
3.  **Finding the Minimum**: For each user who participated, the node identifies the lowest balance they held at any point between the `startBlock` and `endBlock`. This value becomes their official, weighted stake amount for the reward calculation.
4.  **Total Minimum Stake**: The node sums up the minimum stakes of all eligible users to get a `totalMin` value, which represents the total effective stake participating in the epoch's reward draw.

### Step 3: Probabilistic Winner Selection

The winner is chosen via a weighted, on-chain lottery where the randomness is sourced directly from the blockchain itself, making it unpredictable and tamper-proof.

1.  **Calculating Probabilities**: Each user's probability of winning is a simple ratio: `User's Minimum Stake / Total Minimum Stake`.
2.  **Sourcing Randomness**: The node waits for the *next block* to be mined immediately after the `endBlock`. It then fetches the hash of this future block. This block hash is an unknowable value at the time the epoch ends, making it a secure source of randomness.
3.  **The Drawing**: The block hash is converted into a number between 0 and 1. The node then runs a lottery where each staker's probability range is stacked one after another. The user whose probability "slice" the random number falls into is declared the winner. If no one has staked, the rewards rollover to the next epoch.

### Step 4: Casting the On-Chain Vote

Once a winner is determined, the node makes its decision public and permanent.

1.  It creates and sends a transaction to the `Ktv2` contract, calling the `vote()` function.
2.  This transaction passes two arguments: the address of the selected winner and the block hash that was used for randomness.
3.  This action records the node's official vote in the contract's storage, visible to everyone on the blockchain.

### Step 5: Achieving Consensus and Distributing the Reward

A single vote is not enough to release the funds. A predefined number of votes (`consensusReq`) from different nodes is required.

1.  **Checking Consensus**: After its vote transaction is confirmed, the node immediately queries the `Ktv2` contract to see how many total votes the selected winner has accumulated for the current epoch.
2.  **Triggering the Payout**: If the node's vote was the one that met or exceeded the `consensusReq` threshold, it immediately proceeds to call the `Rwd()` function on the contract.
3.  **The Reward**: The `Rwd()` function sends the **entire accumulated ETH balance** of the `Ktv2` contract to the winner's address. The node that successfully triggers the reward also earns its operational fees as part of this process. If another node's vote reaches consensus and triggers the reward first, the process simply ends for all other nodes for the current epoch. 