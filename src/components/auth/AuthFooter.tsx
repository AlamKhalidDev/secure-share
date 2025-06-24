import { Typography, Link as MuiLink, Box } from "@mui/material";
import Link from "next/link";

interface AuthFooterProps {
  prompt: string;
  linkText: string;
  href: string;
  color?: "primary" | "success";
}

export const AuthFooter = ({
  prompt,
  linkText,
  href,
  color = "primary",
}: AuthFooterProps) => (
  <Box sx={{ textAlign: "center" }}>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      {prompt}{" "}
      <MuiLink
        component={Link}
        href={href}
        sx={{
          color: color === "primary" ? "#667eea" : "#10b981",
          textDecoration: "none",
          fontWeight: 600,
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        {linkText}
      </MuiLink>
    </Typography>
  </Box>
);
