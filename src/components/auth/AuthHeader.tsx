import { Avatar, Box, Typography } from "@mui/material";
import { Security } from "@mui/icons-material";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  iconColor?: "primary" | "success";
}

export const AuthHeader = ({
  title,
  subtitle,
  iconColor = "primary",
}: AuthHeaderProps) => {
  const gradientColors = {
    primary: { from: "#667eea", to: "#764ba2" },
    success: { from: "#10b981", to: "#059669" },
  };

  const colors = gradientColors[iconColor];

  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
        p: 6,
        textAlign: "center",
        position: "relative",
      }}
    >
      <Avatar
        sx={{
          width: 80,
          height: 80,
          mx: "auto",
          mb: 3,
          background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`,
          boxShadow: `0 15px 35px rgba(${
            colors.from === "#667eea" ? "102, 126, 234" : "16, 185, 129"
          }, 0.3)`,
        }}
      >
        <Security sx={{ fontSize: 40 }} />
      </Avatar>
      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
        sx={{
          background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 1,
        }}
      >
        {title}
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
        {subtitle}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1, opacity: 0.8 }}
      >
        Secure • Private • Encrypted
      </Typography>
    </Box>
  );
};
