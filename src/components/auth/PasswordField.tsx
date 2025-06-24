import { IconButton } from "@mui/material";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { FormTextField, FormTextFieldProps } from "./FormTextField";

export const PasswordField = (
  props: Omit<FormTextFieldProps, "type" | "startAdornment">
) => {
  const [showPassword, setShowPassword] = useState(false);
  const Icon = Lock;

  return (
    <FormTextField
      {...props}
      type={showPassword ? "text" : "password"}
      startAdornment={<Icon sx={{ color: "#64748b", fontSize: 20 }} />}
      endAdornment={
        <IconButton
          onClick={() => setShowPassword(!showPassword)}
          edge="end"
          sx={{ color: "#64748b" }}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      }
    />
  );
};
