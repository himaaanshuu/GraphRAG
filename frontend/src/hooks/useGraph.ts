/* GraphRAG Intelligence Engine - Graph Hook */

import { useState, useEffect } from "react"
import { getGraph } from "../services/api"

export interface UseGraphResult {
  nodes: GraphNode[]
  edges: GraphEdge[]
  loading: boolean
  error: string | null
  refresh: () => void
}

export function useGraph(): UseGraphResult {
  const [nodes, setNodes] = useState<GraphNode[]>([])
  const [edges, setEdges] = useState<GraphEdge[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = async () => {
    setLoading(true)
    setError(null)
    try {
      const { nodes, edges } = await getGraph()
      setNodes(nodes)
      setEdges(edges)
    } catch (err: any) {
      setError(err.message || "Failed to load graph")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  return { nodes, edges, loading, error, refresh }
}