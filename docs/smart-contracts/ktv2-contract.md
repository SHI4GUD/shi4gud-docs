---
sidebar_label: 'Ktv2 Contract'
---

# Ktv2 Contract

This contract, referred to as the "Burn Bank," is the core of the give-to-burn ecosystem. It allows users to stake tokens and facilitates a unique donation mechanism where contributions in ETH lead to the burning of staked tokens, reducing the total supply.

-   **Contract Addresses**: For a list of officially deployed contracts, please see the [Official Deployments Addresses](./../official-deployments-addresses/README.md) page.

## Core Concepts

-   **Staking**: Users deposit the project's specific ERC-20 token into the contract to provide liquidity for the burn mechanism. They can withdraw their tokens at any time.
-   **Donating**: Anyone can send ETH to the contract's `give()` function. A portion of this ETH is sent to the Gud Fund managed by Endaoment. For more info, see the [Charitable Donations section](../charity/README.md).
-   **Burning**: In response to a donation, the contract uses the remaining ETH value to calculate an amount of staked tokens to burn. These tokens are transferred to a dead address, permanently removing them from circulation.

## Public User Functions

### Staking and Withdrawing

-   **`stake(uint256 amt)`**: A user calls this function to deposit (stake) their tokens. The function requires the user to have first approved the contract to spend their tokens. The amount is added to the user's staked balance and the contract's total.
-   **`withdraw(uint amt)`**: A user calls this to retrieve their staked tokens. The function checks that the user's balance is sufficient before transferring the tokens back to them.

### Opting Out of Rewards

The contract includes an off-chain rewards system. Users can choose to opt out of receiving these rewards.

-   **`decline()`**: A user can call this at any time to add their address to a blacklist, making them ineligible to be nominated for rewards.
-   **`allow()`**: A user who has previously declined can call this to remove themselves from the blacklist, becoming eligible for rewards again.

## The `give()` Function Explained

This `payable` function is the central "give-to-burn" mechanism.

```solidity
function give() external payable
```

When a user sends ETH to this function, the following sequence occurs:

1.  **Donation Calculation**: A percentage of the incoming `msg.value` (the amount of ETH sent) is calculated based on the `donationPrc` variable. This portion is set aside for the donation destination.
2.  **Price Oracle Query**: The contract queries the `TokenPrice` oracle using Uniswap V3 or V2 based on the constructor flag `_v2` passed from the factory:
    -   If `_v2` is `false` (Uniswap V3), it calls `tp.price(pool)`.
    -   If `_v2` is `true` (Uniswap V2), it calls `tp.priceV2(pool)`.
3.  **Donation Value in Tokens**: It uses this price to convert the value of the incoming ETH into an equivalent amount of the staked token (`tknAmtGvn`).
4.  **Burn Calculation**: The core logic resides here. The contract calculates the amount of tokens to burn (`burnAmt`) using a tiered formula. This formula compares the donation value (`tknAmtGvn`) against the maximum potential burn (`maxBrn`), which is a percentage of the total tokens staked. The formula is designed to reward larger donations with progressively higher burn rates.
5.  **Execution**:
    -   The calculated `burnAmt` of the token is transferred from the staking pool to the `burnDest` address.
    -   The `giveAmt` of ETH calculated in step 1 is sent to the `dest` address.

### Burn Calculation Formula in Detail

The core of the `give()` function is its tiered mathematical formula for calculating the `burnAmt`. This formula creates a non-linear relationship between the value of an ETH donation and the number of tokens burned, rewarding larger donations with greater efficiency.

Here is a breakdown of the key variables and the step-by-step logic:

**Key Variables:**

-   **`tknAmtGvn`**: This represents the "Donation Power." It's the value of the incoming ETH donation, converted into its equivalent amount in the staked token using the live price from the oracle.
-   **`maxBrn`**: This is the "Maximum Burnable Amount" for a single transaction. It acts as a dynamic cap to protect the staking pool. It's calculated as a percentage (`maxBrnPrc`) of the `totalStk`.
-   **`burnFactor`**: An administrative parameter that acts as a multiplier to scale the burn amount.
-   **`P_FCTR` & `P_DEN`**: These are precision constants (`10` and `1000` respectively) used to handle decimal calculations in Solidity.

