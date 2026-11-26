# NFT Subscription Management

A Medium-style reading app where access is paid for with NFTs instead of a monthly subscription. Readers mint daily passes, and opening an article burns one. Built in 2022 with Next.js, Solidity (Hardhat), ethers.js, MetaMask and Firebase.

> **Archived.** It ran on the Rinkeby testnet, which Ethereum has shut down, so there is no live demo. The code was cleaned up in 2026 (see below) and can be redeployed to Sepolia.

## How it works

- A reader connects MetaMask and mints up to **10 passes per day**.
- Opening an article burns **one** of today's passes and unlocks it. Unlocked articles are remembered in Firestore, so a reader never pays twice for the same article.
- Writers publish articles from the `/Writing` page. Articles are stored in Firestore.

## Why ERC-1155

ERC-721 gives every token its own unique ID, like a numbered collectible. ERC-1155 lets one contract hold **many token types, and many identical copies of each type**, which fits a pass much better.

The contract uses **the day number as the token ID** (`block.timestamp / 1 days`). Passes minted on 27 Nov 2026 are token type `20784`, the next day's are `20785`, and so on. That gives two things for free:

- **Passes expire on their own.** The app only checks the balance of today's token ID, so yesterday's passes simply stop counting. No cleanup job, no expiry field.
- **One cheap contract.** All days live in one ERC-1155 contract, instead of one contract or one unique NFT per pass.

## Contract

`contracts/Medium.sol`

| Function | What it does |
|---|---|
| `mint(amount)` | Mints `amount` of today's passes to the caller, up to 10 per day |
| `getTokenBalance(account)` | How many of today's passes `account` holds |
| `useAToken()` | Burns one of the caller's passes for today |

## 2026 cleanup

- **Removed a leaked private key.** The app used to sign transactions with a server wallet loaded from a `NEXT_PUBLIC_` environment variable, which Next.js bundles into the browser code, so the key was public. Transactions are now signed by the reader's own MetaMask wallet, and the app holds no keys at all.
- **Fixed burning other people's passes.** `mint` and `useAToken` used to take an `account` argument with no check, so anyone could burn anyone's passes. Both now act on `msg.sender` only.
- **Fixed the daily limit.** The reset used one global timestamp, so most users' limits never reset after the first day, and the off-by-one allowed 11 mints. Each address now has its own daily counter, capped at 10.
- **Rinkeby to Sepolia** in the Hardhat config, and real tests in place of the Hardhat template.

## Known limitations

This was a learning project, and the paywall is not real security:

- Article text is fetched to the browser and only blurred until unlocked, so it can be read from the page source.
- The browser writes the "unlocked" list to Firestore directly.

Doing it properly means serving article text from an API route that checks the burn on-chain first.

## Run it

```bash
npm ci --legacy-peer-deps
npx hardhat test                     # contract tests, local chain
```

To deploy to Sepolia, set these in `.env` and run `npx hardhat run scripts/deploy.js --network sepolia`:

```bash
SEPOLIA_RPC_URL=          # Infura or Alchemy Sepolia URL
DEPLOYER_PRIVATE_KEY=     # a throwaway wallet with Sepolia test ETH, used only to deploy
ETHERSCAN_API_KEY=        # optional, for contract verification
```

Then set `NEXT_PUBLIC_CONTRACT_ADDRESS` to the deployed address and run `npm run dev`.
