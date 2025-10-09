---
sidebar_label: 'TokenPrice Oracle'
---

# TokenPrice (TP) Oracle

To ensure accurate, trustless calculations during the burning process, the `Ktv2` contract needs to know the live market price of its token relative to ETH. This `TokenPrice` oracle contract is a dedicated, on-chain utility that serves this exact purpose. It fetches price data directly from Uniswap liquidity pools.

- **Contract Addresses**: For a list of officially deployed contracts, please see the [Official Deployments Addresses](./../official-deployments-addresses/README.md) page.

## Core Concept: On-Chain Price Feeds

This contract acts as a specialized price feed. Instead of relying on off-chain sources that can be manipulated, it queries the state of a Uniswap liquidity pool directly. This provides a decentralized price based on the pool's current reserves and liquidity state. The contract supports both Uniswap V3 and V2 pools.

## Functions Explained

The contract has two distinct functions to handle the different architectures of Uniswap V2 and V3.

### Choosing between V2 and V3

Consumers select the appropriate function at runtime. In this system, the `Ktv2Factory` passes a boolean `_v2` into the `Ktv2` constructor. The `Ktv2` contract then chooses which oracle function to call when fetching prices:

- If `_v2` is `false`, `Ktv2` calls `price(poolAddr)` (Uniswap V3).
- If `_v2` is `true`, `Ktv2` calls `priceV2(poolAddr)` (Uniswap V2).

### `price(address poolAddr)` - For Uniswap V3

This function calculates the price from a Uniswap V3 pool. V3's architecture is more complex, as it relies on concentrated liquidity and a value called `sqrtPriceX96`.

```solidity
function price(address poolAddr) external view returns (uint256)
```

**Execution Breakdown:**

1.  **Get `slot0`**: The function first calls `pool.slot0()` on the given V3 pool address. This returns several values about the pool's current state, but the most important one is `sqrtPriceX96`.
2.  **`sqrtPriceX96`**: This is the square root of the pool's price, represented as a Q64.96 fixed-point number. This format is highly precise but requires mathematical conversion to be human-readable.
3.  **Squaring the Price**: The contract squares `sqrtPriceX96` to get the raw price ratio, which is now scaled up by `2^192`.
4.  **Scaling for Decimals**: Finally, it uses `FullMath.mulDiv` to perform a safe multiplication and division. It multiplies the raw price ratio by `10^18` (to represent the price in a standard 18-decimal format) and divides by `2^192` to remove the Q64.96 scaling. The result is the price of `token0` in terms of `token1`.

### `priceV2(address pairAddr)` - For Uniswap V2

This function calculates the price from a simpler Uniswap V2 pair.

```solidity
function priceV2(address pairAddr) external view returns (uint256)
```

**Execution Breakdown:**

1.  **Get Reserves**: The function calls `pair.getReserves()` on the V2 pair address. This returns the total amount of `token0` and `token1` held in the liquidity pool (`reserve0` and `reserve1`).
2.  **Calculate Price**: The price in a V2 pool is a straightforward ratio of the reserves. The price of `token0` in terms of `token1` is `reserve1 / reserve0`.
3.  **Scaling for Decimals**: To ensure precision and handle tokens with different decimal counts, the function uses `FullMath.mulDiv` to calculate `(reserve1 * 10^18) / reserve0`. This returns the price scaled to 18 decimals.

## Important Assumptions

-   **18 Decimals**: Both functions assume that the base currency in the pair (e.g., WETH) has 18 decimals. The `10 ** ASSUMED_DECIMALS` term hard-codes this assumption.
-   **Token Order**: The functions calculate the price of `token0` in terms of `token1`. For the oracle to return the price of the project token in ETH, the liquidity pool must be created with the project token as `token0` and WETH (or another 18-decimal base token) as `token1`. 
-   **Reserve Safeguard (V2)**: The V2 function requires `reserve0 > 0` to avoid division by zero.