**The Four Tiers:**

The contract compares the `tknAmtGvn` (Donation Power) to the `maxBrn` to determine which tier to use. Each subsequent tier provides more "leverage," burning more tokens relative to the donation value.

-   **Tier 1 (Small Donations):**
    If the donation power is small, the burn amount is a direct multiplication of the donation power and the `burnFactor`.
    `burnAmt = (tknAmtGvn * burnFactor) / P_FCTR`

-   **Tier 2 (Medium Donations):**
    As donation power grows, the formula adds a "kicker" of 25% of the `maxBrn` on top of a scaled-down multiplier.
    `burnAmt = ((tknAmtGvn * burnFactor) / (P_FCTR * 2)) + (maxBrn / 4)`

-   **Tier 3 (Large Donations):**
    For even larger donations, the kicker increases to 50% of `maxBrn`.
    `burnAmt = ((tknAmtGvn * burnFactor) / (P_FCTR * 4)) + (maxBrn / 2)`

-   **Tier 4 (Maximum Impact Donations):**
    If the donation power is very large (approaching or exceeding `maxBrn`), the burn amount is simply capped at `maxBrn`. This ensures a single donation cannot burn more than the maximum allowed percentage of the pool.

This tiered system creates a powerful incentive structure, encouraging participants to make more significant donations to achieve the highest token-burning impact.

## Off-Chain Rewards & Voting System

This system is designed to distribute ETH that accumulates in the contract. The process is managed by a set of authorized off-chain services or users called "OC Rewarders" and operates in cycles called "epochs."

-   **`vote(address payable _to, string calldata data)`**: After an epoch is complete (i.e., `block.number` exceeds `startBlock + epochInterval`), an authorized OC Rewarder can cast a vote for an address `_to` to receive a reward. Each rewarder can only vote once per epoch.
-   **`rwd(address payable _to, uint _amt)`**: Once an address has received enough votes to meet the `consensusReq` for the current epoch, any OC Rewarder can trigger the reward payout. This function sends the specified `_amt` of ETH to the winning address and resets the epoch timer by updating `startBlock`.
-   **`resetVote(address _to)`**: An OC Rewarder can use this to retract their vote for an address within the current epoch, in case of an error.
-   **`withdrawOCFee()`**: For participating, OC Rewarders earn a small fee (`ocFee`) from the contract's balance during the voting and reward process. They can call this function to withdraw their accumulated fees from completed epochs.

## Administrative Functions (Owner Only)

The owner of the contract has extensive control over its parameters.

:::note

