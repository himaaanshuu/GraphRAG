/* GraphRAG Intelligence Engine - Documents Page */

import { CssBaseline, Container, Paper, Typography, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useDocuments } from "@/hooks/useDocuments"
import { Box, Button } from "@mui/material"
import { TextField } from "@mui/material"

export default function DocumentsPage() {
  const navigate = useNavigate()
  const { documents, loading, error, uploadDocument, refresh } = useDocuments()

  if (!documents && loading) {
    return null
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    await uploadDocument(file)
    refresh()
    e.target.value = "" // Reset file input
  }

  return (
    <CssBaseline>
      <Container maxWidth="lg">
        <Box sx={{ p: 2, bgcolor: "background.default" }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Document Management
          </Typography>

          {error && <Typography variant="subtitle1" color="error">{error}</Typography>}

          <Typography variant="h6" sx={{ mb: 2 }}>
            Upload Document
          </Typography>

          <Box sx={{ mb: 3 }}>
            <TextField
              label="Select PDF or Text File"
              type="file"
              accept=".pdf,.txt"
              onChange={handleUpload}
            />
          </Box>

          {documents.length === 0 && !loading && (
            <Typography>No documents uploaded yet.</Typography>
          )}

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