/* GraphRAG Intelligence Engine - API Service */

import type {
  QueryRequest,
  QueryResponse,
  ChatMessage,
  Citation,
  Document,
} from "../types"

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api"

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  })
  return response
}

export async function login(
  email: string,
  password: string
): Promise<{ access_token: string; user: User }> {
  const response = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
  return response.json()
}

export async function register(
  email: string,
  password: string,
  full_name: string
): Promise<{ access_token: string; user: User }> {
  const response = await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, full_name }),
  })
  return response.json()
}

export async function getCurrentUser(): Promise<User> {
  const response = await apiRequest("/auth/me", { credentials: "include" })
  if (response.status === 401) return {} as User
  return response.json()
}

export async function uploadDocument(file: File, onProgress?: (progress: number) => void): Promise<Document> {
  const formData = new FormData()
  formData.append("file", file)
  
  const response = await apiRequest("/documents/upload", {
    method: "POST",
    body: formData,
  })
  return response.json()
}

export async function listDocuments(): Promise<Document[]> {
  const response = await apiRequest("/documents/", { credentials: "include" })
  return response.json()
}

export async function submitQuery(
  request: QueryRequest
): Promise<QueryResponse> {
  const response = await apiRequest("/chat/query", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })
  return response.json()
}

export async function getGraph(): Promise<{ nodes: GraphNode[]; edges: GraphEdge[] }> {
  const response = await apiRequest("/graph/", { credentials: "include" })
  return response.json()
}