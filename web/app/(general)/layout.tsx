import { ReactNode } from "react"

import { NetworkStatus } from "@/components/blockchain/network-status"
import ChatWidget from "@/components/chat/ChatWidget"
import { Footer } from "@/components/layout/footer"
import { SiteHeader } from "@/components/layout/site-header"

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <NetworkStatus />
      <div className="fixed bottom-6 right-6">
        <ChatWidget />
      </div>
    </>
  )
}
