import { useEffect, useRef, useState } from 'react'
import { MessageCircle, Send, Sparkles, X } from 'lucide-react'
import { sendChatMessage } from '../../utils/chatApi'

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Hi! I\'m the IQ Fashion AI Assistant. Ask me about our programs, training, locations, certification, or how to get started.',
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-peach)] text-[var(--color-accent-deep)]">
        <Sparkles className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm ring-1 ring-[var(--color-border-soft)]">
        <p className="mb-1.5 text-xs font-medium text-[var(--color-muted)]">
          AI is typing…
        </p>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-accent)]"
              style={{ animationDelay: `${dot * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      inputRef.current?.focus()
    }
  }, [isOpen, messages, isLoading])

  async function handleSend(event) {
    event?.preventDefault()

    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setError('')
    setIsLoading(true)

    const history = [...messages, userMessage]
      .filter((msg) => msg.id !== 'welcome')
      .map(({ role, content }) => ({ role, content }))

    try {
      const reply = await sendChatMessage(trimmed, history)
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: reply,
        },
      ])
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 sm:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      <div
        className={`fixed z-50 flex flex-col overflow-hidden border border-[var(--color-border-soft)] bg-[var(--color-cream)] shadow-2xl transition-all duration-300 ease-out
          bottom-0 right-0 h-[min(100dvh,680px)] w-full rounded-t-3xl
          sm:bottom-24 sm:right-6 sm:h-[min(70dvh,560px)] sm:w-[min(100vw-3rem,380px)] sm:rounded-3xl
          ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'pointer-events-none translate-y-4 opacity-0 scale-95 sm:translate-y-2'}`}
        role="dialog"
        aria-label="AI fashion assistant chat"
        aria-hidden={!isOpen}
      >
        <header className="flex items-center justify-between border-b border-[var(--color-border-soft)] bg-white px-4 py-3.5">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-deep)] text-white shadow-md">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-lg leading-tight text-[var(--color-ink)]">
                IQ Fashion AI
              </h2>
              <p className="text-xs text-[var(--color-muted)]">
                Store assistant · online
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-muted)] transition hover:bg-[var(--color-blush)]/50 hover:text-[var(--color-accent)]"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          {messages.map((message) => {
            const isUser = message.role === 'user'

            return (
              <div
                key={message.id}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex max-w-[85%] items-end gap-2 ${
                    isUser ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {!isUser && (
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-peach)] text-[var(--color-accent-deep)]">
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                    </span>
                  )}
                  <p
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                      isUser
                        ? 'rounded-br-md bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-deep)] text-white'
                        : 'rounded-bl-md bg-white text-[var(--color-ink)] ring-1 ring-[var(--color-border-soft)]'
                    }`}
                  >
                    {message.content}
                  </p>
                </div>
              </div>
            )
          })}

          {isLoading && <TypingIndicator />}
          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSend}
          className="border-t border-[var(--color-border-soft)] bg-white p-3"
        >
          <div className="flex items-end gap-2">
            <label htmlFor="chat-input" className="sr-only">
              Type your message
            </label>
            <textarea
              id="chat-input"
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about anything"
              disabled={isLoading}
              className="max-h-28 min-h-[44px] flex-1 resize-none rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition focus:border-[var(--color-accent)] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-deep)] text-white shadow-md transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>

{!isOpen && (
  <button
    type="button"
    onClick={() => setIsOpen(true)}
    className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-deep)] text-white shadow-lg shadow-[var(--color-accent)]/30 transition duration-300 hover:scale-105 hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] sm:bottom-6 sm:right-6"
    aria-label="Open AI chat"
    aria-expanded={isOpen}
  >
    <MessageCircle className="h-6 w-6" />
  </button>
)}
    </>
  )
}
