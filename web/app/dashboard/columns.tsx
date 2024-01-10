"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import { parsedData } from "./page"

const beefyLogo =
  "https://seeklogo.com/images/B/beefy-finance-bifi-logo-B26A92CF35-seeklogo.com.png"
const harvestLogo =
  "data:image/png;base64,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"
const yearnLogo =
  "https://altcoinsbox.com/wp-content/uploads/2023/03/yearn.finance-logo.png"

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
    cell: ({ cell }) => {
      const platform: String = String(cell.getValue())
      return platform == "Beefy" ? (
        <div>
          <div>{platform}</div>
          <div>
            <Avatar>
              <AvatarImage src={beefyLogo} />
              <AvatarFallback>BF</AvatarFallback>
            </Avatar>
          </div>
        </div>
      ) : platform == "Harvest" ? (
        <div>
          <div>{platform}</div>
          <div>
            <Avatar>
              <AvatarImage src={harvestLogo} />
              <AvatarFallback>HF</AvatarFallback>
            </Avatar>
          </div>
        </div>
      ) : (
        <div>
          <div>{platform}</div>
          <div>
            <Avatar>
              <AvatarImage src={yearnLogo} />
              <AvatarFallback>YF</AvatarFallback>
            </Avatar>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "apr",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          APR(%)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
]