It is important to note that these administrative functions are only callable if the contract ownership has not been transferred to a timelock contract. The SHI4GUD team's policy is to transfer ownership of all deployed Burn Bank contracts to a multisig wallet first, and then to a `Ktv2OwnershipTimelock` contract once the initial parameters are correctly configured. This ensures that the contract's rules become immutable during the freeze period and cannot be changed until the timelock expires. For more details on this process, see the ["Contract Ownership and Decentralization"](#contract-ownership-and-decentralization) section below.

:::

-   **Staking & Burning Parameters**:
    -   `setDonationPrc(uint16 amt)`: Sets the percentage of incoming ETH to be donated.
    -   `setMaxBurnPrc(uint16 amt)`: Sets the percentage of the total stake that can be burned from a single large donation.
    -   `setBurnFactor(uint16 amt)`: Adjusts the aggressiveness of the burn calculation.
-   **Reward System Parameters**:
    -   `setEpochInterval(uint16 interval)`: Sets the duration (in blocks) of a reward epoch.
    -   `setConsensusReq(uint16 req)`: Sets the number of votes required to approve a reward.
    -   `setOCFee(uint16 fee)`: Sets the fee percentage for OC Rewarders.
-   **Address Management**:
    -   `setDest(address addr)`: Changes the destination address for donations.
    -   `setPool(address _pool)`: Changes the Uniswap pool address used by the price oracle.
    -   `addOCRwdr(address addr)` / `removeOCRwdr(address addr)`: Manages the list of authorized OC Rewarders.
-   **Emergency Function**:
    -   `withdrawTkn(address _to, address addr)`: Allows the owner to withdraw any other ERC-20 token that may have been accidentally sent to the contract address.

## Other Contract Features

### Receiving Direct ETH Transfers

The `Ktv2` contract includes a `receive() external payable {}` function. This is a special fallback function that allows the contract to accept direct ETH transfers that are sent without specifying a function to call (e.g., from another contract or a standard wallet transfer).

Any ETH sent this way is simply added to the contract's total balance. This ETH can then be used to fund the Off-Chain Rewards & Voting system, providing the capital for the `rwd()` payouts. It's a simple but effective mechanism for funding the contract's reward pool.

### Constructor Parameters

Constructor signature:

```solidity
constructor(
    address _burnDest,
    address _token,
    address payable _dest,
    address _pool,
    address _ocPrcAddr,
    address _tp,
    bool _v2
)
```

Parameters:

-   `_burnDest`: Burn destination address.
-   `_token`: ERC-20 token address.
-   `_dest`: Donation recipient (payable).
-   `_pool`: Uniswap pool/pair address used by the price oracle.
-   `_ocPrcAddr`: Initial OC Rewarder address.
-   `_tp`: Deployed `TokenPrice` oracle address.
-   `_v2`: Uniswap version selector (true = V2, false = V3).

## Contract Ownership and Decentralization

### Timelock-Based Ownership Freezing

The `Ktv2` contract inherits from OpenZeppelin's widely-used `Ownable` contract, which grants the creator administrative control over its settings. Rather than permanently renouncing ownership, the SHI4GUD team uses a timelock mechanism to temporarily freeze administrative control while retaining the option for future governance improvements.

#### What is Ownership Timelocking?

Ownership timelocking involves transferring the `Ktv2` contract's ownership to a `Ktv2OwnershipTimelock` contract. The timelock contract holds ownership for a specified duration (between 1 hour and 365 days), during which all administrative functions are locked and cannot be called. After the freeze period expires, the original owner can restore ownership if needed.

Before the timelock process begins, the `Ktv2` contract ownership is first transferred to a multisig wallet for enhanced security and governance. The multisig address can be found in the [Official Deployments Addresses](./../official-deployments-addresses/README.md#official-multisig-wallet) page.

#### The Timelock Process

Once ownership has been transferred to the multisig, the following steps are performed:

1.  **Registration**: The multisig registers with the timelock contract.
2.  **Ownership Transfer**: The multisig transfers `Ktv2` ownership to the timelock contract address.
3.  **Freeze Activation**: The registered owner activates the timelock for a specified duration.
4.  **Restoration**: After the freeze expires, the original owner can restore ownership (or extend the freeze).

#### Security Implications

-   **Temporary Immutability**: During the freeze period, no one—not even the original creator—can call any of the `onlyOwner` functions. All administrative parameters are locked: the donation destination, burn factors, reward system settings, and all other configurable rules become unchangeable for the duration of the freeze.

-   **Transparent Decentralization**: The freeze duration is transparent and verifiable on-chain, allowing the community to see exactly when (or if) ownership can be restored. This provides a verifiable guarantee that the contract cannot be manipulated during the freeze period.

-   **Flexibility for Governance**: Unlike permanent renunciation, timelocking allows for future parameter adjustments or upgrades if needed, while still providing strong security guarantees during the freeze period. The original owner can also extend the freeze period to demonstrate longer-term commitment to decentralization.

-   **Balance of Trust**: This approach balances the need for decentralization with the flexibility to adapt to future needs, making it suitable for protocols that want to demonstrate commitment to immutability while retaining governance options.

For more information about how the timelock contract works, see the [Timelock Contract documentation](./timelock-contract.md). 