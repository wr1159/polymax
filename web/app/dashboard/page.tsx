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
  apr: number
}

function capitalizeWordsWithDelimiters(inputString: String) {
  const wordsAndDelimiters = inputString.split(/([\s-]+)/)

  const capitalizedString = wordsAndDelimiters
    .map((part, index) => {
      // Capitalize only if it's a word (not a delimiter)
      return index % 2 === 0
        ? part.charAt(0).toUpperCase() + part.slice(1)
        : part
    })
    .join("")

  return capitalizedString
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
          exchange:
            key.split("-")[0].charAt(0).toUpperCase() +
            key.split("-")[0].slice(1),
          token: capitalizeWordsWithDelimiters(key.slice(firstDashIndex + 1)),
          platform: "Beefy",
          apr: Number((data[key].vaultApr * 100).toFixed(2)),
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
            ? Number((token.apr.netAPR * 100).toFixed(2))
            : token.apr.forwardAPR.netAPR
            ? Number((token.apr.forwardAPR.netAPR * 100).toFixed(2))
            : 0,
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
            exchange:
              token.split("_")[0].charAt(0).toUpperCase() +
              token.split("_")[0].slice(1),
            token: token.slice(firstDelimiterIndex + 1),
            platform: "Harvest",
            apr: Number(Number(tokens[token].estimatedApy).toFixed(2)),
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
        <div className="container mx-auto py-10">
          <DataTable
            disabled={false}
            columns={columns}
            data={allData
              .filter((token) => token.apr > 0 && token.apr < 1200)
              .sort((a, b) => b.apr - a.apr)}
          />
        </div>
      </IsWalletConnected>
      <IsWalletDisconnected>
        <div className="container mx-auto py-10">
          <DataTable
            disabled={true}
            columns={columns}
            data={allData
              .filter((token) => token.apr > 0 && token.apr < 1200)
              .sort((a, b) => b.apr - a.apr)}
          />
        </div>
      </IsWalletDisconnected>
    </motion.div>
  )
}
