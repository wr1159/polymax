"use client"

import { parse } from "path"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { WalletAddress } from "@/components/blockchain/wallet-address"
import { WalletBalance } from "@/components/blockchain/wallet-balance"
import { WalletEnsName } from "@/components/blockchain/wallet-ens-name"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"

import { BeefyData } from "./BeefyInterface"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { HarvestData } from "./HarvestInterface"
import { YearnData } from "./YearnInterface"

export interface parsedData {
  exchange: string
  token: string
  platform: string
  apr: string
}

export default function PageDashboard() {
  const [allData, setAllData] = useState<parsedData[]>([])

  useEffect(() => {
    // Make the API call when the component mounts
    const fetchBeefyData = async () => {
      try {
        const response = await fetch("https://api.beefy.finance/apy/breakdown")

        // Check if the response was successful (status code 2xx)
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }

        const result: BeefyData = await response.json()
        parseBeefyData(result)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    const parseBeefyData = (data: BeefyData) => {
      const dataArray: parsedData[] = []
      if (!data) return
      Object.keys(data).forEach((key) => {
        const firstDashIndex = key.indexOf("-")
        dataArray.push({
          exchange: key.split("-")[0],
          token: key.slice(firstDashIndex + 1),
          platform: "Beefy",
          apr: String(data[key].vaultApr * 100).substring(0, 6),
        })
      })
      setAllData(dataArray)
      return
    }

    const fetchYearnData = async () => {
      try {
        const response = await fetch(
          "https://ydaemon.yearn.fi/vaults?hideAlways=true&orderBy=featuringScore&orderDirection=desc&strategiesDetails=withDetails&strategiesRisk=withRisk&strategiesCondition=inQueue&chainIDs=1%2C10%2C137%2C250%2C8453%2C42161&limit=2500"
        )

        // Check if the response was successful (status code 2xx)
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }

        const result: YearnData = await response.json()
        parseYearnData(result)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    const parseYearnData = (data: YearnData) => {
      const dataArray: parsedData[] = []
      if (!data) return
      data.forEach((token) => {
        dataArray.push({
          exchange: "",
          token: token.name,
          platform: "Yearn",
          apr: token.apr.netAPR
            ? String(token.apr.netAPR * 100).substring(0, 6)
            : String(token.apr.forwardAPR.netAPR).substring(0, 6),
        })
      })
      setAllData((prev) => [...prev, ...dataArray])
      return
    }

    const fetchHarvestData = async () => {
      try {
        const response = await fetch(
          "https://api.harvest.finance/vaults?key=41e90ced-d559-4433-b390-af424fdc76d6"
        )

        // Check if the response was successful (status code 2xx)
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }

        const result: HarvestData = await response.json()
        delete result.updatedAt
        parseHarvestData(result)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    const parseHarvestData = (data: HarvestData) => {
      const dataArray: parsedData[] = []
      if (!data) return
      Object.keys(data).forEach((key) => {
        const tokens = data[key]
        Object.keys(tokens).forEach((token) => {
          const firstDelimiterIndex = token.indexOf("_")
          dataArray.push({
            exchange: token.split("_")[0],
            token: token.slice(firstDelimiterIndex + 1),
            platform: "Harvest",
            apr: String(tokens[token].estimatedApy).substring(0, 6),
          })
        })
      })
      setAllData((prev) => [...prev, ...dataArray])
      return
    }

    fetchBeefyData()
    fetchYearnData()
    fetchHarvestData()
  }, [])

  return (
    <motion.div
      animate="show"
      className="flex h-full w-full items-center justify-center lg:py-8"
      initial="hidden"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      viewport={{ once: true }}
      whileInView="show"
    >
      <IsWalletConnected>
        <div className="col-span-12 flex flex-col items-center justify-center lg:col-span-9">
          <div className="text-center">
            <h3 className="text-2xl font-bold lg:text-6xl">
              <span className="bg-gradient-to-br from-indigo-600 to-purple-700 bg-clip-text text-transparent dark:from-indigo-100 dark:to-purple-200">
                hi 👋 <WalletEnsName />
              </span>
            </h3>
            <span className="font-light">
              <WalletAddress className="mt-5 block text-xl font-light" />
              <div className="mt-4">
                <span className="text-3xl font-light">
                  Balance: <WalletBalance decimals={7} /> ETH
                </span>
              </div>
            </span>
          </div>
        </div>
      </IsWalletConnected>
      <IsWalletDisconnected>
        <div className="container mx-auto py-10">
          <DataTable
            columns={columns}
            data={allData}
          />
        </div>
      </IsWalletDisconnected>
    </motion.div>
  )
}
