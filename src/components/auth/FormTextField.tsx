import { TextField, Typography, Box, InputAdornment } from "@mui/material";
import { Control, Controller, FieldError } from "react-hook-form";
import { ReactNode } from "react";

export interface FormTextFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: "name" | "email" | "password" | "confirmPassword";
  label: string;
  placeholder: string;
  type?: string;
  error?: FieldError;
  autoComplete?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  color?: "primary" | "success";
}

export const FormTextField = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  error,
  autoComplete,
  startAdornment,
  endAdornment,
  color = "primary",
}: FormTextFieldProps) => (
  <Box sx={{ mb: 3 }}>
    <Typography
      variant="body2"
      fontWeight="medium"
      color="text.primary"
      gutterBottom
    >
      {label}
    </Typography>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          placeholder={placeholder}
          type={type}
          error={!!error}
          helperText={error?.message}
          autoComplete={autoComplete}
          InputProps={{
            startAdornment: startAdornment && (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ),
            endAdornment: endAdornment && (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "#f8fafc",
              fontSize: "1rem",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: color === "primary" ? "#667eea" : "#10b981",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: color === "primary" ? "#667eea" : "#10b981",
                borderWidth: 2,
              },
            },
          }}
        />
      )}
    />
  </Box>
);
