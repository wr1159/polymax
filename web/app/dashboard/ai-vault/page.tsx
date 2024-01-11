"use client"

import { useState } from "react"
import { utils } from "ethers"
import { motion } from "framer-motion"
import { useAccount, useChainId } from "wagmi"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import {
  useDepositWithdrawDeposit,
  useDepositWithdrawGetBalance,
  useDepositWithdrawWithdraw,
} from "@/lib/generated/blockchain"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
  const { write: depositWrite, isLoading: depositIsLoading } =
    useDepositWithdrawDeposit({
      address: address,
      chainId: useChainId(),
      value: utils.parseEther("0.1").toBigInt(),
    })
  const { write: withdrawWrite, isLoading: withdrawIsLoading } =
    useDepositWithdrawWithdraw({
      address: address,
      chainId: useChainId(),
      args: [balance as bigint],
    })
  const [depositValue, setDepositValue] = useState("0.1")
  const [withdrawValue, setWithdrawValue] = useState("0")

  const handleDeposit = () => {
    const depositAmount = utils.parseEther(depositValue).toBigInt()
    depositWrite({ value: depositAmount })
  }
  const handleWithdraw = () => {
    const withdrawAmount = utils.parseEther(withdrawValue).toBigInt()
    withdrawWrite({ args: [withdrawAmount] })
  }

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
          <h3 className="text-2xl font-normal text-primary">
            Deposit and Withdraw into our AI Vault (Current APY:{" "}
            <span className="font-bold">81.3%</span>)
          </h3>
          <h4 className="text-xl font-normal text-primary"></h4>
          {balance !== undefined && (
            <h4 className="text-lg">
              Current balance: {utils.formatEther(balance)}
            </h4>
          )}
          <hr className="my-3 dark:opacity-30" />
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-2">
              <Input
                type="number"
                value={depositValue}
                onChange={(e) => setDepositValue(e.target.value)}
              />
              <ContractWriteButton
                isLoadingTx={depositIsLoading || false}
                isLoadingWrite={false}
                onClick={handleDeposit}
                className="px-6"
              >
                Deposit
              </ContractWriteButton>
            </div>
            <div className="flex gap-x-2">
              <Input
                type="number"
                value={withdrawValue}
                onChange={(e) => setWithdrawValue(e.target.value)}
              />
              <ContractWriteButton
                isLoadingTx={withdrawIsLoading || false}
                isLoadingWrite={false}
                onClick={handleWithdraw}
                className="w-fit"
              >
                Withdraw
              </ContractWriteButton>
            </div>

            <ContractWriteButton
              isLoadingTx={withdrawIsLoading || false}
              isLoadingWrite={false}
              onClick={() => withdrawWrite()}
            >
              Withdraw All
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
