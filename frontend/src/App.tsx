/* GraphRAG Intelligence Engine - App Root */

import { BeautyBar } from "@mui/material"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useAppStore } from "./store/appStore"
import Dashboard from "./pages/Dashboard"
import Chat from "./pages/Chat"
import Documents from "./pages/Documents"
import KnowledgeGraph from "./pages/KnowledgeGraph"
import Evaluation from "./pages/Evaluation"
import { Box, Toolbar, CssBaseline } from "@mui/material"
import { styled } from "@mui/system"
import { Container } from "@mui/material"

const AppRouter = () => {
  const { user } = useAppStore()

  return (
    <Router>
      <CssBaseline>
        <RouterContainer>
          <Toolbar variant="primary" sx={{ px: 1, py: 0.5 }}>
            <Typography variant="h6" noWrap>
              GraphRAG Intelligence Engine
            </Typography>
          </Toolbar>

          <Routes>
            {user ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="chat" element={<Chat />} />
                <Route path="documents" element={<Documents />} />
                <Route path="graph" element={<KnowledgeGraph />} />
                <Route path="evaluation" element={<Evaluation />} />
              </>
            ) : (
              <Route path="*" element={<>"Please log in"}</>) }
            )}
          </Routes>
        </RouterContainer>
      </CssBaseline>
    </Router>
  )
}

const RouterContainer = styled(Box)<{ pb?: number }>`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export default AppRouter