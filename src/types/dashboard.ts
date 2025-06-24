import { z } from "zod";

export type SecretStatus = "active" | "expired" | "viewed" | "unknown";

export interface Secret {
  id: string;
  content: string;
  createdAt: string;
  expiresAt: string;
  isViewed: boolean;
  isOneTime: boolean;
  password?: string | null;
}

export interface StatusConfig {
  label: string;
  color: "success" | "error" | "warning" | "default";
  icon: React.ComponentType;
  chipSx: object;
}

export interface FormattedDate {
  date: string;
  time: string;
}

export interface Stats {
  total: number;
  active: number;
  expired: number;
  viewed: number;
}

export interface StatCard {
  label: string;
  value: number;
  icon: React.ComponentType;
  color: string;
}

export const secretFormSchema = z.object({
  content: z.string().nonempty("Secret content is required"),
  isOneTime: z.boolean(),
  expirationHours: z.number().min(1, "Must be at least 1 hour"),
  password: z.string(),
});

export type SecretFormData = z.infer<typeof secretFormSchema>;

export interface BaseSecretDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export interface EditSecretDialogProps extends BaseSecretDialogProps {
  secret: Secret;
}
