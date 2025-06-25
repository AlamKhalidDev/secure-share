"use client";

import { useRouter } from "next/navigation";
import { formatDistance } from "date-fns";
import {
  Box,
  Button,
  Typography,
  Paper,
  Card,
  CardContent,
  Chip,
  Divider,
  Container,
} from "@mui/material";
import { Shield, Security } from "@mui/icons-material";
import { SecretData } from "@/types/secret";

interface SecretRetrievedProps {
  secretData: SecretData;
}

export default function SecretRetrieved({ secretData }: SecretRetrievedProps) {
  const router = useRouter();

  return (
    <Container maxWidth="md">
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent sx={{ p: 6 }}>
          <Box textAlign="center" mb={4}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
                boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
              }}
            >
              <Shield sx={{ fontSize: 40, color: "white" }} />
            </Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Secret Retrieved
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 400, mx: "auto" }}
            >
              Your secret has been successfully decrypted and is displayed below
            </Typography>
          </Box>

          <Box mb={4}>
            <Typography
              variant="subtitle1"
              fontWeight="medium"
              gutterBottom
              sx={{ color: "text.primary" }}
            >
              Secret Content
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                backgroundColor: "#f8fafc",
                border: "2px solid #e2e8f0",
                borderRadius: 2,
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "8px 8px 0 0",
                },
              }}
            >
              <Typography
                component="pre"
                sx={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontFamily: "monospace",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  color: "text.primary",
                  margin: 0,
                }}
              >
                {secretData.content}
              </Typography>
            </Paper>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box display="flex" justifyContent="center" mb={4}>
            <Chip
              icon={<Security />}
              label={
                secretData.isOneTime
                  ? "This secret has been destroyed"
                  : `Expires in ${formatDistance(
                      new Date(),
                      secretData.expiresAt
                    )}`
              }
              color={secretData.isOneTime ? "error" : "warning"}
              variant="outlined"
              sx={{
                borderRadius: 3,
                px: 2,
                py: 1,
                fontSize: "0.875rem",
              }}
            />
          </Box>

          <Box textAlign="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push("/")}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                  boxShadow: "0 12px 35px rgba(102, 126, 234, 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Create Your Own Secret
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
