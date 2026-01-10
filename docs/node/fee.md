# Node Operator Fee Structure

Node operators, also known as "OC Rewarders," are compensated for the gas costs and computational resources required to secure the voting and reward process. This fee is earned for actively participating in the network and is paid out in ETH from the `Ktv2` contract's balance.

## The Fee Mechanism Explained

The fee process is intrinsically linked to the `vote` and `reward` cycle. Here is a step-by-step breakdown of how fees are calculated, recorded, and withdrawn.

### 1. Fee Calculation

Fees are calculated during each node's vote (via the `recordOCFee()` function) and are subtracted from the reward amount *before* the final reward is sent to the winner.

-   **Trigger**: The primary fee calculation happens when a node successfully calls the `Rwd()` function on the smart contract to pay a winner. The contract's internal `recordOCFee()` function is also called during the `vote()` process.
-   **The Formula**: The fee is a percentage of the contract's available balance at the moment of the transaction. The formula is:
    `fee = (Contract's ETH Balance - Total Recorded Fees) * ocFee`
-   **`ocFee`**: This is a percentage value (e.g., 2% is represented as `20` since `P_FCTR` is `10`) that is set by the owner of the `Ktv2` contract.

### 2. Fee Accumulation and Recording

The calculated fee amount is **not** transferred immediately. Instead, the smart contract records it in an internal ledger.

-   The `ocFees` mapping in the contract stores the fee amount earned by each node operator (`msg.sender`) for each specific reward epoch (`startBlock`).
-   This means each time a node operator participates in a successful reward cycle, their earnings for that epoch are added to their internal balance within the contract.

### 3. Fee Withdrawal (Claiming Your Earnings)

To receive their earnings, node operators must actively withdraw them by calling a separate function.

-   **The `withdrawOCFee()` Function**: An operator calls this function on the `Ktv2` contract.
-   **Parameters**: The function requires the operator to provide an array of block numbers corresponding to the `startBlock` of the completed epochs they wish to claim fees from.
-   **Execution**: The contract looks up the fees recorded for the calling address for each specified epoch, sums them up, and transfers the total ETH amount to the node operator's wallet.

This manual withdrawal process is a crucial design feature. It allows operators to accumulate fees over many epochs and withdraw them in a single transaction, saving significantly on gas costs compared to receiving a small payout after every epoch.
