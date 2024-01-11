export type YearnData = Root2[]

export interface Root2 {
  address: string
  type: string
  kind: string
  symbol: string
  name: string
  category: string
  version: string
  decimals: number
  chainID: number
  retired: boolean
  boosted: boolean
  token: Token
  tvl: Tvl
  apr: Apr
  strategies: Strategy[]
  staking: Staking
  migration: Migration
  featuringScore: number
}

export interface Token {
  address: string
  name: string
  symbol: string
  description: string
  decimals: number
}

export interface Tvl {
  totalAssets: string
  tvl: number
  price: number
}

export interface Apr {
  type: string
  netAPR: number
  fees: Fees
  points: Points
  extra: Extra
  forwardAPR: ForwardApr
}

export interface Fees {
  performance: number
  management: number
  keepCRV: any
  keepVELO: any
  cvx_keepCRV: any
}

export interface Points {
  weekAgo: number
  monthAgo: number
  inception: number
}

export interface Extra {
  stakingRewardsAPR: number
}

export interface ForwardApr {
  type: string
  netAPR?: number
  composite: Composite
}

export interface Composite {
  boost?: number
  poolAPY?: number
  boostedAPR?: number
  baseAPR?: number
  cvxAPR?: number
  rewardsAPR?: number
  v3OracleCurrentAPR?: number
  v3OracleStratRatioAPR?: number
}

export interface Strategy {
  address: string
  name: string
  details: Details
  description?: string
}

export interface Details {
  totalDebt: string
  totalLoss: string
  totalGain: string
  performanceFee: number
  lastReport: number
  debtRatio?: number
}

export interface Staking {
  address: string
  available: boolean
}

export interface Migration {
  available: boolean
  address: string
  contract: string
}
