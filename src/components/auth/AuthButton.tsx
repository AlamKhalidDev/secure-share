import { Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

interface AuthButtonProps {
  children: React.ReactNode;
  loading: boolean;
  color?: "primary" | "success";
}

export const AuthButton = ({
  children,
  loading,
  color = "primary",
}: AuthButtonProps) => {
  const gradientColors = {
    primary: {
      from: "#667eea",
      to: "#764ba2",
      hoverFrom: "#5a67d8",
      hoverTo: "#6b46c1",
    },
    success: {
      from: "#10b981",
      to: "#059669",
      hoverFrom: "#059669",
      hoverTo: "#047857",
    },
  };

  const colors = gradientColors[color];

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      size="large"
      disabled={loading}
      endIcon={loading ? undefined : <ArrowForward />}
      sx={{
        borderRadius: 3,
        py: 1.5,
        mb: 4,
        background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`,
        boxShadow: `0 8px 25px rgba(${
          color === "primary" ? "102, 126, 234" : "16, 185, 129"
        }, 0.3)`,
        textTransform: "none",
        fontSize: "1rem",
        fontWeight: 600,
        "&:hover": {
          background: `linear-gradient(135deg, ${colors.hoverFrom} 0%, ${colors.hoverTo} 100%)`,
          boxShadow: `0 12px 35px rgba(${
            color === "primary" ? "102, 126, 234" : "16, 185, 129"
          }, 0.4)`,
          transform: "translateY(-2px)",
        },
        "&:disabled": {
          background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
          color: "#94a3b8",
          boxShadow: "none",
          transform: "none",
        },
        transition: "all 0.3s ease",
      }}
    >
      {loading ? `${children}...` : children}
    </Button>
  );
};
