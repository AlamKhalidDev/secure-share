import {
  Paper,
  Box,
  Typography,
  Avatar,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Schedule } from "@mui/icons-material";
import { Controller, Control } from "react-hook-form";
import { SecretFormData } from "@/types/dashboard";
import { getExpirationLabel } from "@/lib/utils";

interface ExpirationSettingsProps {
  control: Control<SecretFormData>;
  color?: string;
}

export function ExpirationSettings({
  control,
  color = "#f59e0b",
}: ExpirationSettingsProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 3,
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        border: "1px solid #e2e8f0",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            background: `linear-gradient(135deg, ${color} 0%, ${color.replace(
              "f59",
              "d97"
            )} 100%)`,
          }}
        >
          <Schedule sx={{ fontSize: 20 }} />
        </Avatar>
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          Expiration Time
        </Typography>
      </Box>

      <Controller
        name="expirationHours"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <Select
              {...field}
              displayEmpty
              sx={{
                borderRadius: 2,
                backgroundColor: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#e2e8f0",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: color,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: color,
                  borderWidth: 2,
                },
              }}
            >
              {[1, 24, 168].map((hours) => (
                <MenuItem key={hours} value={hours}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "100%",
                    }}
                  >
                    <Schedule sx={{ fontSize: 18, color: "#64748b" }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight="medium">
                        {getExpirationLabel(hours)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {hours === 1
                          ? "Quick access"
                          : hours === 24
                          ? "Standard"
                          : hours === 72
                          ? "Extended"
                          : "Long term"}
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </Paper>
  );
}
