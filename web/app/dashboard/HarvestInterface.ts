export interface HarvestData {
  [key: string]: Tokens
}

export interface Tokens {
  [token: string]: Token
}

export interface Token {
  chain: string
  logoUrl: string[]
  apyIconUrls: string[]
  apyTokenSymbols: string[]
  tokenNames: string[]
  platform: string[]
  tags: string[]
  tokenAddress: string
  decimals: string
  vaultAddress: string
  cmcRewardTokenSymbols: string[]
  id: string
  pricePerFullShare: string
  estimatedApy: string
  estimatedApyBreakdown: number[]
  boostedEstimatedAPY: string
  underlyingBalanceWithInvestment: string
  usdPrice: string
  totalSupply: string
  totalValueLocked: string
  uniswapV3PositionId: any
  uniswapV3UnderlyingTokenPrices: any[]
  uniswapV3ManagedData: any
  inactive: boolean
  rewardPool: string
}
