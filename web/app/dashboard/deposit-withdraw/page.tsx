"use client"

import { utils } from "ethers"
import { motion } from "framer-motion"
import { useAccount, useChainId, useContractWrite } from "wagmi"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import {
  useDepositWithdrawDeposit,
  useDepositWithdrawGetBalance,
  useDepositWithdrawWithdraw,
} from "@/lib/generated/blockchain"
import { Card } from "@/components/ui/card"
import { ContractWriteButton } from "@/components/blockchain/contract-write-button"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"

export default function PageDashboardAccount() {
  const address = "0x9d092d333a721102a59e9324592c268764ec2558"
  const userAddress = useAccount()?.address as `0x${string}`
  const { data: balance } = useDepositWithdrawGetBalance({
    address: address,
    chainId: useChainId(),
    args: [userAddress],
  })
  const {
    write: depositWrite,
    isLoading: depositIsLoading,
    isIdle: depositIsIdle,
  } = useDepositWithdrawDeposit({
    address: address,
    chainId: useChainId(),
    value: utils.parseEther("0.1").toBigInt(),
  })

  console.log(depositIsLoading)
  const {
    write: withdrawWrite,
    isLoading: withdrawIsLoading,
    isIdle: withdrawIsIdle,
  } = useDepositWithdrawWithdraw({
    address: address,
    chainId: useChainId(),
    args: [balance as bigint],
  })
  console.log(withdrawIsLoading, withdrawIsIdle, withdrawWrite)
  return (
    <motion.div
      animate="show"
      className="flex h-full w-full items-center justify-center py-6 lg:py-8"
      initial="hidden"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      viewport={{ once: true }}
      whileInView="show"
    >
      <IsWalletConnected>
        <Card className="w-full p-6">
          <h3 className="text-2xl font-normal">
            Deposit and Withdraw into our AI Vault
          </h3>
          <hr className="my-3 dark:opacity-30" />
          <div className="flex flex-col gap-y-2">
            <ContractWriteButton
              isLoadingTx={depositIsLoading || false}
              isLoadingWrite={false}
              onClick={() => depositWrite()}
            >
              Deposit 0.1
            </ContractWriteButton>
            <ContractWriteButton
              isLoadingTx={withdrawIsLoading || false}
              isLoadingWrite={false}
              onClick={() => withdrawWrite()}
            >
              Withdraw All (${balance?.toString()} in balance)
            </ContractWriteButton>
          </div>
        </Card>
      </IsWalletConnected>
      <IsWalletDisconnected>
        <h3 className="text-lg font-normal">
          Connect Wallet to view your personalized dashboard.
        </h3>
      </IsWalletDisconnected>
    </motion.div>
  )
}
