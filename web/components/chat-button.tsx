"use client"

import { useState } from "react"

export default function ChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="rounded-xl bg-blue-500 px-4 py-2 text-white"
      >
        {isChatOpen ? "Close Chat" : "Chat with our AI assistant"}
      </button>
    </div>
  )
}
