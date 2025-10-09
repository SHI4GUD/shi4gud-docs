import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'SHI4GUD Docs',
  tagline: 'SHI4GUD Technical Documentation',
  favicon: 'img/shi4gud-favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.shi4gud.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'shi4gud', // Usually your GitHub org/user name.
  projectName: 'shi4gud-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/shi4gud-social-preview.png',
    metadata: [
      {name: 'keywords', content: 'shi4gud, docs, documentation, crypto, blockchain, shi, shina'},
      {name: 'google-site-verification', content: 'RV_q1_VS1XPlVZFqYSwZZxNYRPlrHlmq_7BISb4zUgQ'},
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'SHI4GUD',
        src: 'img/shi4gud-light.svg',
        srcDark: 'img/shi4gud-light.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docSidebar',
          position: 'left',
          label: 'Documentation',
          className: 'header-docs-link',
        },
        {
          href: 'https://shi4gud.com',
          label: 'Main Website',
          position: 'right',
          className: 'header-main-site-link',
        },
        {
          href: 'https://shi4gud.com/faq',
          label: 'FAQ',
          position: 'right',
          className: 'header-faq-link',
        },
        {
          href: 'https://github.com/shi4gud',
          label: 'GitHub',
          position: 'right',
          className: 'header-github-link',
        },
        {
          href: 'https://x.com/SHI4GUD',
          label: 'Twitter',
          position: 'right',
          className: 'header-x-link',
        },
        {
          href: 'https://app.shi4gud.com',
          label: 'Launch App',
          position: 'right',
          className: 'header-launch-app-link',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'SHI4GUD Logo',
        src: 'img/shi4gud-white.svg',
        href: 'https://shi4gud.com',
        width: 160,
        height: 51,
      },
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/',
            },
            {
              label: 'Official Deployments Addresses',
              to: '/official-deployments-addresses',
            },
            {
              label: 'Contracts & Oracles',
              to: '/smart-contracts/ktv2factory-contract',
            },
            {
              label: 'Off-Chain Nodes',
              to: '/node/ktoc',
            },
            {
              label: 'Charitable Donations',
              to: '/charity',
            },
            {
              label: 'dApp Technical Overview',
              to: '/dapp-technical-overview/architecture-and-codebase',
            },
            {
              label: 'Telegram Bot',
              to: '/telegram-bot',
            },
          ],
        },
        {
          title: 'SHI4GUD Links',
          items: [
            {
              label: 'Main Website',
              href: 'https://shi4gud.com',
            },
            {
              label: 'dApp',
              href: 'https://app.shi4gud.com',
            },
            {
              label: 'FAQ',
              href: 'https://shi4gud.com/faq',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/shi4gud',
            },
            {
              label: 'X (Twitter)',
              href: 'https://x.com/SHI4GUD',
            },
          ],
        },
        {
          title: 'Shina Token Links',
          items: [
            {
              label: 'Website',
              href: 'https://shinatoken.com',
            },
            {
              label: 'X (Twitter)',
              href: 'https://x.com/ShinaToken',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/newShinaTokenPortal',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} SHI4GUD. All Rights Reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
