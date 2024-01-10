"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { WalletAddress } from "@/components/blockchain/wallet-address"
import { WalletBalance } from "@/components/blockchain/wallet-balance"
import { WalletEnsName } from "@/components/blockchain/wallet-ens-name"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"

import { BeefyData } from "./BeefyInterface"
import { HarvestData } from "./HarvestInterface"
import { YearnData } from "./YearnInterface"

export default function PageDashboard() {
  const [beefyData, setBeefyData] = useState<BeefyData | null>(null)
  const [yearnData, setYearnData] = useState<YearnData | null>(null)
  const [harvestData, setHarvestData] = useState<HarvestData | null>(null)

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
        setBeefyData(result)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
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
        setYearnData(result)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
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
        setHarvestData(result)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
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
        <div>
          <table>
            <thead>
              <tr>
                <th>Exchange</th>
                <th>Token Name</th>
                <th>Platform</th>
                <th>Estimated APY</th>
              </tr>
            </thead>
            <tbody>
              {beefyData &&
                Object.keys(beefyData).map((token) => {
                  const firstDashIndex = token.indexOf("-")
                  return (
                    <tr key={token}>
                      <td>{token.split("-")[0]}</td>
                      <td>{token.slice(firstDashIndex + 1)}</td>
                      <td>Beefy</td>
                      <td>{String(beefyData[token].vaultApr)}</td>
                    </tr>
                  )
                })}
              {yearnData &&
                yearnData.map((token) => {
                  return (
                    <tr key={token.address}>
                      <td>{token.name}</td>
                      <td>Yearn</td>
                      <td>
                        {token.apr.netAPR
                          ? String(token.apr.netAPR)
                          : String(token.apr.forwardAPR.netAPR)}
                      </td>
                    </tr>
                  )
                })}
              {harvestData &&
                Object.keys(harvestData).map((key) => {
                  const tokens = harvestData[key]
                  return Object.keys(tokens).map((token) => {
                    const firstDelimiterIndex = token.indexOf("_")
                    return (
                      <tr key={token}>
                        <td>{token.split("_")[0]}</td>
                        <td>{token.slice(firstDelimiterIndex + 1)}</td>
                        <td>Harvest</td>
                        <td>{tokens[token].estimatedApy}</td>
                      </tr>
                    )
                  })
                })}
            </tbody>
          </table>
        </div>
      </IsWalletDisconnected>
    </motion.div>
  )
}
