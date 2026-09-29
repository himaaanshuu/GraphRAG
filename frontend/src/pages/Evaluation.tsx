/* GraphRAG Intelligence Engine - Evaluation Page */

import { CssBaseline, Container, Paper, Typography, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useAppStore } from "@/store/appStore"
import { Box, Button } from "@mui/material"

export default function EvaluationPage() {
  const { user } = useAppStore()
  if (!user) {
    navigate("/login")
    return null
  }

  return (
    <CssBaseline>
      <Container maxWidth="lg">
        <Box sx={{ p: 2, bgcolor: "background.default" }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            RAG Evaluation
          </Typography>

          <Typography>
            Evaluation framework ready. Add evaluation datasets and run tests via the backend API.
          </Typography>

          <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
            <Button variant="outlined">Run Evaluation (API)</Button>
          </Box>
        </Box>
      </Container>
    </CssBaseline>
  )
}