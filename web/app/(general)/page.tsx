import Image from "next/image"
import Link from "next/link"

import "@/styles/animation.css"

import { FaDiscord, FaGithub } from "react-icons/fa"
import { LuBook } from "react-icons/lu"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  PageHeader,
  PageHeaderCTA,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"
import { CopyButton } from "@/components/shared/copy-button"
import { ExampleDemos } from "@/components/shared/example-demos"
import { IsDarkTheme } from "@/components/shared/is-dark-theme"
import { IsLightTheme } from "@/components/shared/is-light-theme"

export default function HomePage() {
  return (
    <div className="container relative mt-20 px-0">
      <PageHeader className="flex pb-8">
        <div className="flex justify-center">
          <div className="pr-10">
            <PageHeaderHeading>
              Reshape the yield farming landscape{" "}
            </PageHeaderHeading>
            <PageHeaderDescription>
              PolyMax - {siteConfig.description}
            </PageHeaderDescription>
          </div>
          <div>
            <IsLightTheme>
              <Image
                src="/logo.png"
                alt="Polymax Logo"
                width={200}
                height={200}
                className="bounce-with-delay m-auto rounded-2xl pb-0"
              />
              <div className="ripple-effect m-auto h-full w-full rounded-2xl border-black">
                <Image
                  src="/logo.png"
                  alt="Polymax Logo"
                  width={100}
                  height={100}
                  className="h-full w-full rounded-2xl"
                />
                <div className="ripple-effect invisible"></div>
              </div>
            </IsLightTheme>
            <IsDarkTheme>
              <Image
                src="/logo-dark.png"
                alt="Polymax Logo"
                width={200}
                height={200}
                className="bounce-with-delay m-auto rounded-2xl pb-0"
              />
              <div className="ripple-effect m-auto h-full w-full rounded-2xl border-white">
                <Image
                  src="/logo-dark.png"
                  alt="Polymax Logo"
                  width={100}
                  height={100}
                  className="h-full w-full rounded-2xl"
                />
                <div className="ripple-effect invisible"></div>
              </div>
            </IsDarkTheme>
          </div>
        </div>
      </PageHeader>
    </div>
  )
}
