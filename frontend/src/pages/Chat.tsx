/* GraphRAG Intelligence Engine - Chat Page */

import { CssBaseline, Container, Paper, Typography, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useChat } from "@/hooks/useChat"
import { useDocuments } from "@/hooks/useDocuments"
import { TextField, Button } from "@mui/material"
import { Box as MuiBox } from "@mui/system"

export default function ChatPage() {
  const { user } = useAppStore()
  if (!user) {
    navigate("/login")
    return null
  }

  const navigate = useNavigate()
  const { messages, loading, error, sendMessage } = useChat()
  const { documents, refresh } = useDocuments()

  const [conversationId, setConversationId] = useState<string | null>(null)
  const [input, setInput] = useState("")

  const send = async () => {
    if (!input.trim()) return
    await sendMessage(input, conversationId)
    setInput("")
  }

  return (
    <CssBaseline>
      <Container maxWidth="lg">
        <Box sx={{ p: 2, bgcolor: "background.default" }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            GraphRAG Chat
          </Typography>

          {error && <Typography variant="subtitle1" color="error">{error}</Typography>}

          <Box sx={{ height: "500px", border: "1px solid #e0e0e0", borderRadius: 1, p: 2, overflow: "auto" }}>
            {messages.map((msg) => (
              <Box key={msg.id} sx={{
                display: "flex",
                mb: 2,
                flexDirection: msg.role === "user" ? "row-reverse" : "row",
              }}>
                <Typography variant="body1" sx={{ px: 2, py: 1, borderRadius: 1, maxWidth: "80%" }}>
                  {msg.role === "user" ? "User" : "Assistant"}: {msg.content}
                </Typography>
                {msg.citations && msg.citations.length > 0 && (
                  <Box sx={{ ml: 1, fontSize: "0.75rem", color: "#666" }}>
                    {msg.citations.map((c, i) => (
                      <span key={i}>[{c.document}]</span>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>

          <Box sx={{ mt: 2, display: "flex" }}>
            <TextField
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
            />
            <Button variant="contained" onClick={send} disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </Button>
          </Box>
        </Box>
      </Container>
    </CssBaseline>
  )
}