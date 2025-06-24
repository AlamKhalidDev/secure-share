import {
  Card,
  CardContent,
  Box,
  Chip,
  Typography,
  Button,
  Tooltip,
  Fade,
  Grid,
} from "@mui/material";
import {
  Visibility,
  Lock,
  Edit,
  Delete,
  ContentCopy,
} from "@mui/icons-material";
import { Secret } from "@/types/dashboard";
import { getStatusConfig, getStatus, formatDate } from "@/lib/utils";
import { DateInfoCard } from "./DateInfoCard";

interface SecretCardProps {
  secret: Secret;
  onEdit: (secret: Secret) => void;
  onDelete: (secret: Secret) => void;
  onCopy: (secretId: string) => void;
  copiedId: string | null;
  index: number;
}

export const SecretCard = ({
  secret,
  onEdit,
  onDelete,
  onCopy,
  copiedId,
  index,
}: SecretCardProps) => {
  const status = getStatus(secret);
  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;
  const created = formatDate(secret.createdAt);
  const expires = formatDate(secret.expiresAt);
  const isActive = status === "active";

  return (
    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={secret.id}>
      <Fade in timeout={300 + index * 100}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: isActive
                ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                : status === "expired"
                ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
                : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            },
          }}
        >
          <CardContent sx={{ p: 4, flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 3,
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Chip
                icon={
                  <Box
                    component={StatusIcon}
                    sx={{ fontSize: "16px !important" }}
                  />
                }
                label={statusConfig.label}
                size="small"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  height: 32,
                  ...statusConfig.chipSx,
                }}
              />

              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                {secret.isOneTime && (
                  <Chip
                    icon={<Visibility sx={{ fontSize: "14px !important" }} />}
                    label="One-time"
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: "0.7rem",
                      height: 28,
                      background:
                        "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                      color: "#1d4ed8",
                      borderColor: "#bfdbfe",
                      fontWeight: 500,
                      "& .MuiChip-icon": { color: "#1d4ed8" },
                    }}
                  />
                )}
                {secret.password && (
                  <Chip
                    icon={<Lock sx={{ fontSize: "14px !important" }} />}
                    label="Protected"
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: "0.7rem",
                      height: 28,
                      background:
                        "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)",
                      color: "#7c3aed",
                      borderColor: "#d8b4fe",
                      fontWeight: 500,
                      "& .MuiChip-icon": { color: "#7c3aed" },
                    }}
                  />
                )}
              </Box>
            </Box>

            <Typography
              variant="body2"
              sx={{
                mb: 4,
                color: "#64748b",
                lineHeight: 1.6,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                fontSize: "0.9rem",
              }}
            >
              {secret.content}
            </Typography>

            <DateInfoCard created={created} expires={expires} status={status} />

            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: "auto",
              }}
            >
              <Tooltip title={copiedId === secret.id ? "Copied!" : "Copy URL"}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => onCopy(secret.id)}
                  sx={{
                    flex: 1,
                    borderRadius: 2,
                    py: 1,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "none",
                    borderColor: "#e2e8f0",
                    color: "#64748b",
                    "&:hover": {
                      backgroundColor: "#eff6ff",
                      borderColor: "#1d4ed8",
                      color: "#1d4ed8",
                    },
                  }}
                >
                  <ContentCopy sx={{ fontSize: 16, mr: 0.5 }} />
                  {copiedId === secret.id ? "Copied!" : "Copy"}
                </Button>
              </Tooltip>

              <Tooltip
                title={isActive ? "Edit secret" : "Cannot edit inactive secret"}
              >
                <span>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onEdit(secret)}
                    disabled={!isActive}
                    sx={{
                      flex: 1,
                      borderRadius: 2,
                      py: 1,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      textTransform: "none",
                      borderColor: isActive ? "#e2e8f0" : "#f1f5f9",
                      color: isActive ? "#64748b" : "#cbd5e1",
                      "&:hover": {
                        backgroundColor: isActive ? "#ecfdf5" : "transparent",
                        borderColor: isActive ? "#059669" : "#f1f5f9",
                        color: isActive ? "#059669" : "#cbd5e1",
                      },
                    }}
                  >
                    <Edit sx={{ fontSize: 16, mr: 0.5 }} />
                    Edit
                  </Button>
                </span>
              </Tooltip>

              <Tooltip title="Delete secret">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => onDelete(secret)}
                  sx={{
                    flex: 1,
                    borderRadius: 2,
                    py: 1,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "none",
                    borderColor: "#e2e8f0",
                    color: "#64748b",
                    "&:hover": {
                      backgroundColor: "#fef2f2",
                      borderColor: "#dc2626",
                      color: "#dc2626",
                    },
                  }}
                >
                  <Delete sx={{ fontSize: 16, mr: 0.5 }} />
                  Delete
                </Button>
              </Tooltip>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Grid>
  );
};
