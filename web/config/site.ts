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
    github: string
  }
}

export const SITE_CANONICAL = "https://polymax.vercel.app/"

export const siteConfig: SiteConfig = {
  name: "PolyMax",
  title: "PolyMax - Cross-Chain Yield Aggregation Solution",
  emoji: "🏦",
  description:
    "Unified gateway to optimise yields across different blockchains.",
  localeDefault: "en",
  links: {
    docs: "https://github.com/wr1159/polymax",
    github: "https://github.com/wr1159/polymax",
  },
}

export const DEPLOY_URL = "https://polymax.vercel.app"
