import { Box, Button, Typography, Avatar } from "@mui/material";
import { Add, Dashboard } from "@mui/icons-material";
import { useSession } from "next-auth/react";

interface HeaderSectionProps {
  onCreate: () => void;
}

export const HeaderSection = ({ onCreate }: HeaderSectionProps) => {
  const { data: session } = useSession();

  return (
    <Box
      sx={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        p: 4,
        mb: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              }}
            >
              <Dashboard />
            </Avatar>
            <Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: "white", mb: 0.5 }}
              >
                Secrets Dashboard
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "rgba(255,255,255,0.8)" }}
              >
                Welcome back, {session?.user?.name || "User"}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<Add />}
          onClick={onCreate}
          sx={{
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 600,
            px: 4,
            py: 1.5,
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            color: "white",
            boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.3)",
              transform: "translateY(-2px)",
              boxShadow: "0 12px 35px rgba(0,0,0,0.3)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Create New Secret
        </Button>
      </Box>
    </Box>
  );
};
