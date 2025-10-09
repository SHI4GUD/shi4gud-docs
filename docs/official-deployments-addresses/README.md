import IconExternalLink from '@theme/Icon/ExternalLink';

# Official Deployments Addresses

The source code for all smart contracts is available in the [shi4gud/shi4gud-contracts](https://github.com/shi4gud/shi4gud-contracts) GitHub repository.

## Official Live Burn Banks

This section lists the officially supported Burn Banks. You can interact with any of them through the [SHI4GUD dApp](https://app.shi4gud.com) interface. A Burn Bank is a deployed instance of the `Ktv2` smart contract. Each Burn Bank is created for a specific ERC-20 token on a specific blockchain. It functions as a self-contained ecosystem where users can stake that token, and anyone can make ETH donations to trigger the burning of the staked tokens.

You can read the full details of the contract's functionality in the [Ktv2 Contract documentation](./../smart-contracts/ktv2-contract.md).

### Ethereum

| Token  | Burn Bank Address                               |
| :----- | :---------------------------------------------- |
| **SHI**    | `0x0B0b9dCac89Cb585fAc7fC7F7A625870Ac8d9693` <a href="https://etherscan.io/address/0x0B0b9dCac89Cb585fAc7fC7F7A625870Ac8d9693" target="_blank" rel="noopener noreferrer" title="Open on Etherscan"><IconExternalLink /></a>   |
| **SHIB**   | `0x3A8c5868B9625B8C82650C6B25cE0E6e55c767B4` <a href="https://etherscan.io/address/0x3A8c5868B9625B8C82650C6B25cE0E6e55c767B4" target="_blank" rel="noopener noreferrer" title="Open on Etherscan"><IconExternalLink /></a>   |

### Sepolia (Testnet)

| Token  | Burn Bank Address      |
| :----- | :--------------------- |
| **TEST** | `0x6A653395F0CA00205427D98BE7A8947D1b8F82E8` <a href="https://sepolia.etherscan.io/address/0x6A653395F0CA00205427D98BE7A8947D1b8F82E8" target="_blank" rel="noopener noreferrer" title="Open on Sepolia Etherscan"><IconExternalLink /></a>   |

## Official Factory Contracts

The `Ktv2Factory` contract is used to deploy all official Burn Bank instances. Using a factory ensures that every Burn Bank is a clone of the same verified, audited, and secure base contract. Below are the addresses of the official factory contracts deployed on each supported network.

You can read the full details of the contract's functionality in the [Ktv2Factory Contract documentation](./../smart-contracts/ktv2factory-contract.md).

| Network           | Factory Contract Address                        |
| :---------------- | :---------------------------------------------- |
| **Ethereum**      | `0xfB348f3975A7BE030a2F672E1eE0265fb5dBF2e2` <a href="https://etherscan.io/address/0xfB348f3975A7BE030a2F672E1eE0265fb5dBF2e2" target="_blank" rel="noopener noreferrer" title="Open on Etherscan"><IconExternalLink /></a> |
| **Sepolia (Testnet)** | `0xC4C00ad9E1cA3876079f1EC60cE679201ff6d694` <a href="https://sepolia.etherscan.io/address/0xC4C00ad9E1cA3876079f1EC60cE679201ff6d694" target="_blank" rel="noopener noreferrer" title="Open on Etherscan (Sepolia)"><IconExternalLink /></a> |
| **Base**          | `0x2E64cd7cff7a80D45d7762Aa439AfBAAD47F98D2` <a href="https://basescan.org/address/0x2E64cd7cff7a80D45d7762Aa439AfBAAD47F98D2" target="_blank" rel="noopener noreferrer" title="Open on BaseScan"><IconExternalLink /></a> |
| **Shibarium**     | `0x0D7C60519D545E93F2e6359b7e7e852FD4c4E5e5` <a href="https://shibariumscan.io/address/0x0D7C60519D545E93F2e6359b7e7e852FD4c4E5e5" target="_blank" rel="noopener noreferrer" title="Open on ShibariumScan"><IconExternalLink /></a> |

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
| **Ethereum**      | `0xf86bFF1a3EC62175dE2c6395214323C566354315` <a href="https://etherscan.io/address/0xf86bFF1a3EC62175dE2c6395214323C566354315" target="_blank" rel="noopener noreferrer" title="Open on Etherscan"><IconExternalLink /></a> |
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

## Official Charity Fund

All donations from the official Burn Banks are sent to a dedicated Fund managed by our partner, Endaoment. You can learn more about the charity integration on the [On-Chain Charitable Donations](./../charity/README.md) page.

| Name                       | Address / Link                         |
| :------------------------- | :------------------------------------- |
| **Gud Fund** | `0x287f2611BDbed09037A8fF71C677e0a0309dEa1E` <a href="https://etherscan.io/address/0x287f2611BDbed09037A8fF71C677e0a0309dEa1E" target="_blank" rel="noopener noreferrer" title="Open on Etherscan"><IconExternalLink /></a>   |
| **View on Endaoment**      | [app.endaoment.org/gud](https://app.endaoment.org/gud) |

---

*This page is a living document and will be updated as new contracts are deployed.*