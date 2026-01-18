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

## Additional Notes

- **Security**: Always keep your private keys secure. Never commit `.env` files to version control.
- **Monitoring**: Regularly check your node logs to ensure they're running correctly.
- **Updates**: When updating the node software, stop the PM2 processes, pull the latest code, rebuild, and restart.
- **Multiple Nodes**: You can run multiple nodes on the same server by creating additional `.env` files and adding entries to `ecosystem.config.js`.
