# Cloud Node Setup Guide

## Important Prerequisites

**If you want to run a node for the SHI4GUD network and interact with official Burn Banks, you must ensure that your node address has been approved and added to the allowlist in the KTV2 contract.**. To learn how to apply for node approval, please refer to the [Node Application Process](./application.md) page.

---

## Overview

This guide provides step-by-step instructions for deploying SHI4GUD nodes on cloud infrastructure. While this guide uses **DigitalOcean Droplets** as an example, the same principles apply to other cloud providers such as AWS EC2, Google Cloud Platform, Azure, Linode, or any other VPS provider that supports Ubuntu Linux.

The guide covers:
- Setting up a cloud server (using DigitalOcean as an example)
- Installing required software (Go, Node.js, PM2)
- Configuring and running multiple nodes
- Managing nodes with PM2 process manager

**Prerequisites:**
- A wallet ready on Mainnet with some ETH to cover gas fees
- An Alchemy account with an API key (Pay As You Go tier, $5/month limit should be enough)
- **If running a node for the SHI4GUD network**: Your node address must be approved and added to the KTV2 contract allowlist (see [Node Application Process](./application.md)). This is only required when interacting with official burn banks.

**Resources:**
- GitHub Repository: [https://github.com/SHI4GUD/shi4gud-node](https://github.com/SHI4GUD/shi4gud-node)
- Official Website: [https://shi4gud.com](https://shi4gud.com)

---

## Step 1: Create Your Cloud Server Account

This guide uses DigitalOcean as an example, but you can use any cloud provider that offers Ubuntu-based VPS instances.

### DigitalOcean Setup

1. Go to [DigitalOcean website](https://www.digitalocean.com)
2. Sign up for an account
3. Verify your email and add a payment method

---

## Step 2: Create a Droplet (Your Server)

1. Click the green "Create" button at the top
2. Select "Droplets"
3. Choose these settings:
   - **Region**: Pick one close to you
   - **Image**: Ubuntu 22.04 LTS
   - **Plan**: Basic ($6/month)
   - **Authentication**: Password (simpler for beginners)
   - **Hostname**: Pick a name like "staking-node"
4. Click "Create Droplet"

---

## Step 3: Termius Setup & Connection

### Install Termius

Download Termius from: [https://termius.com/download](https://termius.com/download)

### Add New Host in Termius

1. Open Termius and click "New Host"
2. Enter your droplet details:
   - **Label**: SHI4GUD Node
   - **Address**: Your droplet IP (e.g., 142.93.123.456)
   - **Port**: 22
   - **Username**: root (or your user)
3. Add authentication:
   - Click "Keys" → "New Key"
   - Or use password authentication
4. Click "Save"

### Connect to Your Droplet

1. Double-click your saved host
2. Enter password if prompted
3. You're now connected to your droplet!

### Using Termius Built-in Editor

Termius has a built-in SFTP and file editor:
1. Click the "SFTP" icon in the toolbar
2. Navigate to your files
3. Double-click any file to edit
4. Save with Ctrl+S (Cmd+S on Mac)

**Pro Tip**: Create code snippets in Termius (Settings → Snippets) for frequently used commands like `pm2 list`, `pm2 logs`, etc.

---

## Step 4: Install Required Software

Run the following commands to install all required software:

```bash
apt update && apt upgrade -y
# Updates the package list and upgrades all installed packages

apt install golang-go -y
# Installs the Go programming language runtime and compiler

apt install curl -y
# Installs curl for downloading files from the internet

curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
# Adds the NodeSource repository for Node.js 22.x

apt install nodejs -y
# Installs Node.js and npm

npm install pm2 -g
# Installs PM2 globally (process manager to keep your app running)

sudo reboot
# Reboots the system to ensure that all services and changes are fully applied
```

After the reboot, reconnect to your droplet.

---

## Step 5: Set Up Basic Security

Configure the firewall to allow SSH connections:

```bash
ufw allow OpenSSH
# Allows SSH connections through the firewall

ufw enable
# Enables the firewall (type "y" when prompted)
```

---

## Step 6: Upload Your Application

### Clone from GitHub

```bash
apt install git -y
# Installs Git version control

cd ~
# Navigate to home directory

git clone https://github.com/SHI4GUD/shi4gud-node.git
# Clone the repository

cd shi4gud-node
# Enter project directory

ls -la
# Check directory structure
```

**Repository Location:**
- If logged in as root: `/root/shi4gud-node`
- If using another user: `/home/username/shi4gud-node`

**Expected Directory Structure:**
```
/root/shi4gud-node/
├── src/              # Source code
├── .vscode/          # VS Code settings
├── .gitignore        # Git ignore rules
├── README.md         # Documentation
├── build.ps1         # Windows build script
├── build.sh          # Linux build script
├── go.mod            # Go module file
└── go.sum            # Go dependencies
```

### Build the Application

```bash
chmod +x build.sh
# Make build script executable

./build.sh
# Run build

ls -la ktoc
# Verify binary was created
# Should show: -rwxr-xr-x 1 root root ... ktoc
```

**Build Complete!** The `ktoc` binary is now ready at `/root/shi4gud-node/ktoc`

---

## Step 7: Configuration

### Create Wrapper Script

In Termius, use the built-in editor or create the file via command line:

```bash
cd /root/shi4gud-node
nano run.sh
```

Add this content:

```bash
#!/bin/bash
ENV_FILE=$1
shift # Remove first argument (env file)
set -a
source "$ENV_FILE"
set +a
exec ./ktoc "$@" # Pass all remaining arguments
```

Save and exit nano: `Ctrl+X`, then `Y`, then `Enter`

```bash
chmod +x run.sh
# Make it executable
```

### Create Environment Files

Create first node configuration:

```bash
nano .env.1
```

Add your configuration (Example with SHI):

```env
MY_PUBLIC_KEY=--ADD YOUR WALLET PUBLIC KEY--
MY_PRIVATE_KEY=--ADD YOUR WALLET PRIVATE KEY--
DEAD_ADDR=0x000000000000000000000000000000000000dEaD
TARGET_ADDR=0x287f2611BDbed09037A8fF71C677e0a0309dEa1E
FACTORY_ADDR=0x71B9a8Cdc785Dac637056D371e762CDc0f0d9385
POOL_ADDR=0x959C7D5706AC0B5a29F506a1019Ba7F2a1C70c70
TKN_ADDR=0x243cACb4D5fF6814AD668C3e225246efA886AD5a
TKN_PRC_ADDR=0xf86bFF1a3EC62175dE2c6395214323C566354315
KT_ADDR=0xB1511DfE756342CA14a858B4896983095fEc1B51
QUERY_DELAY=200
ETH_ENDPOINT=https://eth-mainnet.g.alchemy.com/v2/ADD_YOUR_API_KEY
KT_START_BLOCK=24179279
```

Create additional nodes (Example with SHIB):

```bash
nano .env.2
```

```env
MY_PUBLIC_KEY=--ADD YOUR WALLET PUBLIC KEY--
MY_PRIVATE_KEY=--ADD YOUR WALLET PRIVATE KEY--
DEAD_ADDR=0x000000000000000000000000000000000000dEaD
TARGET_ADDR=0x287f2611BDbed09037A8fF71C677e0a0309dEa1E
FACTORY_ADDR=0x71B9a8Cdc785Dac637056D371e762CDc0f0d9385
POOL_ADDR=0x2F62f2B4c5fcd7570a709DeC05D68EA19c82A9ec
TKN_ADDR=0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE
TKN_PRC_ADDR=0xf86bFF1a3EC62175dE2c6395214323C566354315
KT_ADDR=0xE9cAFc8c14C44592aB976F5450D0d40f97668ffc
QUERY_DELAY=200
ETH_ENDPOINT=https://eth-mainnet.g.alchemy.com/v2/ADD_YOUR_API_KEY
KT_START_BLOCK=24179342
```

#### Minimum required fields

For a basic setup where your node is only used for **rewards, querying, and voting** (and not to deploy new burn bank contracts), you only need to make sure the following values are set correctly; the other address fields can stay empty if you do not need to override them explicitly:

```env
MY_PUBLIC_KEY=--ADD YOUR WALLET PUBLIC KEY--
MY_PRIVATE_KEY=--ADD YOUR WALLET PRIVATE KEY--
DEAD_ADDR=
TARGET_ADDR=
FACTORY_ADDR=0x71B9a8Cdc785Dac637056D371e762CDc0f0d9385
POOL_ADDR=
TKN_ADDR=
TKN_PRC_ADDR=
KT_ADDR=--ADD THE BURN BANK CONTRACT ADDRESS--
QUERY_DELAY=200
ETH_ENDPOINT=https://eth-mainnet.g.alchemy.com/v2/ADD_YOUR_API_KEY
KT_START_BLOCK=--ADD THE BURN BANK CONTRACT CREATION BLOCK--
```

The critical values for this use case are your wallet keys, `FACTORY_ADDR`, `KT_ADDR`, `KT_START_BLOCK`, `ETH_ENDPOINT`, and a suitable `QUERY_DELAY`. The other parameters (`DEAD_ADDR`, `TARGET_ADDR`, `POOL_ADDR`, `TKN_ADDR`, `TKN_PRC_ADDR`) are only needed if you plan to **deploy a new burn bank contract from your node**; if you are not deploying a new bank, you can leave them empty. If you are using an Alchemy **Pay As You Go** key, especially when running multiple nodes, consider increasing `QUERY_DELAY` to **500** or even **1000** to reduce the risk of timeouts and rate-limit issues.

### Finding KT_START_BLOCK

`KT_START_BLOCK` must be the **block number at which the bank contract (KT) was deployed**. To get it:

1. Go to [Etherscan](https://etherscan.io) and open the page for your **KT contract** (the address you use for `KT_ADDR` in that env file).
2. Find the **contract creation** transaction — e.g. use the "Internal Transactions" tab and look for the creation transaction.
3. Open that transaction and read its **block number**. Use that block number as `KT_START_BLOCK` in your `.env` file.

Each bank has its own deployment block, so each node (e.g. SHI, SHIB, or another bank) must have the correct `KT_START_BLOCK` for that bank’s KT contract.

### Create PM2 Ecosystem Config

```bash
nano ecosystem.config.js
```

Add this configuration:

```javascript
module.exports = {
  apps: [
    {
      name: 'node-shi',
      script: './run.sh',
      args: '.env.1 -run -chunkSize 500 -waitDuration 5m',
      cwd: '/root/shi4gud-node',
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000
    },
    {
      name: 'node-shib',
      script: './run.sh',
      args: '.env.2 -run -chunkSize 500 -waitDuration 5m',
      cwd: '/root/shi4gud-node',
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000
    }
  ]
};
```

**Tuning `chunkSize` and `waitDuration`:** When you run multiple banks/nodes on the same Alchemy key, using a larger `-chunkSize` (for example `10000`) together with a longer `-waitDuration` (for example `15m`) reduces the number of requests per minute and helps prevent timeouts or rate-limit errors. If you only run a single node (or very few nodes), you can keep smaller values (like `500` and `5m`) for more frequent, smaller batches.

**Final Directory Structure:**
```
/root/shi4gud-node/
├── src/
├── ktoc                  # Built binary
├── run.sh                # Wrapper script
├── .env.1                # Node 1 config
├── .env.2                # Node 2 config
├── ecosystem.config.js   # PM2 config
├── build.sh
├── go.mod
└── README.md
```

---

## Step 8: Start Nodes

### Start All Nodes

```bash
cd /root/shi4gud-node
# Make sure you're in the project directory

pm2 start ecosystem.config.js
# Start all nodes
```

### Save Configuration

```bash
pm2 save
# Save the current PM2 process list
```

### Enable Auto-Start on Boot

```bash
pm2 startup
# Generate startup script
```

**✅ Nodes Started Successfully!** Your SHI4GUD nodes are now running and will auto-start on reboot!

### Verify Nodes are Running

```bash
pm2 list
```

Expected output:
```
┌────┬────────────────────┬─────────┬─────────┬─────────┬──────────┐
│ id │ name               │ mode    │ ↺       │ status  │ cpu      │
├────┼────────────────────┼─────────┼─────────┼─────────┼──────────┤
│ 0  │ node-shi           │ fork    │ 0       │ online  │ 0%       │
│ 1  │ node-shib          │ fork    │ 0       │ online  │ 0%       │
└────┴────────────────────┴─────────┴─────────┴─────────┴──────────┘
```

---

## Step 9: Managing Nodes

### View All Processes

```bash
pm2 list          # List all processes
pm2 status        # Alternative command
```

### View Logs

```bash
pm2 logs                    # All logs (live)
pm2 logs node-shi           # Specific node logs
pm2 logs --lines 100        # Last 100 lines
pm2 logs --err              # Error logs only
pm2 flush                   # Clear all logs
```

### Monitor Resources

```bash
pm2 monit                   # Real-time monitoring dashboard
pm2 show node-shi           # Detailed info for specific node
```

### Restart Nodes

```bash
pm2 restart node-shi        # Restart specific node
pm2 restart all             # Restart all nodes
pm2 reload all              # Zero-downtime restart
```

### Stop/Delete Nodes

```bash
pm2 stop node-shi           # Stop specific node
pm2 stop all                # Stop all nodes
pm2 delete node-shi         # Remove from PM2
pm2 delete all              # Remove all
```

---

## Step 10: Updating the Node

When a new version of the node software is released, use the update script below to pull the latest code, rebuild the binary, and restart your PM2 processes. You only need to set up the script once; after that, run it whenever you want to update.

### One-Time Setup: Create the Update Script

1. Go to your project directory:

```bash
cd /root/shi4gud-node
# Or: cd ~/shi4gud-node if not using root
```

2. Create the update script:

```bash
nano update.sh
```

3. Paste the following script into the editor:

**Tip:** In most terminals (e.g. Termius), use **Ctrl+Shift+V** to paste from your clipboard.

```bash
#!/bin/bash
# Production update script for SHI4GUD node
# Pull latest code, rebuild, restart PM2 instances

set -e  # stop on any error

# Explicit project directory
PROJECT_DIR="/root/shi4gud-node"
cd "$PROJECT_DIR"

echo "🔄 Pulling latest code from GitHub..."
git pull origin master

echo "🛠 Building updated binary..."
chmod +x build.sh
./build.sh

echo "♻️ Restarting PM2 processes..."
pm2 restart all

echo "💾 Saving PM2 process list..."
pm2 save

echo "✅ Update complete!"
```

4. Save and exit nano: **Ctrl+X**, then **Y**, then **Enter**.

5. Make the script executable (stay in `/root/shi4gud-node`):

```bash
chmod +x update.sh
# Makes the update script executable
```

### Running an Update

Whenever you want to update to the latest node version:

```bash
cd /root/shi4gud-node
# Ensure you're in the project directory

./update.sh
# Run the update script
```

The script will pull the latest code, rebuild the binary, restart all PM2 processes, and save the process list. Allow a few minutes for the build and restart to complete.

### What Success Looks Like

When the update completes successfully, you should see output similar to:

- **Build:** `[SUCCESS] Build process completed successfully` and a message that the executable was built at `/root/shi4gud-node/ktoc`
- **PM2 restart:** Confirmations (✓) for each node (e.g. `shi-node`, `shib-node` or `node-shi`, `node-shib` depending on your config)
- **Status table:** Both nodes listed with `status: online` and a short `uptime` (e.g. `0s` right after restart)
- **Save:** `Successfully saved in /root/.pm2/dump.pm2`
- **Done:** `✅ Update complete!`

If your output matches this, the update succeeded.

### After Updating: Check Logs

Always verify that the nodes are running without errors:

```bash
pm2 logs
# View live logs from all nodes (Ctrl+C to exit)

pm2 logs --lines 50
# Or view the last 50 lines
```

If you see no errors and the nodes are processing as expected, the update is complete. For future updates, run `./update.sh` from `/root/shi4gud-node` whenever you want to pull and deploy the latest code.

---

## Voting for Nodes (Add / Remove / Reset)

You can vote to add or remove nodes from the network. Run all commands from your **shi4gud-node** folder (e.g. `/root/shi4gud-node`).

### Vote to add a node

Run this command as-is, including the parentheses. Replace the two placeholders:

```bash
( set -a && source .env.1 && set +a && ./ktoc -voteToAddOC 0x000000000000000000000000000000000000dEaD )
```

1. **Env file:** Use the `.env` file for the **bank you want to vote from** (e.g. `.env.1`, `.env.2` — whichever corresponds to that node in your setup, as in [Step 7: Configuration](#step-7-configuration)).
2. **Address:** Replace `0x000000000000000000000000000000000000dEaD` with the node address you want to vote in.

### Vote to remove a node

Same command, but use **`voteToRemoveOC`** instead of `voteToAddOC`:

```bash
( set -a && source .env.1 && set +a && ./ktoc -voteToRemoveOC 0xADDRESS_TO_VOTE_OUT )
```

Use the env file for the bank you're voting from, and replace `0xADDRESS_TO_VOTE_OUT` with the node address you want to vote out.

### Reset a vote

To reset your vote for a specific address, use **`resetVoteToAddOC`** (to undo an add vote) or **`resetVoteToRemoveOC`** (to undo a remove vote):

- **Reset an “add” vote:** use **`resetVoteToAddOC`** instead of `voteToAddOC`.
- **Reset a “remove” vote:** use **`resetVoteToRemoveOC`** instead of `voteToRemoveOC`.

```bash
( set -a && source .env.1 && set +a && ./ktoc -resetVoteToAddOC 0xADDRESS_TO_RESET )
# Or: -resetVoteToRemoveOC for a remove vote
```

Replace the address and the env file with the ones that apply.

---

## Running Multiple Nodes on the Same Server

You can run more than two nodes on the same server. Each node needs its own `.env` file and one entry in `ecosystem.config.js`. The steps below add a **third** node (for example a PEPE bank); repeat the same pattern for more.

### 1. Create a new environment file

Use a new number for each node (e.g. `.env.3` for a PEPE node):

```bash
cd /root/shi4gud-node
# Or: cd ~/shi4gud-node if not using root

nano .env.3
```

Add the same variables as in [Step 7: Configuration](#step-7-configuration): your wallet keys, the contract addresses and endpoints for **that bank**, and the correct `KT_START_BLOCK` for that token (see [Finding KT_START_BLOCK](#finding-kt_start_block) in Step 7). In practice, if you are only using the node for rewards/queries/voting (and **not** to deploy a new burn bank), you only need to fill out `MY_PUBLIC_KEY`, `MY_PRIVATE_KEY`, `FACTORY_ADDR`, `KT_ADDR`, `QUERY_DELAY`, `ETH_ENDPOINT`, and `KT_START_BLOCK` for the node to work; the other address fields (`DEAD_ADDR`, `TARGET_ADDR`, `POOL_ADDR`, `TKN_ADDR`, `TKN_PRC_ADDR`) are only required if you plan to deploy a new burn bank contract from this node and can otherwise be left empty. Use the same structure as `.env.1` (SHI) or `.env.2` (SHIB), but with the addresses and block number that match the bank you are adding.

For example, for a **PEPE** node (`.env.3`) with only the required parts filled in:

```env
MY_PUBLIC_KEY=--ADD YOUR WALLET PUBLIC KEY--
MY_PRIVATE_KEY=--ADD YOUR WALLET PRIVATE KEY--
DEAD_ADDR=
TARGET_ADDR=
FACTORY_ADDR=0x71B9a8Cdc785Dac637056D371e762CDc0f0d9385
POOL_ADDR=
TKN_ADDR=
TKN_PRC_ADDR=
KT_ADDR=--ADD_PEPE_KT_CONTRACT_ADDRESS--
QUERY_DELAY=500
ETH_ENDPOINT=https://eth-mainnet.g.alchemy.com/v2/ADD_YOUR_API_KEY
KT_START_BLOCK=--ADD_PEPE_KT_START_BLOCK--
```

Earlier in this guide we used `QUERY_DELAY=200` as a simple baseline. When you run **multiple banks on the same Alchemy key**, we recommend increasing `QUERY_DELAY` to **500–1000** (as shown above) to lower the request rate and avoid timeouts or rate-limits. If you already have `.env.1` and `.env.2` with `QUERY_DELAY=200`, consider changing them to **500** or **1000** as well so all nodes share the same, safer rate.

Save and exit: **Ctrl+X**, then **Y**, then **Enter**.

### 2. Add the node to the PM2 config

Edit the ecosystem file:

```bash
nano ecosystem.config.js
```

Add a new object to the `apps` array (same shape as the existing `node-shi` and `node-shib` entries). Use a unique **name** and the new env file in **args** (here we name it `node-pepe` as an example):

```javascript
{
  name: 'node-pepe',
  script: './run.sh',
  args: '.env.3 -run -chunkSize 500 -waitDuration 5m',
  cwd: '/root/shi4gud-node',
  autorestart: true,
  max_restarts: 10,
  restart_delay: 5000
}
```

These values (`chunkSize 500`, `waitDuration 5m`) match the simple defaults shown earlier in the guide. If you are running **multiple banks/nodes** on the same Alchemy key, we recommend switching to the larger values used in the full example below (`chunkSize 10000`, `waitDuration 15m`) to reduce the number of requests per minute and minimize timeouts.

So the full `module.exports` might look like:

```javascript
module.exports = {
  apps: [
    {
      name: 'node-shi',
      script: './run.sh',
      args: '.env.1 -run -chunkSize 10000 -waitDuration 15m',
      cwd: '/root/shi4gud-node',
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000
    },
    {
      name: 'node-shib',
      script: './run.sh',
      args: '.env.2 -run -chunkSize 10000 -waitDuration 15m',
      cwd: '/root/shi4gud-node',
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000
    },
    {
      name: 'node-pepe',
      script: './run.sh',
      args: '.env.3 -run -chunkSize 10000 -waitDuration 15m',
      cwd: '/root/shi4gud-node',
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000
    }
  ]
};
```

Save and exit.

### 3. Hard restart and save

Because you changed the config (new node or updated `args` like `chunkSize` / `waitDuration`), do a **hard restart** so all nodes run with the new settings. From the project directory:

```bash
cd /root/shi4gud-node

pm2 delete all
# Removes all current PM2 processes

pm2 save --force
# Writes the empty process list so the next start is clean

pm2 start ecosystem.config.js
# Starts all apps from the config (e.g. node-shi, node-shib, node-pepe)

pm2 save
# Saves the new process list for reboot / pm2 resurrect
```

Then run `pm2 list` to confirm all nodes (e.g. node-shi, node-shib, node-pepe) are online.

The same management commands apply: `pm2 logs node-pepe`, `pm2 restart node-pepe`, etc. When you run `./update.sh`, it rebuilds the binary and restarts **all** nodes defined in `ecosystem.config.js`, including the new one.

---

## Additional Notes

- **Security**: Always keep your private keys secure. Never commit `.env` files to version control.
- **Monitoring**: Regularly check your node logs to ensure they're running correctly.
- **Updates**: Use the update script described in [Step 10: Updating the Node](#step-10-updating-the-node). After one-time setup, run `./update.sh` from the project directory whenever you want to update.
- **Multiple Nodes**: See [Running Multiple Nodes on the Same Server](#running-multiple-nodes-on-the-same-server) for adding more than two nodes.
