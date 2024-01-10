"use client"

import { ColumnDef } from "@tanstack/react-table"
import { parsedData } from "./page"


export const columns: ColumnDef<parsedData>[] = [
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
    accessorKey: "apr",
    header: "APR (%)",
  }
]
