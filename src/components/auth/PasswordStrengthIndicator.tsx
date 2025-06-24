import { Box, Typography, LinearProgress, Chip } from "@mui/material";
import { Check, Close } from "@mui/icons-material";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator = ({
  password,
}: PasswordStrengthIndicatorProps) => {
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ];
    strength = checks.filter(Boolean).length;
    return { strength, checks };
  };

  const passwordStrength = getPasswordStrength(password || "");
  const strengthColor = ["#ef4444", "#ef4444", "#f59e0b", "#10b981", "#059669"][
    passwordStrength.strength
  ];
  const strengthLabel = ["Very Weak", "Weak", "Fair", "Good", "Strong"][
    passwordStrength.strength
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Password Strength
        </Typography>
        <Chip
          label={strengthLabel}
          size="small"
          sx={{
            backgroundColor: `${strengthColor}20`,
            color: strengthColor,
            fontWeight: 600,
            fontSize: "0.7rem",
            height: 20,
          }}
        />
      </Box>
      <LinearProgress
        variant="determinate"
        value={(passwordStrength.strength / 5) * 100}
        sx={{
          height: 6,
          borderRadius: 3,
          backgroundColor: "#f1f5f9",
          "& .MuiLinearProgress-bar": {
            backgroundColor: strengthColor,
            borderRadius: 3,
          },
        }}
      />
      <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
        {[
          "8+ characters",
          "Uppercase letter",
          "Lowercase letter",
          "Number",
          "Special character",
        ].map((requirement, index) => (
          <Box
            key={requirement}
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            {passwordStrength.checks[index] ? (
              <Check sx={{ fontSize: 12, color: "#10b981" }} />
            ) : (
              <Close sx={{ fontSize: 12, color: "#ef4444" }} />
            )}
            <Typography
              variant="caption"
              sx={{
                color: passwordStrength.checks[index] ? "#10b981" : "#ef4444",
                fontSize: "0.7rem",
              }}
            >
              {requirement}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
