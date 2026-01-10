import IconExternalLink from '@theme/Icon/ExternalLink';

# Official Deployments Addresses

The source code for all smart contracts is available in the [shi4gud/shi4gud-contracts](https://github.com/shi4gud/shi4gud-contracts) GitHub repository.

## Official Live Burn Banks

This section lists the officially supported Burn Banks. You can interact with any of them through the [SHI4GUD dApp](https://app.shi4gud.com) interface. A Burn Bank is a deployed instance of the `Ktv2` smart contract. Each Burn Bank is created for a specific ERC-20 token on a specific blockchain. It functions as a self-contained ecosystem where users can stake that token, and anyone can make ETH donations to trigger the burning of the staked tokens.

You can read the full details of the contract's functionality in the [Ktv2 Contract documentation](./../smart-contracts/ktv2-contract.md).

### Ethereum

| Token  | Burn Bank Address                               |
| :----- | :---------------------------------------------- |
| **SHI**    | `0xB1511DfE756342CA14a858B4896983095fEc1B51` (`shi.shi4gud.eth`) <a href="https://etherscan.io/address/0xB1511DfE756342CA14a858B4896983095fEc1B51" target="_blank" rel="noopener noreferrer" title="Open on Etherscan"><IconExternalLink /></a>   |
| **SHIB**   | `0xE9cAFc8c14C44592aB976F5450D0d40f97668ffc` (`shib.shi4gud.eth`) <a href="https://etherscan.io/address/0xE9cAFc8c14C44592aB976F5450D0d40f97668ffc" target="_blank" rel="noopener noreferrer" title="Open on Etherscan"><IconExternalLink /></a>   |

### Sepolia (Testnet)

| Token  | Burn Bank Address      |
| :----- | :--------------------- |
| **TEST** | `0x4a889E3B1feebeABDe205097a87bF9f6FBe51D1B` <a href="https://sepolia.etherscan.io/address/0x4a889E3B1feebeABDe205097a87bF9f6FBe51D1B" target="_blank" rel="noopener noreferrer" title="Open on Sepolia Etherscan"><IconExternalLink /></a>   |

## Official Factory Contracts

The `Ktv2Factory` contract is used to deploy all official Burn Bank instances. Using a factory ensures that every Burn Bank is a clone of the same verified, audited, and secure base contract. Below are the addresses of the official factory contracts deployed on each supported network.

You can read the full details of the contract's functionality in the [Ktv2Factory Contract documentation](./../smart-contracts/ktv2factory-contract.md).

| Network           | Factory Contract Address                        |
| :---------------- | :---------------------------------------------- |
| **Ethereum**      | `0x71B9a8Cdc785Dac637056D371e762CDc0f0d9385` (`shi4gud.eth`) <a href="https://etherscan.io/address/0x71B9a8Cdc785Dac637056D371e762CDc0f0d9385" target="_blank" rel="noopener noreferrer" title="Open on Etherscan"><IconExternalLink /></a> |
| **Sepolia (Testnet)** | `0x8cCaaA26014285dAF6cDeF0e6a51C15198E5936c` <a href="https://sepolia.etherscan.io/address/0x8cCaaA26014285dAF6cDeF0e6a51C15198E5936c" target="_blank" rel="noopener noreferrer" title="Open on Etherscan (Sepolia)"><IconExternalLink /></a> |
| **Base**          | Coming Soon |
| **Shibarium**     | Coming Soon |

## Official Burn Bank Nodes

This section lists the authorized off-chain nodes that participate in the decentralized voting process. These nodes are responsible for executing the reward selection mechanism and submitting their votes on-chain to reach a consensus. You can learn more about how nodes operate in the [KTOC documentation](../node/ktoc.md).

### Ethereum

#### SHI

| Node Address        | Operator             | Status |
| :------------------ | :------------------- | :----- |
| `0xF25d4199ed3ca881BfaF3A0801c4028cFc47359e` <a href="https://etherscan.io/address/0xF25d4199ed3ca881BfaF3A0801c4028cFc47359e" target="_blank" rel="noopener noreferrer" title="Open on Etherscan"><IconExternalLink /></a> | `SHI4GUD Foundation` | Active |

#### SHIB

| Node Address        | Operator             | Status |
| :------------------ | :------------------- | :----- |
| `0xF25d4199ed3ca881BfaF3A0801c4028cFc47359e` <a href="https://etherscan.io/address/0xF25d4199ed3ca881BfaF3A0801c4028cFc47359e" target="_blank" rel="noopener noreferrer" title="Open on Etherscan"><IconExternalLink /></a> | `SHI4GUD Foundation` | Active |

### Sepolia (Testnet)

#### TEST

| Node Address        | Operator             | Status |
| :------------------ | :------------------- | :----- |
| `0xF25d4199ed3ca881BfaF3A0801c4028cFc47359e` <a href="https://sepolia.etherscan.io/address/0xF25d4199ed3ca881BfaF3A0801c4028cFc47359e" target="_blank" rel="noopener noreferrer" title="Open on Sepolia Etherscan"><IconExternalLink /></a> | `SHI4GUD Foundation` | Active |
| `0x228b0D2887B3637f6bc1DCe0084134d5260d7822` <a href="https://sepolia.etherscan.io/address/0x228b0D2887B3637f6bc1DCe0084134d5260d7822" target="_blank" rel="noopener noreferrer" title="Open on Sepolia Etherscan"><IconExternalLink /></a> | `Shina Inu Team` | Active |

## Official TokenPrice Contracts

The `TokenPrice` contract is a dedicated oracle that provides on-chain price data to the `Ktv2` contracts. Below are the addresses of the official `TokenPrice` contracts deployed on each supported network.

You can read the full details of the contract's functionality in the [TokenPrice Contract documentation](./../smart-contracts/tokenprice-contract.md).

| Network           | TokenPrice Contract Address                     |
| :---------------- | :---------------------------------------------- |
| **Ethereum**      | `0xf86bFF1a3EC62175dE2c6395214323C566354315` (`oracle.shi4gud.eth`) <a href="https://etherscan.io/address/0xf86bFF1a3EC62175dE2c6395214323C566354315" target="_blank" rel="noopener noreferrer" title="Open on Etherscan"><IconExternalLink /></a> |
| **Sepolia (Testnet)** | `0x869A7e03766341E5E55754647100f518068c8500` <a href="https://sepolia.etherscan.io/address/0x869A7e03766341E5E55754647100f518068c8500" target="_blank" rel="noopener noreferrer" title="Open on Sepolia Etherscan"><IconExternalLink /></a> |
| **Base**          | `0x0D7C60519D545E93F2e6359b7e7e852FD4c4E5e5` <a href="https://basescan.org/address/0x0D7C60519D545E93F2e6359b7e7e852FD4c4E5e5" target="_blank" rel="noopener noreferrer" title="Open on BaseScan"><IconExternalLink /></a> |
| **Shibarium**     | `0xCD5d2cde7fEddBFcAbdBeDbcc0342B060493fc1C` <a href="https://shibariumscan.io/address/0xCD5d2cde7fEddBFcAbdBeDbcc0342B060493fc1C" target="_blank" rel="noopener noreferrer" title="Open on ShibariumScan"><IconExternalLink /></a> |

## Chainlink Contracts

Chainlink is used to provide reliable, decentralized price data to the smart contracts. You can learn more about how the system uses Chainlink in the [Chainlink Oracle documentation](./../smart-contracts/chainlink-oracle.md).

Below is a list of the official ETH/USD price feed contracts used in the ecosystem.

| Network           | ETH/USD Price Feed Address                      |
| :---------------- | :---------------------------------------------- |
| **Ethereum**      | `0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419` <a href="https://etherscan.io/address/0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419" target="_blank" rel="noopener noreferrer" title="Open on Etherscan"><IconExternalLink /></a>   |
| **Sepolia (Testnet)** | `0x694AA1769357215DE4FAC081bf1f309aDC325306` <a href="https://sepolia.etherscan.io/address/0x694AA1769357215DE4FAC081bf1f309aDC325306" target="_blank" rel="noopener noreferrer" title="Open on Sepolia Etherscan"><IconExternalLink /></a>   |
| **Base**          | `0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70` <a href="https://basescan.org/address/0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70" target="_blank" rel="noopener noreferrer" title="Open on BaseScan"><IconExternalLink /></a>   |

## Official Timelock Contracts

The `Ktv2OwnershipTimelock` contract provides a secure mechanism for temporarily freezing ownership of `Ktv2` (Burn Bank) contracts. This allows for decentralization while retaining the option for future administrative changes. Below are the addresses of the official timelock contracts deployed on each supported network.

You can read the full details of the contract's functionality in the [Timelock Contract documentation](./../smart-contracts/timelock-contract.md).

### Ethereum

| Token  | Timelock Contract Address                       |
| :----- | :---------------------------------------------- |
| **SHI**    | `0x39E0Df70F9fbC2b7902f967Fd4bFb036476E9f14` (`timelockshi.shi4gud.eth`) <a href="https://etherscan.io/address/0x39E0Df70F9fbC2b7902f967Fd4bFb036476E9f14" target="_blank" rel="noopener noreferrer" title="Open on Etherscan"><IconExternalLink /></a>   |
| **SHIB**   | `0xBc7277e8fa7eD2108f3fd05316533E70b866c9Cf` (`timelockshib.shi4gud.eth`) <a href="https://etherscan.io/address/0xBc7277e8fa7eD2108f3fd05316533E70b866c9Cf" target="_blank" rel="noopener noreferrer" title="Open on Etherscan"><IconExternalLink /></a>   |

## Official Multisig Wallet

The SHI4GUD team uses a multisig wallet as an intermediate step in the ownership transfer process before freezing contracts with the timelock. This provides enhanced security and governance through multi-signature approval requirements.

### Ethereum

| Multisig Address                       |
| :------------------------------------- |
| `0x6010a7042Aff201d89E407C14417c64DfF2f443F` (`BurnBankHQ.eth`) <a href="https://etherscan.io/address/0x6010a7042Aff201d89E407C14417c64DfF2f443F" target="_blank" rel="noopener noreferrer" title="Open on Etherscan"><IconExternalLink /></a>   |

## Official Charity Fund

All donations from the official Burn Banks are sent to a dedicated Fund managed by our partner, Endaoment. You can learn more about the charity integration on the [On-Chain Charitable Donations](./../charity/README.md) page.

| Name                       | Address / Link                         |
| :------------------------- | :------------------------------------- |
| **Gud Fund** | `0x287f2611BDbed09037A8fF71C677e0a0309dEa1E` <a href="https://etherscan.io/address/0x287f2611BDbed09037A8fF71C677e0a0309dEa1E" target="_blank" rel="noopener noreferrer" title="Open on Etherscan"><IconExternalLink /></a>   |
| **View on Endaoment**      | [app.endaoment.org/gud](https://app.endaoment.org/gud) |

---

*This page is a living document and will be updated as new contracts are deployed.*