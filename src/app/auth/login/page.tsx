"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Email } from "@mui/icons-material";
import { Alert, Fade, Box } from "@mui/material";
import {
  AuthPaper,
  AuthLayout,
  AuthHeader,
  FormTextField,
  PasswordField,
  AuthButton,
  AuthFooter,
} from "../../../components/auth";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) setError("Invalid email or password");
      else router.push("/dashboard");
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthPaper>
        <AuthHeader
          title="Welcome Back"
          subtitle="Sign in to your SecureShare account"
        />

        <Box sx={{ p: 6, pt: 2 }}>
          {error && (
            <Fade in>
              <Alert
                severity="error"
                sx={{
                  mb: 4,
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)",
                  border: "1px solid #fecaca",
                  "& .MuiAlert-icon": { fontSize: "1.25rem" },
                }}
              >
                {error}
              </Alert>
            </Fade>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormTextField
              control={control}
              name="email"
              label="Email Address"
              placeholder="Enter your email address"
              error={errors.email}
              autoComplete="email"
              startAdornment={<Email sx={{ color: "#64748b", fontSize: 20 }} />}
            />

            <PasswordField
              control={control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              error={errors.password}
              autoComplete="current-password"
            />

            <AuthButton loading={loading}>Sign In</AuthButton>
          </form>

          <AuthFooter
            prompt="Don't have an account?"
            linkText="Create one here"
            href="/auth/register"
          />
        </Box>
      </AuthPaper>
    </AuthLayout>
  );
}
