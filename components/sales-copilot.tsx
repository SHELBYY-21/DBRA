'use client'

import { useChat } from '@ai-sdk/react'
import { ArrowUpIcon, BotIcon, RotateCcwIcon, SquareIcon, UserIcon } from 'lucide-react'
import { DefaultChatTransport } from 'ai'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from '@/components/ui/input-group'
import { Spinner } from '@/components/ui/spinner'

const prompts = [
  'Which deals need attention?',
  'Summarize the forecast',
  'Give me next best actions',
]

export function SalesCopilot() {
  const [input, setInput] = useState('')
  const { messages, sendMessage, status, stop, error, regenerate } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })
  const isBusy = status === 'submitted' || status === 'streaming'

  function submit(text: string) {
    const value = text.trim()
    if (!value || isBusy) return
    sendMessage({ text: value })
    setInput('')
  }

  return (
    <Card className="flex min-h-[34rem] flex-col overflow-hidden md:h-[calc(100vh-6.5rem)] md:min-h-0">
      <CardHeader className="border-b">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <CardTitle className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <BotIcon className="size-4" aria-hidden="true" />
              </span>
              Relay copilot
            </CardTitle>
            <CardDescription>Ask about this demo pipeline.</CardDescription>
          </div>
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="size-2 rounded-full bg-success" aria-hidden="true" />
            Gateway ready
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col gap-4 pt-4">
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-1" role="log" aria-live="polite" aria-label="Copilot conversation">
          {messages.length === 0 ? (
            <div className="flex flex-1 flex-col justify-center gap-5 py-6">
              <div className="flex flex-col gap-2">
                <p className="text-lg font-medium text-balance">Where should your team focus next?</p>
                <p className="text-sm leading-relaxed text-muted-foreground">Relay can spot risk, summarize forecast movement, and turn this demo pipeline into a short action list.</p>
              </div>
              <div className="flex flex-col gap-2">
                {prompts.map((prompt) => (
                  <Button key={prompt} variant="outline" className="h-auto justify-start whitespace-normal py-2 text-left" onClick={() => submit(prompt)}>
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <article key={message.id} className="flex items-start gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  {message.role === 'user' ? <UserIcon className="size-4" aria-hidden="true" /> : <BotIcon className="size-4" aria-hidden="true" />}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="text-xs font-medium text-muted-foreground">{message.role === 'user' ? 'You' : 'Relay'}</p>
                  {message.parts.map((part, index) =>
                    part.type === 'text' ? <p key={`${message.id}-${index}`} className="whitespace-pre-wrap text-sm leading-relaxed">{part.text}</p> : null,
                  )}
                </div>
              </article>
            ))
          )}
          {status === 'submitted' && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Spinner /> Analyzing pipeline
            </div>
          )}
          {error && (
            <div className="flex items-center justify-between gap-3 rounded-md bg-muted p-3 text-sm">
              <p>Relay couldn&apos;t connect. Check the project&apos;s Vercel OIDC configuration.</p>
              <Button size="sm" variant="outline" onClick={() => regenerate()}>
                <RotateCcwIcon data-icon="inline-start" /> Retry
              </Button>
            </div>
          )}
        </div>

        <form onSubmit={(event) => { event.preventDefault(); submit(input) }}>
          <InputGroup>
            <InputGroupTextarea
              aria-label="Message Relay copilot"
              placeholder="Ask about pipeline risk..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) {
                  event.preventDefault()
                  submit(input)
                }
              }}
              disabled={isBusy}
              className="min-h-20"
            />
            <InputGroupAddon align="block-end">
              <span className="text-xs text-muted-foreground">Demo data · Enter to send</span>
              {isBusy ? (
                <InputGroupButton className="ml-auto" type="button" variant="outline" size="icon-sm" onClick={() => stop()} aria-label="Stop response">
                  <SquareIcon />
                </InputGroupButton>
              ) : (
                <InputGroupButton className="ml-auto" type="submit" variant="default" size="icon-sm" disabled={!input.trim()} aria-label="Send message">
                  <ArrowUpIcon />
                </InputGroupButton>
              )}
            </InputGroupAddon>
          </InputGroup>
        </form>
      </CardContent>
    </Card>
  )
}
