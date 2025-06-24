import {
  Paper,
  Box,
  Typography,
  Avatar,
  FormControlLabel,
  Switch,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Security, Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { SecretFormData } from "@/types/dashboard";

interface SecuritySettingsProps {
  control: Control<SecretFormData>;
  errors: FieldErrors<SecretFormData>;
  showPassword: boolean;
  onTogglePassword: () => void;
  passwordHelperText?: string;
  color?: string;
}

export function SecuritySettings({
  control,
  errors,
  showPassword,
  onTogglePassword,
  passwordHelperText,
  color = "#667eea",
}: SecuritySettingsProps) {
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
              "eea",
              "ba2"
            )} 100%)`,
          }}
        >
          <Security sx={{ fontSize: 20 }} />
        </Avatar>
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          Security Settings
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flex: 1, gap: 3, flexWrap: "wrap" }}>
        {/* One-time Access */}
        <Box sx={{ flex: 1, minWidth: 250 }}>
          <Controller
            name="isOneTime"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    {...field}
                    checked={field.value}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: color,
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: color,
                        },
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight="medium"
                      color="text.primary"
                    >
                      One-time Access
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Destroy after first viewing
                    </Typography>
                  </Box>
                }
              />
            )}
          />
        </Box>

        {/* Password Protection */}
        <Box sx={{ flex: 1, minWidth: 250 }}>
          <Typography
            variant="body2"
            fontWeight="medium"
            color="text.primary"
            gutterBottom
          >
            Password Protection
          </Typography>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                placeholder="Optional password"
                type={showPassword ? "text" : "password"}
                error={!!errors.password}
                helperText={passwordHelperText || errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={onTogglePassword}
                        edge="end"
                        size="small"
                        sx={{ color: "text.secondary" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "white",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: color,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: color,
                      borderWidth: 2,
                    },
                  },
                }}
              />
            )}
          />
        </Box>
      </Box>
    </Paper>
  );
}
