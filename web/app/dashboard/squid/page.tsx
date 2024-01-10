"use client"

import { abi } from "@/data/DepositWithdrawABI"
import { Squid } from "@0xsquid/sdk"
import { SquidCallType } from "@0xsquid/squid-types"
import { ethers } from "ethers"
import { parseEther } from "ethers/lib/utils"
import { motion } from "framer-motion"
import { useAccount, useChainId } from "wagmi"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import {
  useDepositWithdrawDeposit,
  useDepositWithdrawGetBalance,
  useDepositWithdrawWithdraw,
} from "@/lib/generated/blockchain"
import { useEthersProvider } from "@/lib/hooks/web3/use-ethers-provider"
import { useEthersSigner } from "@/lib/hooks/web3/use-ethers-signer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"

export default function PageDashboardSquid() {
  const signerAddress = useAccount()?.address as `0x${string}`
  const fromChainID = useChainId()
  const signer = useEthersSigner()
  const depositToPolygon = async () => {
    // instantiate the SDK with config
    const squid = new Squid({
      baseUrl: "https://testnet.v2.api.squidrouter.com",
      integratorId: "polymax-sdk",
    })

    // init the SDK
    await squid.init()
    console.log("Squid inited")
    console.log(squid)

    const contractAddress = "0x9D092d333a721102a59E9324592C268764ec2558"

    const nativeToken = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"

    const depositWithdrawInterface = new ethers.utils.Interface(abi)
    const depositEncodedData =
      depositWithdrawInterface.encodeFunctionData("deposit")

    const params = {
      fromAddress: signerAddress,
      fromChain: fromChainID.toString(),
      fromToken: nativeToken,
      fromAmount: parseEther("0.025").toString(),
      toChain: "80001",
      toToken: nativeToken,
      toAddress: signerAddress,
      slippage: 1,
      slippageConfig: {
        autoMode: 1,
      },
      quoteOnly: false,
      postHooks: [
        {
          callType: SquidCallType.FULL_NATIVE_BALANCE,
          target: contractAddress,
          value: "0",
          callData: depositEncodedData,
          estimatedGas: "50000",
        },
      ],
    }
    // Get the swap route using Squid SDK
    const { route, requestId } = await squid.getRoute(params)
    console.log("Calculated route:", route.estimate.toAmount)
    console.log("signer", signer)

    await new Promise((resolve) => setTimeout(resolve, 5000))
    if (signer != undefined) {
      console.log("work")
      const tx = (await squid.executeRoute({
        signer,
        route,
      })) as unknown as ethers.providers.TransactionResponse
      console.log("tx done", tx)
      const txReceipt = await tx.wait()

      // Show the transaction receipt with Axelarscan link
      const axelarScanLink =
        "https://axelarscan.io/gmp/" + txReceipt.transactionHash
      console.log(`Finished! Check Axelarscan for details: ${axelarScanLink}`)

      // Wait a few seconds before checking the status
      await new Promise((resolve) => setTimeout(resolve, 5000))

      // Retrieve the transaction's route status
      const getStatusParams = {
        transactionId: txReceipt.transactionHash,
        requestId: requestId,
        fromChainId: fromChainID,
        toChainId: "80001",
      }
      const status = await squid.getStatus(getStatusParams)

      // Display the route status
      console.log(`Route status: ${status.squidTransactionStatus}`)
    }
    // Execute the swap and deposit transaction
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
        <Card className="w-[420px] p-6">
          <h3 className="text-2xl font-normal">Squid</h3>
          <hr className="my-3 dark:opacity-30" />
          <Button onClick={() => depositToPolygon()}>Deposit</Button>
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
