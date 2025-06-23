"use client";

import { Button, Stack, Typography, Box, useTheme } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowForward } from "@mui/icons-material";

export default function HeroSection() {
  const { data: session } = useSession();
  const theme = useTheme();

  return (
    <Stack spacing={3}>
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
          fontWeight: 700,
          lineHeight: 1.1,
          mb: 2,
        }}
      >
        Share Secrets
        <Box
          component="span"
          sx={{
            display: "block",
            color: theme.palette.primary.dark,
          }}
        >
          Securely & Simply
        </Box>
      </Typography>

      <Typography
        variant="h5"
        sx={{
          fontSize: { xs: "1.1rem", md: "1.3rem" },
          opacity: 0.95,
          lineHeight: 1.6,
          maxWidth: "500px",
        }}
      >
        Send sensitive information with confidence using our encrypted,
        self-destructing secret sharing platform. Zero-knowledge architecture
        ensures maximum privacy.
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 2 }}>
        {session ? (
          <Button
            variant="contained"
            size="large"
            component={Link}
            href="/dashboard"
            endIcon={<ArrowForward />}
            sx={{
              bgcolor: "white",
              color: "primary.main",
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              "&:hover": {
                bgcolor: "grey.100",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Go to Dashboard
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/auth/register"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: "white",
                color: "primary.main",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                "&:hover": {
                  bgcolor: "grey.100",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              href="/auth/login"
              sx={{
                borderColor: "rgba(255,255,255,0.5)",
                color: "white",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                backdropFilter: "blur(10px)",
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255,255,255,0.1)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Sign In
            </Button>
          </>
        )}
      </Stack>
    </Stack>
  );
}
