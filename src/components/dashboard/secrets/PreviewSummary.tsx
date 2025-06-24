import { Paper, Box, Typography, Chip } from "@mui/material";
import { Schedule, Visibility, Lock, Info } from "@mui/icons-material";
import { SecretFormData } from "@/types/dashboard";
import { getExpirationLabel } from "@/lib/utils";

interface PreviewSummaryProps {
  formValues: SecretFormData;
  title: string;
  titleColor?: string;
  background?: string;
  borderColor?: string;
}

export function PreviewSummary({
  formValues,
  title,
  titleColor = "#1d4ed8",
  background = "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
  borderColor = "#bfdbfe",
}: PreviewSummaryProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        background,
        border: `1px solid ${borderColor}`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Info sx={{ color: titleColor, fontSize: 20 }} />
        <Typography variant="subtitle2" fontWeight="bold" color={titleColor}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <Chip
          icon={<Schedule sx={{ fontSize: "16px !important" }} />}
          label={`Expires in ${getExpirationLabel(formValues.expirationHours)}`}
          size="small"
          sx={{
            backgroundColor: "#fef3c7",
            color: "#92400e",
            border: "1px solid #fed7aa",
            fontWeight: 500,
            "& .MuiChip-icon": { color: "#92400e" },
          }}
        />
        {formValues.isOneTime && (
          <Chip
            icon={<Visibility sx={{ fontSize: "16px !important" }} />}
            label="One-time access"
            size="small"
            sx={{
              backgroundColor: "#ecfdf5",
              color: "#065f46",
              border: "1px solid #a7f3d0",
              fontWeight: 500,
              "& .MuiChip-icon": { color: "#065f46" },
            }}
          />
        )}
        {formValues.password && (
          <Chip
            icon={<Lock sx={{ fontSize: "16px !important" }} />}
            label="Password protected"
            size="small"
            sx={{
              backgroundColor: "#faf5ff",
              color: "#7c3aed",
              border: "1px solid #d8b4fe",
              fontWeight: 500,
              "& .MuiChip-icon": { color: "#7c3aed" },
            }}
          />
        )}
      </Box>
    </Paper>
  );
}
