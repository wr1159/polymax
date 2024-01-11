import { useState } from "react"
import { abi } from "@/data/DepositWithdrawABI"
import { Squid } from "@0xsquid/sdk"
import { SquidCallType } from "@0xsquid/squid-types"
import { ethers } from "ethers"
import { parseEther } from "viem"
import { useAccount, useChainId } from "wagmi"

import { useEthersSigner } from "@/lib/hooks/web3/use-ethers-signer"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface DepositButtonProps {
  disabled?: boolean
}
export function DepositToPolygonButton({
  disabled = true,
}: DepositButtonProps) {
  // TODO: Implement button functionality

  const [depositValue, setDepositValue] = useState<string>("0.1")

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

    const contractAddress = "0x9D092d333a721102a59E9324592C268764ec2558"

    const nativeToken = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"

    const depositWithdrawInterface = new ethers.utils.Interface(abi)
    const depositEncodedData =
      depositWithdrawInterface.encodeFunctionData("deposit")

    const params = {
      fromAddress: signerAddress,
      fromChain: fromChainID.toString(),
      fromToken: nativeToken,
      fromAmount: parseEther(depositValue).toString(),
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
      console.log(`Route status: ${status.squidTransactionStatus || "❌"}`)
    }
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={disabled}>Deposit</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              How much would you like to deposit
            </AlertDialogTitle>
            <Input
              value={depositValue}
              onChange={(e) => setDepositValue(e.target.value)}
              type="number"
            />
            <AlertDialogDescription>
              This action cannot be undone once the transaction is submitted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => depositToPolygon()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
