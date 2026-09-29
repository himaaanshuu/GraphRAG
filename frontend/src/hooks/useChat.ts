/* GraphRAG Intelligence Engine - Chat Hook */

import { useState, useEffect } from "react"
import { submitQuery, type QueryResponse, type ChatMessage } from "../services/api"

export interface UseChatResult {
  messages: ChatMessage[]
  loading: boolean
  error: string | null
  sendMessage: (question: string, conversationId?: string) => Promise<void>
  clearConversation: () => void
}

export function useChat(): UseChatResult {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = async (question: string, conversationId?: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await submitQuery({ question, conversation_id: conversationId })
      setMessages((prev) => [...prev, {
        id: Date.now().toString(),
        role: "user",
        content: question,
        created_at: new Date().toISOString(),
        citations: [],
      }])
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.answer,
        created_at: new Date().toISOString(),
        citations: response.citations,
      }])
    } catch (err: any) {
      setError(err.message || "Failed to submit query")
    } finally {
      setLoading(false)
    }
  }

  const clearConversation = () => {
    setMessages([])
  }

  return { messages, loading, error, sendMessage, clearConversation }
}