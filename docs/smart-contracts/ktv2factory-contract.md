---
sidebar_label: 'Ktv2Factory Contract'
---

# Ktv2Factory Contract

This is the central contract responsible for deploying new Burn Bank (Ktv2) instances for any ERC-20 token. It ensures that every staking and donation contract is created with the same verified, secure bytecode. The code for the Ktv2 contract is included within the verified Ktv2Factory contract.

- **Contract Addresses**: For a list of officially deployed contracts, please see the [Official Deployments Addresses](./../official-deployments-addresses/README.md) page.

## Core Functions

The `Ktv2Factory` contract is designed for a single, crucial purpose: to deploy new `Ktv2` (Burn Bank) contract instances. It has two primary functions:

-   **`create(...)`**: Deploys a new `Ktv2` contract instance. This is the main purpose of the factory, and it is detailed further below.
-   **`count()`**: This view function returns the total number of `Ktv2` contracts that have been deployed by the factory, serving as a public record of all instances.

## The `create` Function Explained

The `create` function is the heart of the `Ktv2Factory` contract. Its purpose is to deploy a new, independent `Ktv2` (Burn Bank) contract instance and configure it according to the specified parameters.

```solidity
function create(address _burnDest,
                address _token,
                address payable _dest,
                address _pool,
                address _ocPrcAddr,
                address _tp,
                bool _v2) external
```

### Function Execution

1.  **Contract Deployment**: The `new Ktv2(...)` command deploys a brand new `Ktv2` contract to the blockchain. The parameters passed to `create` are forwarded to the `Ktv2` contract's `constructor`, configuring its essential settings upon creation.

2.  **Ownership Transfer**: The factory is the initial owner of the new contract. The function immediately calls `transferOwnership(msg.sender)` on the new contract, giving the user who called `create` full and exclusive administrative control.

3.  **Instance Tracking**: The new contract's address is added to a public array named `created`, providing a transparent on-chain record of all deployed instances.

4.  **Event Emission**: The function emits a `Created` event, broadcasting the new contract's address. This allows UIs and services to efficiently listen for and identify new Burn Bank instances.

### Parameters

Each parameter is an address that defines a core component of the new Burn Bank's configuration:

-   **`_burnDest`**: The address where burned tokens will be sent (typically a "dead" address).
-   **`_token`**: The address of the specific ERC-20 token that will be used for staking and burning.
-   **`_dest`**: The `payable` address that will receive the ETH donations.
-   **`_pool`**: The address of the Uniswap-compatible liquidity pool used by the price oracle.
-   **`_ocPrcAddr`**: The address of the first "OC Rewarder" for the rewards voting and distribution process.
-   **`_tp`**: The address of the deployed `TokenPrice` (TPI) oracle contract.
-   **`_v2`**: If `true`, the deployed instance will use Uniswap V2 pools; if `false`, it will use Uniswap V3. This flag is forwarded to the `Ktv2` constructor and controls which `TokenPrice` oracle function is used (`priceV2` for V2, `price` for V3). You can also toggle this later via `setV2(bool)` in `Ktv2` (owner only).

### Uniswap Version Selection

The `_v2` flag determines how prices are fetched on-chain:

- When `_v2 == false`: the instance expects a Uniswap V3 pool and the oracle call routes to `TokenPrice.price(pool)`.
- When `_v2 == true`: the Burn Bank instance expects a Uniswap V2 pair and the oracle call routes to `TokenPrice.priceV2(pool)`.