import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from "wagmi"
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from "wagmi/actions"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DepositWithdraw
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const depositWithdrawABI = [
  { stateMutability: "payable", type: "constructor", inputs: [] },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "user",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "when",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Deposit",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "user",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      { name: "_to", internalType: "address", type: "address", indexed: false },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "when",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "user",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "when",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Withdrawal",
  },
  { stateMutability: "payable", type: "fallback" },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "balances",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [],
    name: "deposit",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "toCheck", internalType: "address", type: "address" }],
    name: "getBalance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address payable", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "_to", internalType: "address payable", type: "address" },
      { name: "_amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "_amount", internalType: "uint256", type: "uint256" }],
    name: "withdraw",
    outputs: [],
  },
  { stateMutability: "payable", type: "receive" },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link depositWithdrawABI}__.
 */
export function useDepositWithdrawRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof depositWithdrawABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<
      typeof depositWithdrawABI,
      TFunctionName,
      TSelectData
    >,
    "abi"
  > = {} as any
) {
  return useContractRead({
    abi: depositWithdrawABI,
    ...config,
  } as UseContractReadConfig<
    typeof depositWithdrawABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link depositWithdrawABI}__ and `functionName` set to `"balances"`.
 */
export function useDepositWithdrawBalances<
  TFunctionName extends "balances",
  TSelectData = ReadContractResult<typeof depositWithdrawABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<
      typeof depositWithdrawABI,
      TFunctionName,
      TSelectData
    >,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: depositWithdrawABI,
    functionName: "balances",
    ...config,
  } as UseContractReadConfig<
    typeof depositWithdrawABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link depositWithdrawABI}__ and `functionName` set to `"getBalance"`.
 */
export function useDepositWithdrawGetBalance<
  TFunctionName extends "getBalance",
  TSelectData = ReadContractResult<typeof depositWithdrawABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<
      typeof depositWithdrawABI,
      TFunctionName,
      TSelectData
    >,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: depositWithdrawABI,
    functionName: "getBalance",
    ...config,
  } as UseContractReadConfig<
    typeof depositWithdrawABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link depositWithdrawABI}__ and `functionName` set to `"owner"`.
 */
export function useDepositWithdrawOwner<
  TFunctionName extends "owner",
  TSelectData = ReadContractResult<typeof depositWithdrawABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<
      typeof depositWithdrawABI,
      TFunctionName,
      TSelectData
    >,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: depositWithdrawABI,
    functionName: "owner",
    ...config,
  } as UseContractReadConfig<
    typeof depositWithdrawABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link depositWithdrawABI}__.
 */
