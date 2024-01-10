"use client"

import { FormEvent, useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import { FaCopy } from "react-icons/fa"

import { useToast } from "@/lib/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useOpenAIPrompt } from "@/integrations/openai/hooks/use-openai-prompt"

export function ChatPanel() {
  const [question, setQuestion] = useState<string>("")
  const { toast, dismiss } = useToast()
  const { response, isLoading, generateAIResponse } = useOpenAIPrompt()

  const handleToast = ({
    title,
    description,
  }: {
    title: string
    description: string
  }) => {
    toast({
      title,
      description,
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }

  const handleGenerateResponse = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await generateAIResponse(question)
    } catch (e) {
      handleToast({
        title: "An Error Occurred",
        description:
          "An error occurred while generating the AI response. Please try again later.",
      })
    }
  }

  return (
    <Card className="w-full pt-6 border-none bg-inherit shadow-none">
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleGenerateResponse}>
          <Label htmlFor="question">Question</Label>
          <Textarea
            id="question"
            placeholder="Your question here."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <div className="relative">
            <Label htmlFor="response">Response</Label>
            <Textarea
              readOnly
              className="mt-2 h-60"
              placeholder="PolyMaster's reply will appear here."
              value={response}
            />
            {response && (
              <CopyToClipboard text={response}>
                <span
                  className="absolute right-2 top-8 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-muted p-2 hover:bg-accent"
                  onClick={() =>
                    handleToast({
                      title: "AI response copied to clipboard",
                      description:
                        "You can now paste the response anywhere you want.",
                    })
                  }
                >
                  <FaCopy className="text-muted-foreground" />
                </span>
              </CopyToClipboard>
            )}
          </div>
          <Button disabled={isLoading || !prompt} type="submit">
            {isLoading ? "Replying..." : "Ask"}
          </Button>
        </form>{" "}
      </CardContent>
    </Card>
  )
}

export default ChatPanel
