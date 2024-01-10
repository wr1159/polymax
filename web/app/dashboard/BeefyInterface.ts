interface VaultData {
  vaultApr: number
  compoundingsPerYear: number
  beefyPerformanceFee: number
  vaultApy: number
  lpFee: number
  totalApy: number
}

export interface BeefyData {
  [key: string]: VaultData
}
