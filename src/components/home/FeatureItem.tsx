"use client";

import { Avatar, Box, Typography } from "@mui/material";
import { Feature } from "@/types/homeTypes";

export default function FeatureItem({ feature }: { feature: Feature }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Avatar
        sx={{
          bgcolor: "rgba(255,255,255,0.2)",
          color: "white",
          width: 48,
          height: 48,
        }}
      >
        {feature.icon}
      </Avatar>
      <Box>
        <Typography variant="subtitle1" color="white" fontWeight={600}>
          {feature.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.4,
          }}
        >
          {feature.description}
        </Typography>
      </Box>
    </Box>
  );
}
