import { defineConfig } from "@wagmi/cli"
import { react } from "@wagmi/cli/plugins"
import { abi } from "./data/DepositWithdrawABI"

export default defineConfig({
  out: "lib/generated/blockchain.ts",
  contracts: [
    {
      name: "DepositWithdraw",
      abi: abi,
    },
  ],
  plugins: [react()],
})
