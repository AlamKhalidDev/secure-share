"use client";
import { useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
        <ReportProblemIcon
          sx={{ fontSize: 100, color: "warning.main", mb: 2 }}
        />
        <Typography variant="h3" gutterBottom>
          Something Went Wrong!
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={2}>
          {error.message || "An unexpected error occurred"}
        </Typography>
        <Typography variant="body1" mb={4}>
          Please try again or contact support if the problem persists.
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => reset()}
            size="large"
          >
            Try Again
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component="a"
            href="/"
            size="large"
          >
            Go Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
