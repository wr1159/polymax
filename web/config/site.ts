// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Site
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
interface SiteConfig {
  name: string
  title: string
  emoji: string
  description: string
  localeDefault: string
  links: {
    docs: string
    discord: string
    twitter: string
    github: string
  }
}

export const SITE_CANONICAL = "https://turboeth.xyz"

export const siteConfig: SiteConfig = {
  name: "PolyMax",
  title: "PolyMax - Cross-Chain Yield Aggregation Solution",
  emoji: "⚡",
  description:
    "Unified gateway to optimise yields across different blockchains.",
  localeDefault: "en",
  links: {
    docs: "https://github.com/wr1159/polymax",
    discord: "https://github.com/wr1159/polymax",
    twitter: "https://twitter.com/district_labs",
    github: "https://github.com/wr1159/polymax",
  },
}

export const DEPLOY_URL = "https://polymax.vercel.app"
