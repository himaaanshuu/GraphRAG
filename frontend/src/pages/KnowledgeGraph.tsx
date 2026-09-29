/* GraphRAG Intelligence Engine - Knowledge Graph Page */

import { CssBaseline, Container, Paper, Typography, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useGraph } from "@/hooks/useGraph"
import { Box, Button } from "@mui/material"

export default function KnowledgeGraphPage() {
  const navigate = useNavigate()
  const { user } = useAppStore()
  if (!user) {
    navigate("/login")
    return null
  }

  const { nodes, edges, loading, refresh } = useGraph()

  return (
    <CssBaseline>
      <Container maxWidth="lg">
        <Box sx={{ p: 2, bgcolor: "background.default" }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Knowledge Graph
          </Typography>

          {loading && <Typography>Loading graph...</Typography>}

          <Box sx={{ mt: 2, height: 500, border: "1px solid #ddd", borderRadius: 1, overflow: "auto" }}>
            {nodes.length === 0 && !loading ? (
              <Typography>No graph data. Upload documents to build the graph.</Typography>
            ) : (
              <div>
                <Typography variant="subtitle1">Nodes: {nodes.length}</Typography>
                <Typography variant="subtitle2">Edges: {edges.length}</Typography>
                <Box sx={{ mt: 2 }}>
                  {nodes.map((node) => (
                    <div key={node.id} sx={{ mb: 1, p: 1, borderRadius: 1, background: "#f0f0f0" }}>
                      <Typography>{node.label}</Typography>
                      <Typography sx={{ fontSize: "0.75rem", color: "#666" }}>{node.entity_type}</Typography>
                    </div>
                  ))}
                </Box>
                <Box sx={{ mt: 2 }}>
                  {edges.map((edge) => (
                    <div key={edge.id} sx={{ mb: 1, p: 1, borderRadius: 1, background: "#e8f4fd" }}>
                      <Typography>{edge.source} --[{edge.relationship_type}]--> {edge.target}</Typography>
                      <Typography sx={{ fontSize: "0.75rem", color: "#666" }}>salience: {edge.salience}</Typography>
                    </div>
                  ))}
                </Box>
              </div>
            )}
          </Box>

          <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
            <Button variant="outlined" onClick={refresh}>
              Refresh
            </Button>
          </Box>
        </Box>
      </Container>
    </CssBaseline>
  )
}