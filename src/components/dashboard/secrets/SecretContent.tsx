import { SecretFormData } from "@/types/dashboard";
import { Box, Typography, TextField } from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";

interface SecretContentProps {
  control: Control<SecretFormData>;
  errors: FieldErrors<SecretFormData>;
  placeholder: string;
  color?: string;
}

export function SecretContent({
  control,
  errors,
  placeholder,
  color = "#667eea",
}: SecretContentProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "text.primary", mb: 2 }}
      >
        Secret Content
      </Typography>
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            placeholder={placeholder}
            multiline
            rows={4}
            error={!!errors.content}
            helperText={errors.content?.message}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "#f8fafc",
                fontSize: "1rem",
                lineHeight: 1.6,
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: color,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: color,
                  borderWidth: 2,
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: color,
              },
            }}
          />
        )}
      />
    </Box>
  );
}
