"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "@/lib/theme";
import { Box } from "@mui/material";
import { Header } from "@/components/layout/header";
import { useEffect, useState } from "react";

export default function MuiSetup({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Box
          component="header"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "64px",
            zIndex: 1200,
          }}
        >
          <Header />
        </Box>

        <Box
          component="main"
          sx={{
            flex: 1,
            marginTop: "64px",
            minHeight: "calc(100vh - 64px)",
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
