import {
  Grid,
  Card,
  CardContent,
  Box,
  Avatar,
  Typography,
  Fade,
} from "@mui/material";
import { Stats, StatCard } from "@/types/dashboard";
import { Cancel, CheckCircle, Security, Visibility } from "@mui/icons-material";

interface StatsCardsProps {
  stats: Stats;
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  const statCards: StatCard[] = [
    {
      label: "Total Secrets",
      value: stats.total,
      icon: Security,
      color: "#4facfe",
    },
    {
      label: "Active",
      value: stats.active,
      icon: CheckCircle,
      color: "#10b981",
    },
    {
      label: "Expired",
      value: stats.expired,
      icon: Cancel,
      color: "#ef4444",
    },
    {
      label: "Viewed",
      value: stats.viewed,
      icon: Visibility,
      color: "#f59e0b",
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {statCards.map((stat, index) => (
        <Grid size={{ xs: 6, md: 3 }} key={index}>
          <Fade in timeout={300 + index * 100}>
            <Card
              sx={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 3,
                boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}CC 100%)`,
                    }}
                  >
                    <stat.icon />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color="text.primary"
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      ))}
    </Grid>
  );
};
