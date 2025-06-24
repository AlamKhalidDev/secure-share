"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Person, Email } from "@mui/icons-material";
import { trpc } from "@/app/_trpc/client";
import {
  AuthLayout,
  AuthPaper,
  AuthHeader,
  FormTextField,
  PasswordField,
  AuthButton,
  AuthFooter,
  PasswordStrengthIndicator,
} from "@/components/auth";
import { Alert, Fade, Box, Typography, Link } from "@mui/material";

const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const registerUser = trpc.auth.register.useMutation({
    onSuccess: () => router.push("/auth/login"),
    onError: (error) => setError(error.message),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const watchedPassword = watch("password");

  const onSubmit = (data: FormData) => {
    setError("");
    registerUser.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <AuthLayout>
      <AuthPaper>
        <AuthHeader
          title="Join SecureShare"
          subtitle="Create your account to start sharing secrets safely"
          iconColor="success"
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
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
              error={errors.name}
              autoComplete="name"
              startAdornment={
                <Person sx={{ color: "#64748b", fontSize: 20 }} />
              }
              color="success"
            />

            <FormTextField
              control={control}
              name="email"
              label="Email Address"
              placeholder="Enter your email address"
              error={errors.email}
              autoComplete="email"
              startAdornment={<Email sx={{ color: "#64748b", fontSize: 20 }} />}
              color="success"
            />

            <PasswordField
              control={control}
              name="password"
              label="Password"
              placeholder="Create a strong password"
              error={errors.password}
              autoComplete="new-password"
              color="success"
            />

            {watchedPassword && (
              <PasswordStrengthIndicator password={watchedPassword} />
            )}

            <PasswordField
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              error={errors.confirmPassword}
              autoComplete="new-password"
              color="success"
            />

            <AuthButton loading={registerUser.isPending} color="success">
              Create Account
            </AuthButton>
          </form>

          <AuthFooter
            prompt="Already have an account?"
            linkText="Sign in here"
            href="/auth/login"
            color="success"
          />

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textAlign: "center", display: "block", mt: 2 }}
          >
            By creating an account, you agree to our{" "}
            <Link sx={{ color: "#64748b", textDecoration: "none" }}>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link sx={{ color: "#64748b", textDecoration: "none" }}>
              Privacy Policy
            </Link>
          </Typography>
        </Box>
      </AuthPaper>
    </AuthLayout>
  );
}
