"use client";

import { useState } from "react";
import {
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Fade,
  Alert,
} from "@mui/material";
import { Security, Add } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { trpc } from "@/app/_trpc/client";
import {
  BaseSecretDialog,
  SecretContent,
  SecuritySettings,
  ExpirationSettings,
  PreviewSummary,
} from "./secrets";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BaseSecretDialogProps,
  SecretFormData,
  secretFormSchema,
} from "@/types/dashboard";

export function CreateSecretDialog({
  open,
  onClose,
  onSuccess,
}: BaseSecretDialogProps) {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const createSecret = trpc.secret.create.useMutation({ onSuccess });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SecretFormData>({
    resolver: zodResolver(secretFormSchema),
    defaultValues: {
      content: "",
      isOneTime: false,
      expirationHours: 24,
      password: "",
    },
  });

  const watchedValues = watch();

  const onSubmit = async (data: SecretFormData) => {
    setError("");
    try {
      await createSecret.mutateAsync({
        content: data.content,
        isOneTime: data.isOneTime,
        expiresAt: new Date(
          Date.now() + data.expirationHours * 60 * 60 * 1000
        ).toISOString(),
        password: data.password || undefined,
      });
      if (createSecret.isError) {
        setError(createSecret.error.message);
        return;
      }
      console.log("Secret created successfully:", createSecret);
      reset();
    } catch (err) {
      console.error("Error creating secret:", err);
      setError("Failed to create secret. Please try again.");
    }
  };

  const handleClose = () => {
    reset();
    setError("");
    onClose();
  };

  return (
    <BaseSecretDialog
      open={open}
      onClose={handleClose}
      headerColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      icon={<Add sx={{ fontSize: 28, color: "white" }} />}
      title="Create New Secret"
      description="Securely share sensitive information with expiration and access controls"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <DialogContent
          sx={{
            p: 4,
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f5f9",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "4px",
              "&:hover": {
                background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
              },
            },
          }}
        >
          {error && (
            <Fade in>
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)",
                  border: "1px solid #fecaca",
                }}
              >
                {error}
              </Alert>
            </Fade>
          )}

          <SecretContent
            control={control}
            errors={errors}
            placeholder="Enter your secret message, password, or sensitive information..."
          />

          <SecuritySettings
            control={control}
            errors={errors}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            color="#667eea"
          />

          <ExpirationSettings control={control} color="#f59e0b" />

          <PreviewSummary formValues={watchedValues} title="Secret Summary" />
        </DialogContent>
        <>
          <Divider />
          <DialogActions
            sx={{
              p: 4,
              gap: 2,
              flexShrink: 0,
              backgroundColor: "rgba(248, 250, 252, 0.8)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Button
              onClick={handleClose}
              size="large"
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                color: "#64748b",
                "&:hover": {
                  backgroundColor: "#f1f5f9",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={createSecret.isPending}
              startIcon={createSecret.isPending ? undefined : <Security />}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                  boxShadow: "0 12px 35px rgba(102, 126, 234, 0.4)",
                  transform: "translateY(-2px)",
                },
                "&:disabled": {
                  background:
                    "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
                  color: "#94a3b8",
                  boxShadow: "none",
                  transform: "none",
                },
                transition: "all 0.3s ease",
              }}
            >
              {createSecret.isPending ? "Creating Secret..." : "Create Secret"}
            </Button>
          </DialogActions>
        </>
      </form>
    </BaseSecretDialog>
  );
}
