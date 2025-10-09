# Charitable Donations

A core component of the SHI4GUD ecosystem is its transparent and verifiable mechanism for supporting charitable causes. This is not an afterthought; it is built directly into the `Ktv2` smart contract's `give()` function.

## The Donation Mechanism

Whenever a user makes a donation through the SHI4GUD dApp by calling the `give()` function, the contract automatically splits the incoming ETH:

*   **50% for Charitable Causes**: This portion, determined by the `donationPrc` parameter (set to 50%), is immediately sent to a designated charity address (`dest`).
*   **50% for the Rewards Pool**: The remaining portion goes to the Burn Bank Rewards pool, as defined in the `Ktv2` smart contract's logic.

This ensures that every single act of giving has a dual impact: supporting the project's ecosystem and contributing to a charitable cause.

For all officially deployed Burn Banks, the donation destination (`dest` address) is set to the **Gud Fund**. This fund is a Donor-Advised Fund (DAF) managed through [Endaoment](https://endaoment.org/). It allows for donations to be made in their original asset form and grants to be distributed over time. The public address for this fund can be found in the [Official Deployments Addresses](../official-deployments-addresses/README.md) documentation.

## How the Endaoment Integration Works

Endaoment is a U.S.-based 501(c)(3) public charity (EIN: 84-4661797) that has built a decentralized philanthropic protocol on the Ethereum blockchain. It serves as a compliant and audited bridge between the crypto world and legally recognized charities.

Here's how it integrates with the SHI4GUD platform:

1.  **On-Chain Destination**: The `dest` address in the official `Ktv2` contracts is the public Ethereum address of the Gud Fund on Endaoment.
2.  **Transparent Donations**: When the `give()` function is called, the charitable portion of the ETH is sent directly to this on-chain Fund. Every donation is a public, verifiable transaction on the blockchain.
3.  **Fund Management & Grantmaking**: The fund is hosted and fully managed by Endaoment, which handles secure custody, compliance, and conversion from crypto to USD. The assets held are then granted to IRS-compliant public charities.

## Fund Governance and Charity Selection

The Gud Fund is designed to support projects that align with our mission of creating a better world through decentralized technology.

While the Gud Fund is fully managed by Endaoment, governance (including grant recommendations and oversight) is handled by trusted members of the SHI4GUD team.

*   **Grant Recommendations**: Fund managers are responsible for proposing and submitting grant recommendations to eligible nonprofits.
*   **Community Consultation**: The final recipients must be chosen from Endaoment’s approved list of 501(c)(3) organizations. While final decisions are submitted by Fund Managers, the broader SHI4GUD community is consulted through open feedback channels.
*   **Public Transparency**: All grant activity is visible publicly via the [Gud Fund page](https://app.endaoment.org/gud), ensuring full transparency of where charitable donations are directed.

## Key Benefits: Transparency, Security & Compliance

The integration with Endaoment provides several key benefits:

*   **Tax Efficiency**: Because Endaoment is a 501(c)(3), donations of appreciated digital assets (like ETH) can be made directly without the donor first needing to sell them. This allows the donor to potentially avoid capital gains taxes on the asset's appreciation, maximizing the impact of their contribution.
*   **Full Transparency**: Anyone can verify the flow of funds from the SHI4GUD contract directly to the Endaoment Fund's address on a block explorer. Every donation is recorded on-chain, and grants are publicly listed and traceable.
*   **Regulatory Compliance**: By using Endaoment, the project ensures that all charitable donations are handled by a federally tax-exempt entity that meets all legal requirements for philanthropic giving.
*   **Efficiency and Trust**: The process is automated through smart contracts, reducing administrative overhead. Endaoment's platform is built on audited, open-source code; their smart contracts have been audited by firms like OpenZeppelin and LeastAuthority, and their financials are publicly audited. Donor data is securely handled by Endaoment’s nonprofit infrastructure.

This setup removes manual risks and provides peace of mind to both donors and recipients. For more technical details on Endaoment's protocol and to view their audit reports, please refer to their official [documentation](https://docs.endaoment.org/).

## Quick Links

| Purpose                   | Link                                            |
| ------------------------- | ----------------------------------------------- |
| 🏦 Gud Fund | https://app.endaoment.org/gud                 |
| ✅ Browse Eligible Charities | https://app.endaoment.org/orgs                  |
| 🧾 About Endaoment        | https://endaoment.org                           | 