export function useDepositWithdrawWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof depositWithdrawABI,
          string
        >["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof depositWithdrawABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any
) {
  return useContractWrite<typeof depositWithdrawABI, TFunctionName, TMode>({
    abi: depositWithdrawABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link depositWithdrawABI}__ and `functionName` set to `"deposit"`.
 */
export function useDepositWithdrawDeposit<
  TMode extends WriteContractMode = undefined
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof depositWithdrawABI,
          "deposit"
        >["request"]["abi"],
        "deposit",
        TMode
      > & { functionName?: "deposit" }
    : UseContractWriteConfig<typeof depositWithdrawABI, "deposit", TMode> & {
        abi?: never
        functionName?: "deposit"
      } = {} as any
) {
  return useContractWrite<typeof depositWithdrawABI, "deposit", TMode>({
    abi: depositWithdrawABI,
    functionName: "deposit",
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link depositWithdrawABI}__ and `functionName` set to `"transfer"`.
 */
export function useDepositWithdrawTransfer<
  TMode extends WriteContractMode = undefined
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof depositWithdrawABI,
          "transfer"
        >["request"]["abi"],
        "transfer",
        TMode
      > & { functionName?: "transfer" }
    : UseContractWriteConfig<typeof depositWithdrawABI, "transfer", TMode> & {
        abi?: never
        functionName?: "transfer"
      } = {} as any
) {
  return useContractWrite<typeof depositWithdrawABI, "transfer", TMode>({
    abi: depositWithdrawABI,
    functionName: "transfer",
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link depositWithdrawABI}__ and `functionName` set to `"withdraw"`.
 */
export function useDepositWithdrawWithdraw<
  TMode extends WriteContractMode = undefined
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof depositWithdrawABI,
          "withdraw"
        >["request"]["abi"],
        "withdraw",
        TMode
      > & { functionName?: "withdraw" }
    : UseContractWriteConfig<typeof depositWithdrawABI, "withdraw", TMode> & {
        abi?: never
        functionName?: "withdraw"
      } = {} as any
) {
  return useContractWrite<typeof depositWithdrawABI, "withdraw", TMode>({
    abi: depositWithdrawABI,
    functionName: "withdraw",
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link depositWithdrawABI}__.
 */
export function usePrepareDepositWithdrawWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof depositWithdrawABI, TFunctionName>,
    "abi"
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: depositWithdrawABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof depositWithdrawABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link depositWithdrawABI}__ and `functionName` set to `"deposit"`.
 */
export function usePrepareDepositWithdrawDeposit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof depositWithdrawABI, "deposit">,
    "abi" | "functionName"
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: depositWithdrawABI,
    functionName: "deposit",
    ...config,
  } as UsePrepareContractWriteConfig<typeof depositWithdrawABI, "deposit">)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link depositWithdrawABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareDepositWithdrawTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof depositWithdrawABI, "transfer">,
    "abi" | "functionName"
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: depositWithdrawABI,
    functionName: "transfer",
    ...config,
  } as UsePrepareContractWriteConfig<typeof depositWithdrawABI, "transfer">)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link depositWithdrawABI}__ and `functionName` set to `"withdraw"`.
 */
export function usePrepareDepositWithdrawWithdraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof depositWithdrawABI, "withdraw">,
    "abi" | "functionName"
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: depositWithdrawABI,
    functionName: "withdraw",
    ...config,
  } as UsePrepareContractWriteConfig<typeof depositWithdrawABI, "withdraw">)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link depositWithdrawABI}__.
 */
export function useDepositWithdrawEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof depositWithdrawABI, TEventName>,
    "abi"
  > = {} as any
) {
  return useContractEvent({
    abi: depositWithdrawABI,
    ...config,
  } as UseContractEventConfig<typeof depositWithdrawABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link depositWithdrawABI}__ and `eventName` set to `"Deposit"`.
 */
export function useDepositWithdrawDepositEvent(
  config: Omit<
    UseContractEventConfig<typeof depositWithdrawABI, "Deposit">,
    "abi" | "eventName"
  > = {} as any
) {
  return useContractEvent({
    abi: depositWithdrawABI,
    eventName: "Deposit",
    ...config,
  } as UseContractEventConfig<typeof depositWithdrawABI, "Deposit">)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link depositWithdrawABI}__ and `eventName` set to `"Transfer"`.
 */
export function useDepositWithdrawTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof depositWithdrawABI, "Transfer">,
    "abi" | "eventName"
  > = {} as any
) {
  return useContractEvent({
    abi: depositWithdrawABI,
    eventName: "Transfer",
    ...config,
  } as UseContractEventConfig<typeof depositWithdrawABI, "Transfer">)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link depositWithdrawABI}__ and `eventName` set to `"Withdrawal"`.
 */
export function useDepositWithdrawWithdrawalEvent(
  config: Omit<
    UseContractEventConfig<typeof depositWithdrawABI, "Withdrawal">,
    "abi" | "eventName"
  > = {} as any
) {
  return useContractEvent({
    abi: depositWithdrawABI,
    eventName: "Withdrawal",
    ...config,
  } as UseContractEventConfig<typeof depositWithdrawABI, "Withdrawal">)
}
