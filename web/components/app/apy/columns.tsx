"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  exchange: string
  token: string
  platform: string
  estimatedApy: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "exchange",
    header: "Exchange",
  },
  {
    accessorKey: "token",
    header: "Token",
  },
  {
    accessorKey: "platform",
    header: "Platform",
  },
  {
    accessorKey: "estimatedApy",
    header: "Estimated APY",
  }
]
