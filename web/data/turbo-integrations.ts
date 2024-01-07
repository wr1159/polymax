export const integrationCategories = [
  "general",
  "protocols",
  "services",
] as const

interface TurboIntegration {
  name: string
  href: string
  url: string
  description: string
  imgLight: string
  imgDark: string
  category: (typeof integrationCategories)[number]
}

export const turboIntegrations = {
  siwe: {
    name: "SIWE",
    href: "/integration/sign-in-with-ethereum",
    url: "https://login.xyz/",
    description:
      "Sign-In with Ethereum is Web3 authentication using an Ethereum account.",
    category: "general",
    imgLight: "/integrations/siwe.svg",
    imgDark: "/integrations/siwe.svg",
  },
  etherscan: {
    name: "Etherscan",
    href: "/integration/etherscan",
    url: "https://etherscan.io",
    description:
      "Etherscan is the leading block explorer and search, API & analytics platform for Ethereum.",
    category: "general",
    imgLight: "/integrations/etherscan-light.svg",
    imgDark: "/integrations/etherscan-dark.svg",
  },
  openai: {
    name: "OpenAI",
    href: "/integration/openai",
    url: "https://www.openai.com/",
    description:
      "OpenAI offers AI models designed for advanced natural language processing.",
    category: "general",
    imgLight: "/integrations/openai-light.svg",
    imgDark: "/integrations/openai-dark.svg",
  },
  moralis: {
    name: "Moralis",
    href: "/integration/moralis",
    url: "https://docs.moralis.io/",
    description:
      "Moralis provides a complete end-to-end blockchain application development platform.",
    category: "services",
    imgLight: "/integrations/moralis.png",
    imgDark: "/integrations/moralis.png",
  },
  defiLlama: {
    name: "DefiLlama",
    href: "/integration/defi-llama",
    url: "https://defillama.com/docs/api",
    description: "Open and transparent DeFi analytics. ",
    category: "services",
    imgLight: "/integrations/defi-llama.png",
    imgDark: "/integrations/defi-llama.png",
  },
  starter: {
    name: "Starter Template",
    href: "/integration/starter",
    url: "https://docs.turboeth.xyz/overview",
    description:
      "Use this template to get started building integrations with TurboETH.",
    category: "general",
    imgLight: "/logo-gradient.png",
    imgDark: "/logo-gradient.png",
  },
} as const
