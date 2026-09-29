/* GraphRAG Intelligence Engine - Frontend Types */

export interface User {
  id: string
  email: string
  full_name: string | null
  created_at: string
}

export interface Document {
  id: string
  filename: string
  original_name: string
  status: "draft" | "processing" | "processed" | "failed"
  created_at: string
  updated_at: string | null
}

export interface Chunk {
  id: string
  document_id: string
  content: string
  token_count: number
  index: number
}

export interface SearchResult {
  id: string
  score: number
  source: "vector" | "bm25" | "graph"
  content: string
  document_id: string | null
  metadata: Record<string, any>
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  created_at: string
  citations: Citation[]
}

export interface Citation {
  source: string
  document: string
  chunk_index: number
  confidence: number
}

export interface QueryRequest {
  question: string
  conversation_id: string | null
}

export interface QueryResponse {
  answer: string
  citations: Citation[]
  conversation_id: string
}

export interface GraphNode {
  id: string
  label: string
  group: string
  entity_type: string
  salience: number
}

export interface GraphEdge {
  id: string
  source: string
  target: string
  label: string
  relationship_type: string
  salience: number
}