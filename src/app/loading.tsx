import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <CircularProgress size={60} thickness={4} color="primary" />
      <Typography variant="h6" mt={3}>
        Loading content...
      </Typography>
    </Box>
  );
}
