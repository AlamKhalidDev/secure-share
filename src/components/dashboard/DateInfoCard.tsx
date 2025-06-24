import { Paper, Box, Typography, Divider } from "@mui/material";
import { CalendarToday, Schedule } from "@mui/icons-material";
import { FormattedDate } from "@/types/dashboard";

interface DateInfoCardProps {
  created: FormattedDate;
  expires: FormattedDate;
  status: string;
}

export const DateInfoCard = ({
  created,
  expires,
  status,
}: DateInfoCardProps) => (
  <Paper
    elevation={0}
    sx={{
      mb: 3,
      p: 3,
      borderRadius: 3,
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      border: "1px solid #e2e8f0",
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CalendarToday sx={{ fontSize: 16, color: "#64748b" }} />
        <Typography
          variant="caption"
          sx={{
            color: "#64748b",
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        >
          Created
        </Typography>
      </Box>
      <Typography
        variant="caption"
        sx={{
          color: "#1e293b",
          fontWeight: 600,
          fontSize: "0.75rem",
        }}
      >
        {created.date} • {created.time}
      </Typography>
    </Box>

    <Divider sx={{ my: 1.5 }} />

    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Schedule sx={{ fontSize: 16, color: "#64748b" }} />
        <Typography
          variant="caption"
          sx={{
            color: "#64748b",
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        >
          Expires
        </Typography>
      </Box>
      <Typography
        variant="caption"
        sx={{
          color: status === "expired" ? "#dc2626" : "#1e293b",
          fontWeight: 600,
          fontSize: "0.75rem",
        }}
      >
        {expires.date} • {expires.time}
      </Typography>
    </Box>
  </Paper>
);
