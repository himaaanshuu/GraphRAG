/* GraphRAG Intelligence Engine - Main Page Component */

import { CssBaseline, Container, Paper, Typography } from "@mui/material"
import { useAppStore } from "@/store/appStore"
import { useDocuments } from "@/hooks/useDocuments"
import { useGraph } from "@/hooks/useGraph"
import { useNavigate } from "react-router-dom"
import { Box, Button } from "@mui/material"

export default function Dashboard() {
  const { user } = useAppStore()
  const { documents, refresh: refreshDocuments } = useDocuments()
  const { refresh: refreshGraph, nodes, edges } = useGraph()
  const navigate = useNavigate()

  if (!user) {
    navigate("/login")
    return null
  }

  return (
    <Box sx={{ p: 3, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 3 }}>
          GraphRAG Intelligence Engine
        </Typography>

        <Typography variant="h6">Documents</Typography>
        <Box sx={{ mt: 2 }}>
          {documents.length === 0 ? (
            <Typography>No documents uploaded yet.</Typography>
          ) : (
            <ul>
              {documents.map((doc) => (
                <li key={doc.id}>{doc.filename}</li>
              ))}
            </ul>
          )}
        </Box>

        <Typography variant="h6" mt={3}>Knowledge Graph</Typography>
        <Box sx={{ mt: 2, height: 400 }}>
          {nodes.length === 0 ? (
            <Typography>No graph data. Upload documents to build the graph.</Typography>
          ) : (
            <div>
              <Typography>Nodes: {nodes.length}</Typography>
              <Typography>Edges: {edges.length}</Typography>
            </div>
          )}
        </Box>

        <Box mt={3}>
          <Button variant="contained" onClick={refreshDocuments}>
            Refresh Documents
          </Button>
          <Button variant="contained" onClick={refreshGraph} sx={{ ml: 1 }}>
            Refresh Graph
          </Button>
        </Box>
      </Container>
    </Box>
  )
}