"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
        px={3}
      >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: "error.main", mb: 2 }} />
        <Typography variant="h3" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/"
          size="large"
        >
          Return Home
        </Button>
      </Box>
    </Container>
  );
}
