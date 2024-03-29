import Link from "next/link"
import { FaGithub } from "react-icons/fa"

import { menuDashboard } from "@/config/menu-dashboard"
import { siteConfig } from "@/config/site"
import { ScrollArea } from "@/components/ui/scroll-area"
import ChatWidget from "@/components/chat/ChatWidget"
import { SidebarNav } from "@/components/layout/sidebar-nav"
import { SiteHeader } from "@/components/layout/site-header"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 justify-between overflow-y-auto border-r md:sticky md:flex md:flex-col">
          <ScrollArea className="py-6 pr-6 lg:py-8">
            <h3 className="text-lg font-normal">User</h3>
            <SidebarNav items={menuDashboard} />
          </ScrollArea>
          <footer className="fixed bottom-6 flex flex-col pr-2 pt-4">
            <h3 className="text-sm font-semibold text-wrap max-w-60">
              {siteConfig.title}
            </h3>
            <div className="mt-2 flex items-center space-x-2">
              <Link href={siteConfig.links.github}>
                <FaGithub />
              </Link>
            </div>
          </footer>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
      <div className="fixed bottom-6 right-6">
        <ChatWidget />
      </div>
    </div>
  )
}
