import { CheckCircle, Cancel, Warning } from "@mui/icons-material";
import {
  Secret,
  SecretStatus,
  StatusConfig,
  FormattedDate,
} from "@/types/dashboard";

export const getStatus = (secret: Secret): SecretStatus => {
  if (secret.isViewed && secret.isOneTime) return "viewed";
  if (new Date() > new Date(secret.expiresAt)) return "expired";
  return "active";
};

export const getStatusConfig = (status: SecretStatus): StatusConfig => {
  switch (status) {
    case "active":
      return {
        label: "Active",
        color: "success",
        icon: CheckCircle,
        chipSx: {
          background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
          color: "#065f46",
          border: "1px solid #a7f3d0",
          fontWeight: 600,
          "& .MuiChip-icon": { color: "#065f46" },
        },
      };
    case "expired":
      return {
        label: "Expired",
        color: "error",
        icon: Cancel,
        chipSx: {
          background: "linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)",
          color: "#991b1b",
          border: "1px solid #fecaca",
          fontWeight: 600,
          "& .MuiChip-icon": { color: "#991b1b" },
        },
      };
    case "viewed":
      return {
        label: "Viewed",
        color: "warning",
        icon: Warning,
        chipSx: {
          background: "linear-gradient(135deg, #fffbeb 0%, #fed7aa 100%)",
          color: "#92400e",
          border: "1px solid #fed7aa",
          fontWeight: 600,
          "& .MuiChip-icon": { color: "#92400e" },
        },
      };
    default:
      return {
        label: "Unknown",
        color: "default",
        icon: Warning,
        chipSx: {},
      };
  }
};

export const formatDate = (dateString: string): FormattedDate => {
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  };
};

export function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const expirationOptions = [
  { label: "1 Hour", value: 1 },
  { label: "24 Hours", value: 24 },
  { label: "7 Days", value: 168 },
];

export const getExpirationLabel = (hours: number) => {
  if (hours < 24) return `${hours} Hour${hours > 1 ? "s" : ""}`;
  if (hours < 168) return `${hours / 24} Day${hours / 24 > 1 ? "s" : ""}`;
  return `${hours / 168} Week${hours / 168 > 1 ? "s" : ""}`;
};
