/* GraphRAG Intelligence Engine - Documents Hook */

import { useState, useEffect } from "react"
import { listDocuments, type Document, type UploadResult } from "../services/api"

export interface UseDocumentsResult {
  documents: Document[]
  loading: boolean
  error: string | null
  uploadDocument: (file: File, onProgress?: (progress: number) => void) => Promise<void>
  refresh: () => void
}

export function useDocuments(): UseDocumentsResult {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = async () => {
    setLoading(true)
    setError(null)
    try {
      const docs = await listDocuments()
      setDocuments(docs)
    } catch (err: any) {
      setError(err.message || "Failed to load documents")
    } finally {
      setLoading(false)
    }
  }

  const uploadDocument = async (file: File, onProgress?: (progress: number) => void) => {
    setLoading(true)
    setError(null)
    try {
      const result = await uploadDocument(file, onProgress)
      setDocuments((prev) => [result, ...prev])
      setLoading(false)
      return result
    } catch (err: any) {
      setError(err.message || "Failed to upload document")
      setLoading(false)
      throw err
    }
  }

  // Initial load
  useEffect(() => {
    refresh()
  }, [])

  return { documents, loading, error, uploadDocument, refresh }
}