"use client";

import { useState, useEffect } from "react";
import {
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Fade,
  Alert,
  Paper,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { Edit, History } from "@mui/icons-material";
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
  EditSecretDialogProps,
  SecretFormData,
  secretFormSchema,
} from "@/types/dashboard";
import { formatDate } from "@/lib/utils";

export function EditSecretDialog({
  open,
  onClose,
  secret,
  onSuccess,
}: EditSecretDialogProps) {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const updateSecret = trpc.secret.update.useMutation({ onSuccess });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SecretFormData>({
    resolver: zodResolver(secretFormSchema),
  });

  const watchedValues = watch();

  useEffect(() => {
    if (secret && open) {
      const hoursUntilExpiration = Math.ceil(
        (new Date(secret.expiresAt).getTime() - new Date().getTime()) /
          (1000 * 60 * 60)
      );

      reset({
        content: secret.content,
        isOneTime: secret.isOneTime,
        expirationHours: Math.max(1, hoursUntilExpiration),
        password: "",
      });
    }
  }, [secret, open, reset]);

  const onSubmit = (data: SecretFormData) => {
    if (!secret) return;

    setError("");
    updateSecret.mutate({
      id: secret.id,
      content: data.content,
      isOneTime: data.isOneTime,
      expiresAt: new Date(
        Date.now() + data.expirationHours * 60 * 60 * 1000
      ).toISOString(),
      password: data.password || undefined,
    });

    if (updateSecret.isError) {
      setError(updateSecret.error.message);
      return;
    }
    reset();
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  if (!secret) return null;

  const created = formatDate(secret.createdAt);

  return (
    <BaseSecretDialog
      open={open}
      onClose={handleClose}
      headerColor="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
      icon={<Edit sx={{ fontSize: 28, color: "white" }} />}
      title="Edit Secret"
      description="Modify your secret settings and content while maintaining security"
      additionalHeaderContent={
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 2,
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <History sx={{ color: "white", fontSize: 18 }} />
            <Typography
              variant="body2"
              sx={{ color: "white", fontWeight: 500 }}
            >
              Created: {created.date} • {created.time}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
              {secret.isOneTime && (
                <Chip
                  label="One-time"
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    fontSize: "0.7rem",
                    height: 24,
                  }}
                />
              )}
              {secret.password && (
                <Chip
                  label="Protected"
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    fontSize: "0.7rem",
                    height: 24,
                  }}
                />
              )}
            </Box>
          </Box>
        </Paper>
      }
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
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              borderRadius: "4px",
              "&:hover": {
                background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
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
            placeholder="Update your secret message, password, or sensitive information..."
            color="#f59e0b"
          />

          <SecuritySettings
            control={control}
            errors={errors}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            passwordHelperText="Leave empty to keep existing password or remove protection"
            color="#f59e0b"
          />

          <ExpirationSettings control={control} color="#ef4444" />

          <PreviewSummary
            formValues={watchedValues}
            title="Updated Secret Summary"
            titleColor="#92400e"
            background="linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)"
            borderColor="#fed7aa"
          />
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
              disabled={updateSecret.isPending}
              startIcon={updateSecret.isPending ? undefined : <Edit />}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                boxShadow: "0 8px 25px rgba(245, 158, 11, 0.3)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
                  boxShadow: "0 12px 35px rgba(245, 158, 11, 0.4)",
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
              {updateSecret.isPending ? "Updating Secret..." : "Update Secret"}
            </Button>
          </DialogActions>
        </>
      </form>
    </BaseSecretDialog>
  );
}
