"use client"

import { useState } from "react"
import { RxCross1 } from "react-icons/rx"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import ChatPanel from "./ChatPanel"

export function ChatWidget() {
  const [isOpen, setOpen] = useState<boolean>(false)
  return (
    <Popover>
      <PopoverTrigger asChild>
        {isOpen ? (
          <Button size="icon" onClick={() => setOpen(false)}>
            <RxCross1 />
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setOpen(true)}>
            Ask PolyMaster
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <ChatPanel />
      </PopoverContent>
    </Popover>
  )
}

export default ChatWidget
