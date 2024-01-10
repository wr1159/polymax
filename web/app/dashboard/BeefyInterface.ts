interface VaultData {
  vaultApr: number;
  compoundingsPerYear: number;
  beefyPerformanceFee: number;
  vaultApy: number;
  lpFee: number;
  totalApy: number;
}

interface TokenData {
  [token: string]: VaultData;
}

export interface BeefyData {
  [key: string]: VaultData | TokenData;
}