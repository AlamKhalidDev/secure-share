"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Container,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Lock,
  RemoveRedEye,
} from "@mui/icons-material";
import { SecretAccessFormProps } from "@/types/secret";
import { useEffect, useState } from "react";

export default function SecretAccessForm({
  isPasswordRequired,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  error,
  handleGetSecret,
  isLoading,
  handleKeyPress,
}: SecretAccessFormProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <Container maxWidth="sm">
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
                background: isPasswordRequired
                  ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                  : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
                boxShadow: isPasswordRequired
                  ? "0 10px 30px rgba(240, 147, 251, 0.3)"
                  : "0 10px 30px rgba(79, 172, 254, 0.3)",
              }}
            >
              {isPasswordRequired ? (
                <Lock sx={{ fontSize: 40, color: "white" }} />
              ) : (
                <RemoveRedEye sx={{ fontSize: 40, color: "white" }} />
              )}
            </Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{
                background: isPasswordRequired
                  ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                  : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              View Secret
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 400, mx: "auto" }}
            >
              {isPasswordRequired
                ? "This secret is password protected. Enter the password to reveal it."
                : "Click the button below to reveal your secret message."}
            </Typography>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
                "& .MuiAlert-icon": {
                  fontSize: "1.25rem",
                },
              }}
            >
              {error}
            </Alert>
          )}

          {isPasswordRequired && (
            <Box mb={4}>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "#f8fafc",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#667eea",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#667eea",
                      borderWidth: 2,
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#667eea",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: "text.secondary" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleGetSecret}
            disabled={isLoading || (isPasswordRequired && !password.trim())}
            startIcon={
              isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <RemoveRedEye />
              )
            }
            sx={{
              borderRadius: 3,
              py: 1.5,
              background: isPasswordRequired
                ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              boxShadow: isPasswordRequired
                ? "0 8px 25px rgba(240, 147, 251, 0.3)"
                : "0 8px 25px rgba(79, 172, 254, 0.3)",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              "&:hover": {
                background: isPasswordRequired
                  ? "linear-gradient(135deg, #e879f9 0%, #ec4899 100%)"
                  : "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
                boxShadow: isPasswordRequired
                  ? "0 12px 35px rgba(240, 147, 251, 0.4)"
                  : "0 12px 35px rgba(79, 172, 254, 0.4)",
                transform: "translateY(-2px)",
              },
              "&:disabled": {
                background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
                color: "text.disabled",
                boxShadow: "none",
                transform: "none",
              },
              transition: "all 0.3s ease",
            }}
          >
            {isLoading
              ? "Loading..."
              : isPasswordRequired
              ? "View Secret"
              : "Reveal Secret"}
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
