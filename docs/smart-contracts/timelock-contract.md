---
sidebar_label: 'Timelock Contract'
---

# Ktv2OwnershipTimelock Contract

The `Ktv2OwnershipTimelock` contract provides a secure mechanism for temporarily freezing ownership of a `Ktv2` (Burn Bank) contract. Instead of permanently renouncing ownership, this timelock allows the contract owner to transfer control to the timelock contract for a specified duration, after which ownership can be restored. This provides a balance between decentralization and the ability to make future administrative changes if needed.

-   **Contract Addresses**: For a list of officially deployed contracts, please see the [Official Deployments Addresses](./../official-deployments-addresses/README.md) page.

## Core Concepts

-   **Ownership Freezing**: The timelock contract temporarily holds ownership of a `Ktv2` contract, preventing any administrative changes during the freeze period.
-   **Time-Locked Restoration**: After the freeze period expires, the original owner can restore ownership, regaining administrative control.
-   **Extendable Freeze**: The freeze period can be extended by the original owner, allowing for longer-term commitments to decentralization.
-   **Security Boundaries**: The contract enforces minimum (1 hour) and maximum (365 days) freeze durations to prevent abuse.

## How It Works

Before the timelock process begins, the `Ktv2` contract ownership is first transferred to a multisig wallet for enhanced security and governance. The multisig address can be found in the [Official Deployments Addresses](./../official-deployments-addresses/README.md#official-multisig-wallet) page.

The timelock operates in a multi-step process:

Once ownership has been transferred to the multisig, the following steps are performed:

1.  **Registration**: The multisig registers itself as the "original owner" with the timelock contract.
2.  **Ownership Transfer**: The multisig transfers `Ktv2` ownership to the timelock contract address.
3.  **Freeze Activation**: The registered owner calls `freezeOwnership()` to activate the timelock for a specified duration.
4.  **Restoration**: After the freeze period expires, the original owner can call `restoreOwnership()` to regain control.

## Public Functions Explained

### Registration

-   **`registerOriginalOwner()`**: This function allows the current `Ktv2` owner (the multisig wallet) to register itself with the timelock contract. This must be called before freezing ownership. The function verifies that:
    -   The timelock is not currently frozen
    -   The caller is the current owner of the `Ktv2` contract
    -   Once registered, the address is stored as `registeredOwner`

### Freezing Ownership

-   **`freezeOwnership(uint256 duration)`**: This function activates the timelock mechanism. It requires:
    -   No active freeze is currently in place
    -   The caller is the registered owner
    -   The `Ktv2` contract's ownership has been transferred to the timelock contract
    -   The duration is between `MIN_FREEZE_DURATION` (1 hour) and `MAX_FREEZE_DURATION` (365 days)

    When called, it creates a `Lock` struct containing:
    -   `originalOwner`: The address that initiated the freeze
    -   `unlockTime`: The timestamp when the freeze expires (`block.timestamp + duration`)
    -   `active`: A flag indicating the freeze is active

### Restoring Ownership

-   **`restoreOwnership()`**: After the freeze period expires, the original owner can call this function to restore ownership. The function:
    -   Verifies an active freeze exists
    -   Confirms the caller is the original owner
    -   Checks that the current timestamp has passed the `unlockTime`
    -   Transfers `Ktv2` ownership back to the original owner
    -   Clears the lock state and registered owner

### Extending Freeze Period

-   **`extendFreeze(uint256 additionalDuration)`**: The original owner can extend an active freeze period by calling this function. It:
    -   Requires an active freeze
    -   Verifies the caller is the original owner
    -   Adds the `additionalDuration` to the current `unlockTime`
    -   Ensures the new unlock time doesn't exceed `MAX_FREEZE_DURATION` from the current block timestamp

## View Functions

### Status Checking

-   **`timeUntilRestore()`**: Returns the number of seconds remaining until the freeze expires. Returns `0` if not frozen or already expired.

-   **`canRestore()`**: Returns `true` if the freeze has expired and ownership can be restored.

-   **`getLockStatus()`**: Returns comprehensive information about the current lock state:
    -   `originalOwner`: Address that froze ownership
    -   `unlockTime`: Timestamp when freeze expires
    -   `timeRemaining`: Seconds until unlock
    -   `isFrozen`: Current freeze status
    -   `canRestoreNow`: Whether restoration is available
    -   `currentRegisteredOwner`: Currently registered owner address

## Constants

-   **`MIN_FREEZE_DURATION`**: Set to `3600` seconds (1 hour). This prevents extremely short freezes that could be used to bypass security checks.
-   **`MAX_FREEZE_DURATION`**: Set to `31536000` seconds (365 days). This caps the maximum freeze duration to prevent indefinite locks.

## Security Features

### Reentrancy Protection

The contract inherits from OpenZeppelin's `ReentrancyGuard`, protecting critical functions (`freezeOwnership`, `restoreOwnership`, `extendFreeze`) from reentrancy attacks.

### Immutable Contract Reference

The `ktv2Contract` address is set at deployment and marked as `immutable`, ensuring the timelock can only manage the specific `Ktv2` contract it was designed for.

### Ownership Verification

Multiple checks ensure that only the legitimate owner can interact with the timelock:
-   Registration requires being the current `Ktv2` owner
-   Freezing requires ownership to be transferred to the timelock first
-   Restoration and extension require being the original owner

## Constructor Parameters

```solidity
constructor(address _ktv2Contract)
```

-   **`_ktv2Contract`**: The address of the `Ktv2` contract that this timelock will manage. This address is immutable and cannot be changed after deployment.

## Events

-   **`OwnerRegistered(address indexed owner)`**: Emitted when an owner successfully registers with the timelock.
-   **`OwnershipFrozen(address indexed owner, uint256 unlockTime, uint256 duration)`**: Emitted when ownership is frozen, including the unlock timestamp and duration.
-   **`OwnershipRestored(address indexed owner, uint256 timestamp)`**: Emitted when ownership is successfully restored to the original owner.
-   **`FreezeExtended(address indexed owner, uint256 newUnlockTime, uint256 additionalDuration)`**: Emitted when the freeze period is extended.

## Use Case: Decentralization with Flexibility

The timelock contract enables a middle ground between permanent ownership renunciation and centralized control:

-   **During Freeze**: The `Ktv2` contract's administrative functions are locked, providing the same security guarantees as renounced ownership.
-   **After Freeze**: If needed, the original owner can restore ownership to make future adjustments or upgrades.
-   **Community Trust**: The freeze duration is transparent and verifiable on-chain, allowing the community to see exactly when (or if) ownership can be restored.

This approach is particularly useful for protocols that want to demonstrate commitment to decentralization while retaining the option for future governance improvements or parameter adjustments.

