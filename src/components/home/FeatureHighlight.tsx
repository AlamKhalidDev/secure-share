"use client";

import { Paper, Stack, Typography } from "@mui/material";
import FeatureItem from "./FeatureItem";
import { Feature } from "@/types/homeTypes";

export default function FeatureHighlight({
  features,
}: {
  features: Feature[];
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        bgcolor: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: 3,
        mt: { xs: 4, md: 0 },
      }}
    >
      <Typography variant="h6" gutterBottom color="white" sx={{ mb: 3 }}>
        ✨ Platform Highlights
      </Typography>
      <Stack spacing={2.5}>
        {features.map((feature, index) => (
          <FeatureItem key={index} feature={feature} />
        ))}
      </Stack>
    </Paper>
  );
}
