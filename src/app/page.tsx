import { Box, Container, Grid } from "@mui/material";
import { Timer, Visibility, Lock } from "@mui/icons-material";
import HeroSection from "@/components/home/HeroSection";
import FeatureHighlight from "@/components/home/FeatureHighlight";
import { Feature } from "@/types/homeTypes";

export default function HomePage() {
  const features: Feature[] = [
    {
      icon: <Timer />,
      title: "Auto-Expiration",
      description: "Set custom expiration times for your secrets",
    },
    {
      icon: <Visibility />,
      title: "One-Time Access",
      description: "Self-destruct after viewing for maximum security",
    },
    {
      icon: <Lock />,
      title: "Password Protection",
      description: "Add an extra layer of security with passwords",
    },
  ];

  return (
    <Box
      sx={{
        overflow: "hidden",
        height: "100%",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          color: "white",
          py: { xs: 8, md: 12 },
          height: "100%",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <HeroSection />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FeatureHighlight features={features} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
